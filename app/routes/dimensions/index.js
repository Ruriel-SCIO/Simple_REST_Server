const Router = require('express').Router
const dimensionService = require('../../services/dimensionService')
module.exports = Router().get('/dimensions', async (req, res, next) => {
    try {
        const result = await dimensionService.dimensions()
        res.json(result.data);
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})