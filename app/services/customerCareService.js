const druidController = require('../controller/druidController')
const { nativeQueryBuilder, dataFormatter} = require('../utils')
/**
 * Reads the data sent by the request to create a Native Query, sends it to Druid and groups the
 * result by timestamp.
 * @param body.dimensions The list of the dimensions.
 * @param body.filter The list of filters to be used.
 * @param body.granularity The level of granularity to be sent to Druid.
 * @param body.dateStart The initial date that will be used in the period. Defaults to today.
 * @param body.dateEnd The end date that will be used in the period. Defaults to dateStart.  
 * @returns The result of the query grouped by timestamp.
 */
const amount = async (body) => {
    const dataSource = 'service';
    const { dimensions, filter, granularity, dateStart, dateEnd } = body;
    const query = nativeQueryBuilder.groupByQuery(dataSource, dimensions, filter, granularity, dateStart, dateEnd);
    const result = await druidController.nativeQuery(query);
    return dataFormatter.groupByTime(result.data);
}

module.exports = {
    "amount": amount
}