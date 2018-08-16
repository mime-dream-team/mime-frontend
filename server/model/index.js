const tf = require('@tensorflow/tfjs')
// console.log("tensorflow, tf: ", tf)
// console.log("server/model/index before require tfjs-node")
require('@tensorflow/tfjs-node')
// console.log("server/model/index after require tfjs-node")
require('./shape-recognition.json');
// console.log("server/model/index before setBackend")
tf.setBackend('cpu')
// console.log("server/model/index after setBackend")

const processTrainingData = require('./../utils/dataTransforms/processTrainingData')

let model;
const getPrediction = async (stroke) => {
	try {
		//Used routing from fs root because JSON wouldn't load from current folder
		const inputTensor = tf.tensor2d([stroke])
		model = await tf.loadModel('file://server/model/shape-recognition.json','file://shape-recognition.weights.bin')
		const result = await model.predict(inputTensor)
		return result.data().then(data => data);
	} catch(err) {
		console.log(err)
	}
}

module.exports = getPrediction
