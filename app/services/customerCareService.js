const nativeQueryController = require('../controller/nativeQueryController')
const { nativeQueryBuilder, groupByTime} = require('../utils')

const amount = async (body) => {
    const dataSource = 'service';
    const { dimensions, filter, granularity, dateStart, dateEnd } = body;
    const query = nativeQueryBuilder.groupByQuery(dataSource, dimensions, filter, granularity, dateStart, dateEnd);
    const result = await nativeQueryController.nativeQuery(query);
    return groupByTime(result.data);
}

module.exports = {
    "amount": amount
}