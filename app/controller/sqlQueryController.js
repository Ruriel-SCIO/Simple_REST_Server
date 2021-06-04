const axios = require('axios');
const BASE_URL = process.env.DRUID_SERVER;
const sqlQuery = body => axios.post(`${BASE_URL}/druid/v2/sql`, body)
module.exports = {
    "sqlQuery": sqlQuery
}