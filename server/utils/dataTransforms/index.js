const centerData = require('./centerData')
const createOutputData = require('./createOutputData')
const generateDataSets = require('./generateDataSets')
const processTrainingData = require('./processTrainingData')
const reduceDataPoints = require('./reduceDataPoints')
const reduceDataPointsWithSpread = require('./reduceDataPointsWithSpread')
const {removeSimilarDataPoints} = require('./removeSimilarDataPoints')
const scaleToStandardSize = require('./scaleToStandardSize')

module.exports = {
  centerData,
  createOutputData,
  generateDataSets,
  processTrainingData,
  reduceDataPoints,
  reduceDataPointsWithSpread,
  removeSimilarDataPoints,
  scaleToStandardSize
}
