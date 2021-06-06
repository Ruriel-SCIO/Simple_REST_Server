const moment = require('moment')

/**
 * The available granularities by Druid. It's used in the _getGranularity function.
 */
const _GRANULARITIES = ['all', 'none', 'second', 'minute', 'fifteen_minute', 'thirty_minute', 'hour', 'day', 'week', 'month', 'quarter' ,'year'];

/**
 * Reads an value and return the granularity it represents. Defaults to 'all' in case it's not valid.
 * @param searchValue The value that is expected to be a granularity.
 * @returns A valid granularity.
 */
const _getGranularity = searchValue => {
    const value = searchValue.trim().toLowerCase();
    return _GRANULARITIES.indexOf(value) === -1 ? 'all' : value;
}
/**
 * Reads a field of the following format:
 * {
 *  "type": Type of field. Can be 'logic' for boolean operands or the same types specified by Druid.
 *  "value": The value of the field.
 *  "name": The name of field to be searched in Druid. Ignored if type is 'logic'.
 * }
 * The result will be part of a Selector filter, as documented here:
 * https://druid.apache.org/docs/latest/querying/filters.html#selector-filter
 * @param field The field to be converted.
 * @returns Part of a selector filter.
 */
const _parseField = (field) => {
    if (field.type == 'logic') return { "type": field.value, fields: [] };
    return { "type": "selector", "dimension": field.name, "value": field.value };
}
/**
 * Reads a list of fields to be converted in a full Selector Filter.
 * @param fieldList The list of fields to be converted.
 * @returns The Selector Filter.
 */
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

/**
 * Reads the dates to be used as interval.
 * @param dateStart The inital date of the interval. Defaults to today. 
 * @param dateEnd The end date of the interval. Defaults to dateStart. 
 * @returns A String representing the interval, whichi is two dates joined by a slash.
 */
const _intervalBuilder = (dateStart, dateEnd) => {
    const currentDate = moment()
    const start = dateStart || currentDate.format('YYYY-MM-DD');
    const end = dateEnd || start;
    return [start, end].join("/");
}

/**
 * Builds a groupby Native query to be sent to Druid. More information here:
 * https://druid.apache.org/docs/0.21.0/querying/groupbyquery.html
 * @param dataSource The dataSource where Druid will search the data. In this project, it's 'service'. 
 * @param dimensions A list of dimensions. Defaults to an empty array.
 * @param filterElements A list of fields to be used to generate a filter. 
 * Each field has the following schema:
 * {
 *  "type":  Type of field. Can be 'logic' for boolean operands or the same types specified by Druid.
 *  "value": The value of the field.
 *  "name":  The name of field to be searched in Druid. Ignored if type is 'logic'.
 * }
 * The result will be part of a Selector filter, as documented here:
 * https://druid.apache.org/docs/latest/querying/filters.html#selector-filter
 * @param granularity The granularity of the data. Defaults to 'all' if a invalid granularity is sent.
 * @param dateStart The start date that will be used in the interval. Defaults to today.
 * @param dateEnd The end date that will be used in the interval. Defaults to dateStart.
 * @returns The result of the groupByQuery.
 */
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