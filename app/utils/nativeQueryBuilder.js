const moment = require('moment')

const _GRANULARITIES = ['all', 'none', 'second', 'minute', 'fifteen_minute', 'thirty_minute', 'hour', 'day', 'week', 'month', 'quarter' ,'year'];

const _getGranularity = searchValue => {
    const value = searchValue.trim().toLowerCase();
    return _GRANULARITIES.indexOf(value) === -1 ? 'all' : value;
}

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

const _intervalBuilder = (dateStart, dateEnd) => {
    const currentDate = moment()
    const start = dateStart || currentDate.format('YYYY-MM-DD');
    const end = dateEnd || start;
    return [start, end].join("/");
}

const groupByQuery = (dataSource, dimensions, filterElements, granularity, dateStart, dateEnd) => {
    const query = {
        "dataSource": dataSource,
        "queryType": "groupBy",
        "dimensions": dimensions || [],
        "filter": !filterElements ? null : _filterBuilder(filterElements),
        "granularity": _getGranularity(granularity),
        "aggregations": [
            {
                "type": "count",
                "name": "count"
            }
        ],
        "intervals": _intervalBuilder(dateStart, dateEnd)
    }
    return query;
}

module.exports = {
    "groupByQuery": groupByQuery
}