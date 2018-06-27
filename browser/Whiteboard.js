import React, { Component } from 'react'
import { EventEmitter } from 'events'
import io from 'socket.io-client'

// export const socket = io(window.location.origin)
// export const events = new EventEmitter()

// socket.on('connect', () => console.log('I have made a persistent two-way connection to the server!'))

// socket.on('load', strokes => {
//   strokes.forEach(stroke => {
//     const { start, end, color } = stroke
//     // draw(start, end, color, false)
//   })
// })

// socket.on('draw', function (start, end, color) {
//   draw(start, end, color, false)
// })

// whiteboard.on('draw', function (start, end, color) {
//   socket.emit('draw', start, end, color)
// })

class Whiteboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			color: '',
			colors: [ 'black', 'purple', 'red', 'green', 'orange', 'yellow', 'brown'],
			currentMousePosition: { x: 0, y: 0 },
			lastMousePosition: { x: 0, y: 0 }
		}
		this.canvas = React.createRef()
		this.events = events
		this.draw = this.draw.bind(this)
	}
	componentDidMount(){
		console.log(this.events)
		this.ctx = this.canvas.current.getContext('2d')
		this.events.on('draw', console.log)
		this.events.on('draw', (start, end, color) => {
			// socket.emit('draw', start, end, color)
		})
		// setupColorPicker
		// setupCanvas
	}
	draw(start, end, strokeColor = 'black', shouldBroadcast = true) {
		// Draw the line between the start and end positions
		// that is colored with the given color.
		this.ctx.beginPath()
		this.ctx.strokeStyle = strokeColor
		this.ctx.moveTo(...start)
		this.ctx.lineTo(...end)
		this.ctx.closePath()
		this.ctx.stroke()

		// If shouldBroadcast is truthy, we will emit a draw event to listeners
		// with the start, end and color data.
		if (shouldBroadcast) this.events.emit('draw', start, end, strokeColor)
	}
	handleMouseMove(event){
		if (event.buttons){
			this.setState(previousState => { 
				return {
					lastMousePosition: previousState.currentMousePosition,
					currentMousePosition: this.position(event)
				}
			})
			this.draw(this.lastMousePosition, this.currentMousePosition, this.color, true)
		}
	}
	handleMouseDown(event){
		this.setState({ currentMousePosition: this.position(event) })
	}
	position(event) {
		return [
				event.pageX - this.canvas.offsetLeft,
				event.pageY - this.canvas.offsetTop
		]
	}
	render(){
		return (
		<canvas ref={ this.canvas } onMouseDown={ this.handleMouseDown }></canvas>
		)
	}
}

export default Whiteboard
