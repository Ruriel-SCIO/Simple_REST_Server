const sqlQueryController = require('../controller/sqlQueryController')
const dimensions = async () => {
    const body = {
        "query" : "select dimensions from sys.segments where datasource = ? group by dimensions",
        "parameters" : [{
            "type" : "VARCHAR",
            "value" : "service"
        }]
    }
    const { data } = await sqlQueryController.sqlQuery(body)
    return { "dimensions": JSON.parse(data[0].dimensions)}
}
module.exports = {
    "dimensions" : dimensions
}