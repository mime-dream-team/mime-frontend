import io from 'socket.io-client'
import store from './store/store'

const socket = io(window.location.origin)

socket.on('connect', () => {
	console.log('I am now connected to the server!')
})

export default socket
