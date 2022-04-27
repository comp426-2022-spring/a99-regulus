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
const morgan = require('morgan');
const fs = require('fs');

var port = args['port'] ? args['port'] : 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

// idk what this stuff is its just on all my other stuff
app.use(express.urlencoded({ extended: true }));
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

