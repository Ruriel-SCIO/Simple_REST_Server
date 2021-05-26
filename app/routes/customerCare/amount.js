const Router = require('express').Router
const customerCareService = require('../../services/customerCareService')
module.exports = Router().get('/customerCare/amount', async (req, res, next) => {
    try {
        const result = await customerCareService.amount(req.query)
        res.json(result.data)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})