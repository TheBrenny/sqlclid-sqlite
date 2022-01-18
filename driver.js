const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const tableCache = {};

/**
 * Returns a 2D array with the [0][x] being the array of results, and [1][x] being
 * the schema of each corresponding result.
 */
async function query(db, sql, settings) {
    let all = await db.all(sql);
    let table = sql.substring(sql.toLowerCase().indexOf("from") + 4).trim().split(" ")[0].trim();
    if(table.charAt(table.length - 1) === ";") table = table.substring(0, table.length - 1);

    let schema = tableCache[table];
    if(schema == undefined || settings?.reloadSchema) {
        schema = await db.all(`pragma table_info(${table});`);
        if(settings?.useTableCache ?? true) tableCache[table] = schema;
    }

    return [all, Array(all.length).fill(schema)];
}

/**
 * Closes any connection to the DB
 */
async function end(db, sql, settings) {
    return await db.end();
}

/**
 * Returns an array of all the SQL statements to recreate the given tables.
 * Assumes all tables if none given.
 */
async function dump(...tables) {
    let exec = async (sql) => await db.query(sql);
    tables = tables.length > 0 ? Array.from(tables) : (await exec("show tables"))[0].map(e => Object.values(e)[0]);

    let dump = [];
    let miniDump = [];
    let ret = {};

    for(let t of tables) {
        ret = (await exec("show create table " + t))[0][0];
        dump.push("-- " + ret["Table"] + " --"); // jshint ignore:line
        dump.push(ret["Create Table"]);
        dump.push("");

        ret = (await exec("select * from " + t));
        if(ret[0][0] !== undefined) {
            let qmark = Object.keys(ret[0][0]).map(() => "?").join(", ");
            dump.push(mysql.format(`INSERT INTO ${t} (${qmark}) VALUES`, Object.keys(ret[0][0])));
            miniDump = [];
            for(let r of ret[0]) {
                miniDump.push("    " + mysql.format(`(${qmark})`, Object.values(r)));
            }
            dump.push(miniDump.join(",\n"));
            dump[dump.length - 1] += ";";
            dump.push("");
        }
    }

    return dump;
}

/**
 * @param opts - An object containing {host, port, user, password, database, driver} 
 * @returns A database object that maps sqlcli functions to sqlite functions
 */
async function createConnection(opts) {
    // Connect to the DB
    let params = {
        filename: opts.database,
        driver: opts.cache ? sqlite3.cached.Database : sqlite3.Database,
        mode: opts.mode ?? sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    };
    let db = await sqlite.open(params);

    // Return bindings
    return {
        db,
        query: query.bind(null, db),
        end: end.bind(null, db),
        dump: dump.bind(null, db),
    };
}

module.exports = {
    createConnection,
    COMMENT_MARKER: "--",
    OPEN_READONLY: sqlite3.OPEN_READONLY,
    OPEN_READWRITE: sqlite3.OPEN_READWRITE,
    OPEN_CREATE: sqlite3.OPEN_CREATE,
    OPEN_URI: sqlite3.OPEN_URI,
    OPEN_FULLMUTEX: sqlite3.OPEN_FULLMUTEX,
    OPEN_SHAREDCACHE: sqlite3.OPEN_SHAREDCACHE,
    OPEN_PRIVATECACHE: sqlite3.OPEN_PRIVATECACHE,
};