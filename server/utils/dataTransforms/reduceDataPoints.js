const reduceDataPoints = (
  startIdx,
  inputArr,
  dataGap,
  numBuckets
) => {
  let dataSample = []
  let pointer = startIdx
  while (dataSample.length < numBuckets) {
    let currentArr = inputArr[pointer % inputArr.length]
    dataSample.push(currentArr)
    pointer += dataGap
  }
  return dataSample
}

module.exports = reduceDataPoints
