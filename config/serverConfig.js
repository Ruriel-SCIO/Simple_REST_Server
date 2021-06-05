require('dotenv').config();
const express = require('express');
const http = require('http');
const router = require('../app/routes/createRouter')()
/**
 * Express setup. Sets the base endpoint to /api and sets the router.
 * @returns The prepared Express configuration.
 */
module.exports = () => {
    const app = express();
    app.use(express.json())
    app.use('/api', router)
    http.createServer(app);
    return app
}