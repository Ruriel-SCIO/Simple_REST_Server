const GRANULARITIES = ['all', 'none', 'second', 'minute', 'fifteen_minute', 'thirty_minute', 'hour', 'day', 'week', 'month', 'quarter' ,'year'];

const getGranularity = searchValue => {
    const value = searchValue.trim().toLowerCase();
    return GRANULARITIES.indexOf(value) === -1 ? 'all' : value;
}

const groupByTime = result => {
    const timestampOccurrences = result.map(row =>  row.timestamp  )
    const timestampDistinctOccurrences = [...new Set(timestampOccurrences)]
    const groupedByTime = timestampDistinctOccurrences.map(timestamp => {
        const filteredByEvent = result.filter(event => event.timestamp === timestamp);
        return {
            "timestamp": timestamp,
            "events": filteredByEvent.map(row => row.event)
        }
    });
    return groupedByTime
}

module.exports = {
    "getGranularity" : getGranularity,
    "groupByTime": groupByTime
}