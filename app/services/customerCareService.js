const moment = require("moment")
const customerCareController = require('../controller/customerCareController')
const utils = require('utils')
const _parseField = (field) => {
    if (field.type == 'logic') return { "type": field.value, fields: [] };
    return { "type": "selector", "dimension": field.name, "value": field.value };
}

const _filterBuilder = (fieldList) => {
    let filter = {};
    if (fieldList.length > 1) {
        filter = _parseField(fieldList[1]);
        filter.fields = [
            _parseField(fieldList[0]),
            _filterBuilder(fieldList.slice(2))
        ];
    }
    else
        filter = _parseField(fieldList[0]);
    return filter;
}
const amount = async (body) => {
    const currentDate = moment()
    const dateStart = body.dateStart || currentDate.format('YYYY-MM-DD');
    const dateEnd = body.dateEnd || dateStart;
    const interval = [dateStart, dateEnd].join("/")
    const granularity = utils.getGranularity(body.granularity)
    const request = {
        "dataSource": "service",
        "queryType": "groupBy",
        "dimensions": body.dimensions || [],
        "filter": body.filter ? _filterBuilder(body.filter) : null,
        "granularity": granularity,
        "aggregations": [
            {
                "type": "count",
                "name": "count"
            }
        ],
        "intervals": [interval]
    }
    const result = await customerCareController.nativeQuery(request)
    return utils.groupByTime(result.data)
}

module.exports = {
    "amount": amount
}

/**
 * queryType: "groupBy"
 * "dataSource":
 * {
 *      "type" : "query",
 *      "query" : {
            "dataSource": "service",
            "queryType": "groupBy",
            "dimensions": body.dimensions || [],
            "filter": body.filter ? _filterBuilder(body.filter) : null,
            "granularity": granularity,
            "aggregations": [
                {
                    "type": "count",
                    "name": "count"
                }
            ],
            "intervals": [interval]
    }
}
 */