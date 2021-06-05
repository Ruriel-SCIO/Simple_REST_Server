/**
 * Reads the data to group the events by timestamp.
 * @param result The result returned by Druid. 
 * @returns The events grouped by timestamp.
 */
const groupByTime = result => {
    const timestampOccurrences = result.map(row => row.timestamp)
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
    "groupByTime": groupByTime
}