const { mapStandardDeviation } = require('./removeSimilarDataPoints')
// For testing purposes, we've added the standard deviation function here
const reduceDataPointsWithSpread = (
  startIdx,
  inputArr,
  dataGap,
  numBuckets
) => {
  let dataSample = []
  let pointer = startIdx
  while (dataSample.length < numBuckets * 2 - 1) {
	let currentArr = inputArr[pointer % inputArr.length]
    dataSample.push(...currentArr[0])
    dataSample.push(...currentArr[1])
    pointer += dataGap
  }
  return mapStandardDeviation(dataSample)
}

module.exports = reduceDataPointsWithSpread
