require('dotenv').config();
const express = require('express');
const http = require('http');
const router = require('../app/routes/createRouter')()
module.exports = () => {
    const app = express();
    app.use('/api', router)
    http.createServer(app);
    return app
}