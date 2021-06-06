const druidController = require('../controller/druidController')
/**
 * Queries for the dimensions using SQL. The result is a JSON string, that is parsed.
 * @returns The parsed JSON string.
 */
const dimensions = async () => {
    const body = {
        "query" : "SELECT dimensions FROM sys.segments WHERE datasource = ? GROUP BY dimensions",
        "parameters" : [{
            "type" : "VARCHAR",
            "value" : "service"
        }]
    }
    const { data } = await druidController.sqlQuery(body)
    return { "dimensions": JSON.parse(data[0].dimensions)}
}
module.exports = {
    "dimensions" : dimensions
}