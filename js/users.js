// Database for keeping track of Users
"use strict";

const Database = require('better-sqlite3')
const db = new Database('./data/db/users.db')

const stmt = db.prepare(
    `SELECT name FROM sqlite_master WHERE type='table' and name='userslog';`
);

let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE userslog ( userid TEXT, pass TEXT );
        INSERT INTO userslog (userid, pass) VALUES ('exampleUser','examplePass');
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and one entry containing examples.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}

module.exports = db