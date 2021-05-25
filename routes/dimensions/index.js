const Router = require('express').Router
const dimensionController = require('../../controller/dimensions')
module.exports = Router().get('/dimensions', async (req, res, next) => {
    const dimensionsRes = await dimensionController.fetchDimensions();
    res.send(dimensionsRes.data);
})