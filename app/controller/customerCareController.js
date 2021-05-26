const axios = require('axios');
const BASE_URL = process.env.DRUID_SERVER;
const fetchAmount = body => axios.post(`${BASE_URL}/druid/v2`, body)
module.exports = {
    "fetchAmount" : fetchAmount
}