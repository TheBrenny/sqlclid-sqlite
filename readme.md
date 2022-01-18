# SQL CLI SQLite Driver

> *A SQLite Driver for the [SQL CLI](https://github.com/TheBrenny/sqlcli) package!*

Lets you connect to SQLite Servers using the [SQL CLI](https://github.com/TheBrenny/sqlcli). This can be installed globally (allowing you to use it everywhere) or locally (to be used within a specific package).

## Install

```commandline
$ npm install --save-dev sql-cli-repl
$ npm install [-g] sqlclid-sqlite
```

These packages can be installed globally or locally depending on your dev requirements. They're intended to be installed globally, but putting them into your `devDependencies` can only help your team get on the same page!

## Usage

Open a connection using a URI or through args
```plain
$ sqlcli sqlite:///:memory:
OR
$ sqlcli -driver sqlite -db :memory:
```
Find out more help using `sqlcli -help`

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
```

Interact with the app/cli
```plain
user@localhost> /prompt sql
sql> /clear
sql> /prompt $reset
user@localhost> 
```

Execute JS on results
```plain
user@localhost> SELECT 1 AS `One`, 2 AS `Two`;
user@localhost> >$0

```

## Commands

There are three (point one) types of commands that this CLI can recognise:
- [Install](#install)
- [Usage](#usage)
- [Commands](#commands)
  - [SQL Commands](#sql-commands)
    - [SQL Commands Suppressed](#sql-commands-suppressed)
  - [App Commands](#app-commands)
  - [JS Commands](#js-commands)
- [License](#license)

### SQL Commands

All SQL commands are piped directly to the SQL server taht you connect to. This means that any command that you can run on an SQL server is a viable option here.

All SQL commands must terminate with a `;`, just like how you would when executing SQL commands in a script file. The only exception to this is when you want to [suppress output](#sql-commands-suppressed).

**Example:**
```plain
user@localhost> SELECT 1 AS `One`, 2 AS `Two`;
|-----|-----|
| One | Two |
|-----|-----|
|   1 |   2 |
|-----|-----|
user@localhost> 
```

#### SQL Commands Suppressed

Terminating an SQL command with `;sh` (remember 🤫) will suppess the output. Everything else about the way this command works is identical to a normal SQL command.

**Example:**
```plain
user@localhost> SELECT 1 AS `One`, 2 AS `Two`;sh
user@localhost> 
```

### App Commands

App commands allow you to interact directly with the application, such as modifying the prompt or clearing the screen, but it also lets you modify settings. These commands start with a `/` to denote that the following instructions should be handled by the application.

All available commands:
- `/clear` - Clears the screen
- `/prompt [...p]` - Sets the prompt to your passed value `p` (automatically adds the `> `)
  - `/prompt` - Ommitting `p` will display the current prompt value
  - There are a number of `$` values that can be used as `p`:
    - `$reset` - If passed by itself, this will reset the prompt to the default value (`$user@$host`)
    - `$[config]` - Inserts the config option (user, host, pass, port, db, etc...)
- `/set <setting> [...opts]` - Sets or shows the settings of the application. The following settings are available:
  - `/set raw [opt] [val]`
    - Without `val` shows either the whole raw mode setting or the specific raw mode setting. With `val` it sets the setting.
    - `opt` can be either `mode` or `active`
    - More help can be found by calling `!help`
- ***TO BE ADDED***
- `/save [opt]` Saves data about the session to the PWD
  - `/save session` Saves only the commands and results called
  - `/save settings` Saves the current settings of the application
  - `/save all` Saves the entire session (commands and settings)

### JS Commands



## License

MIT