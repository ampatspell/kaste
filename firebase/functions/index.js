const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Application = require('./src/app');

admin.initializeApp();

let app = new Application(admin, functions);

Object.assign(module.exports, app.exports);
