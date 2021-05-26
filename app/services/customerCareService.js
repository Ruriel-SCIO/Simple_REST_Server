const moment = require("moment")
const customerCareController = require('../controller/customerCareController')
const utils = require('utils')
const _fieldBuilder = (dimension, value) => {
    return {
        "type": "selector",
        "dimension": dimension,
        "value": value
    }
}
const _filterBuilder = (operator, status) => {
    if (operator & status) {
        return {
            "type": "and",
            "fields": [
                _fieldBuilder('status', status),
                _fieldBuilder('operator', operator)
            ]
        }
    }
    if(operator)
        return _fieldBuilder('operator', operator)
    if(status)
        return _fieldBuilder('status', status)
}

const amount = async (query) => {
    const currentDate = moment()
    const operator = query.operator
    const status = query.status
    const dimensions = query.dimensions ? query.dimensions.split(",") : []
    const dateStart = query.dateStart || currentDate.format('YYYY-MM-DD');
    const dateEnd = query.dateEnd || dateStart;
    const interval = [dateStart, dateEnd].join("/")
    const granularity = utils.getGranularity(query.granularity)
    console.log(granularity)
    const body = {
        "dataSource" : "service",
        "queryType": "timeseries",
        "filter" : _filterBuilder(operator, status),
        "dimensions" : dimensions,
        "granularity" : granularity == 'none' ? 'all' : granularity,
        "aggregations":[
            {
                "type" : "count",
                "name" : "count"
            }
        ],
        "intervals" : [interval]
    }
    return customerCareController.fetchAmount(body)
}

module.exports = {
    "amount" : amount
}