const Router = require('express').Router()

module.exports = Router.get('/hello', async(req, res, next) => {
    res.json({"message" : "Hello."})
})