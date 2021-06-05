const Router = require('express').Router
const dimensionService = require('../../services/dimensionService')
/**
 * Defines an endpoint that returns all the dimensions in the datasource.
 */
module.exports = Router().get('/dimensions', async (req, res, next) => {
    try {
        const result = await dimensionService.dimensions()
        res.json(result);
    }
    catch (err) {
        console.log('error', err)
        res.send(err)
    }
})