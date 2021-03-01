const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node')
tf.setBackend('cpu')

const getPrediction = async (stroke) => {
	try {
		//Used routing from fs root because JSON wouldn't load from current folder
		const inputTensor = tf.tensor2d([stroke])
		
		//model = await tf.loadModel('file://server/model/shape-recognition.json','file://shape-recognition.weights.bin')
		const handler = tfn.io.fileSystem("server/model/shape-recognition.json");
		const model = await tf.loadModel(handler)
		
		const result = await model.predict(inputTensor)
		return result.data().then(data => data);
	} catch(err) {
		console.log(err)
	}
}

module.exports = getPrediction