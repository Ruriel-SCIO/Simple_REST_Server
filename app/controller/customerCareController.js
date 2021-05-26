const axios = require('axios');
const BASE_URL = process.env.DRUID_SERVER;
const nativeQuery = body => axios.post(`${BASE_URL}/druid/v2`, body)
module.exports = {
    "nativeQuery" : nativeQuery
}