const Router = require('express').Router()

/**
 * A testing endpoint.
 */
module.exports = Router.get('/hello', async(req, res, next) => {
    res.json({"message" : "Hello."})
})