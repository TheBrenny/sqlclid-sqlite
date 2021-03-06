# SQL CLI MySQL Driver

> *An SQLite Driver for the [SQL CLI](https://github.com/TheBrenny/sqlcli) package!*

Lets you connect to **SQLite** Databases using the [SQL CLI](https://github.com/TheBrenny/sqlcli). This can be installed globally (allowing you to use it everywhere) or locally (to be used within a specific package).

## Install

```commandline
$ npm install [-g] sqlclid-sqlite
```

For most use cases, you'll want to install this globally so you can take full advantage of `sqlcli` anywhere on your computer, however, you can also save it to your dev dependencies to make sure your colleagues are on the same page when inspecting the DB.

```commandline
$ npm install --save-dev sqlcli-repl sqlclid-sqlite
```

## Usage

Open a connection using a URI or through args

```plain
$ sqlcli sqlite:///:memory:
OR
$ sqlcli -d sqlite -b :memory:
```

Find out more help using `sqlcli --help`

Execute typical SQL queries:
```plain
user@localhost> SELECT 1 AS `One`, 2 AS `Two`;
|-----|-----|
| One | Two |
|-----|-----|
|   1 |   2 |
|-----|-----|
```

Execute multi-line SQL queries:
```plain
user@localhost> SELECT
... 3 AS `Three`,
... 4 AS `Four`
... ;
|-------|------|
| Three | Four |
|-------|------|
|     3 |    4 |
|-------|------|
```

Execute JS on results:
```plain
user@localhost> SELECT 1 AS `One`, 2 AS `Two`;sh
user@localhost> >$0
[
  {
    "One": 1,
    "Two": 2
  }
]
```

## More Info

Find out more info at the [SQL CLI](https://github.com/TheBrenny/sqlcli) repo!

## License

MIT