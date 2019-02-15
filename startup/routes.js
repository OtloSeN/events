const express = require('express');
const events = require('../routes/events');
const api = require('../routes/api');

module.exports = (app) => {
    app.use(express.json());
    app.use('/', events)
    app.use('/api/events', api);
}