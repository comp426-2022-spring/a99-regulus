/*!
* Start Bootstrap - Modern Business v5.0.6 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const minimist = require('minimist')
const express = require('express')
const app = express()
const args = minimist(process.argv)
const db = require('./database.js');
const usersdb = require('./users.js');
const morgan = require('morgan');
const fs = require('fs');

var port = args['port'] ? args['port'] : 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

// idk what this stuff is its just on all my other stuff
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static HTML files
app.use(express.static('./'));
// Make Express use its own built-in body parser to handle JSON
app.use(express.json());

// Insert info into interaction database at any endpoint. this will change based on what the assignment calls for
app.use((req, res, next) => {
    const stmt = db.prepare('INSERT INTO interactionlog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, secure, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    let secure;
    if (req.secure) {
        secure = 'true';
    } else {
        secure = 'false';
    }
    const info = stmt.run(req.ip, req.user, Date.now(), req.method, req.url, req.protocol, req.httpVersion, secure, res.statusCode, req.headers['referer'], req.headers['user-agent'])
    next()
});

// Insert info in JSON into readable JSON access file
app.use((req, res, next) => {
    let accessData = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referrer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    let accessJson = fs.readFileSync("./data/log/access.json","utf-8");
    let access = JSON.parse(accessJson);
    const arr = Array.from(access)
    arr.push(accessData);
    accessJson = JSON.stringify(arr);
    fs.writeFileSync("./data/log/access.json",accessJson,"utf-8");
    next()
})

// Main app endpoint
app.get('/app', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('status', 200)
    res.end('200 OK')
})

app.get('/app/log/access', (req, res) => {
    const stmt = usersdb.prepare('SELECT * FROM userslog').all()
    res.status(200).json(stmt)
});

// POST endpoint to create a user in users.db
app.post('/contact.html/app/user/create', (req, res, next) => {
    // Info to be passed into db
    let userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }
    // Pass into db
    const stmt = usersdb.prepare('INSERT INTO userslog (name, email, phone, message) VALUES (?, ?, ?, ?)');
    const info = stmt.run(userData.name, userData.email, userData.phone, userData.message);
    // Pass info into human readable JSON document
    let usersJson = fs.readFileSync("./data/log/users.json","utf-8");
    let users = JSON.parse(usersJson);
    const arr = Array.from(users);
    arr.push(userData);
    usersJson = JSON.stringify(arr);
    fs.writeFileSync("./data/log/users.json",usersJson,"utf-8");
    // Return status in JSON with contact info entered
    res.status(200).json({"name":userData.name, "email":userData.email, "phone":userData.phone, "message":userData.message});
})

// POST endpoint for updating a single user
app.post("/app/user/update", (req, res) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }
    const stmt = db.prepare('UPDATE userinfo SET name = COALESCE(?,name), email = COALESCE(?,email), phone = COALESCE(?,phone), message = COALESCE(?, message) WHERE id = ?')
    const info = stmt.run(data.name, data.email, data.phone, data.message, req.params.id)
    res.status(200).json(info)
});

// DELETE endpoint to remove a user
app.delete("/app/user/delete/:id", (req, res) => {
    const stmt = db.prepare('DELETE FROM userinfo WHERE id = ?')
    const info = stmt.run(req.params.id)
    res.status(200).json(info)
});

app.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('404 Not Found')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})