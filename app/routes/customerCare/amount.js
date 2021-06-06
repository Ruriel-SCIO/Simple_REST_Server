const Router = require('express').Router
const customerCareService = require('../../services/customerCareService')
/**
 * Indicates the endpoint where a Native Query will be sent to Druid to return
 * the amount of events that happened according to the query.
 */
module.exports = Router().post('/customerCare/amount', async (req, res, next) => {
    try {
        const result = await customerCareService.amount(req.body)
        res.json(result)
    }
    catch (err) {
        console.log('error', err)
        res.send(err)
    }
})