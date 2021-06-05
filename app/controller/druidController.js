const axios = require('axios');
const BASE_URL = process.env.DRUID_SERVER;
/**
 * Sends a request to Druid as a Native Query. More information about the format in the link:
 * https://druid.apache.org/docs/latest/querying/querying.html
 * @param body An object representing the Native Query. 
 * @returns The result of the query.
 */
const nativeQuery = body => axios.post(`${BASE_URL}/druid/v2`, body)

/**
 * Sends a request to Druid as a SQL Query. More information about it in the link:
 * https://druid.apache.org/docs/latest/querying/sql#client-apis
 * @param body An object representing the SQL Query. 
 * @returns The result of the query.
 */
const sqlQuery = body => axios.post(`${BASE_URL}/druid/v2/sql`, body)
module.exports = {
    "nativeQuery" : nativeQuery,
    "sqlQuery": sqlQuery
}