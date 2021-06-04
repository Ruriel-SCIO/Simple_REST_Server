const Router = require('express').Router
const customerCareService = require('../../services/customerCareService')
module.exports = Router().post('/customerCare/amount', async (req, res, next) => {
    try {
        const result = await customerCareService.amount(req.body)
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})