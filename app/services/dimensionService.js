const dimensionController = require('../controller/dimensionsController')
const dimensions = async () => dimensionController.fetchDimensions()
module.exports = {
    "dimensions" : dimensions
}