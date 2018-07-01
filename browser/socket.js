import io from 'socket.io-client'
import store from './store/store'
import { addNewShape } from './store/reducers/shapeReducer'

const socket = io(window.location.origin)

socket.on('connect', () => {
	console.log('I am now connected to the server!')

	socket.on('addNewShape', interpretedShape => {
		store.dispatch(addNewShape(interpretedShape))
	})

})

export default socket
