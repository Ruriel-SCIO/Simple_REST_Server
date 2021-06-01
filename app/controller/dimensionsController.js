const axios = require('axios');
const BASE_URL = process.env.DRUID_SERVER;
const fetchDimensions = () => axios.get(`${BASE_URL}/druid/v2/datasources/service/dimensions`)

module.exports = {
    "fetchDimensions" : fetchDimensions
}