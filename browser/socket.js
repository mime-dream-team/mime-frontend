import io from 'socket.io-client'
import store from './store/store'
import { addNewShape, saveMime } from './store/reducers/mimeReducer'

const socket = io(window.location.origin)

socket.on('connect', () => {
	console.log('I am now connected to the server!')

	socket.on('addNewShape', interpretedShape => {
		store.dispatch(addNewShape(interpretedShape))
		let time = new Date(new Date().getTime()).toTimeString().slice(0,8)
		store.dispatch(saveMime(time))
	})

})

export default socket
