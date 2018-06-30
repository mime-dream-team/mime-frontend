import React, { Component } from 'react'
import { Stage, Layer, Image, Circle } from 'react-konva'
import socket from '../socket'

class Whiteboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDrawing: false,
			strokePool: [],
			canvas: '',
			context: ''
		}
		this.image = React.createRef()
	}

	componentDidMount() {
		this.createCanvas()
	}

	// Note: the canvas needs to be the same size as the Image component
	createCanvas = () => {
		const canvas = document.createElement('canvas')
		canvas.width = this.props.width
		canvas.height = this.props.height
		const context = canvas.getContext('2d')
		this.setState({ canvas, context })
	}

	handleMouseDown = () => {
		console.log('mousedown')
		this.setState({ isDrawing: true })
		const stage = this.image.current.parent.parent
		this.lastPointerPosition = stage.getPointerPosition()
	}

	handleMouseUp = () => {
		console.log('mouseup')
		// If there's stroke data after mouse release, emit a draw event to the server
		if (this.state.strokePool.length) socket.emit('draw', this.state.strokePool)
		this.setState({ isDrawing: false, strokePool: [] })
	}

	handleMouseMove = () => {
		const { isDrawing, context } = this.state
		if (isDrawing) {
			context.strokeStyle = '#000000'
			context.lineJoin = 'round'
			context.lineWidth = 5
			context.globalCompositeOperation = 'source-over'
			context.beginPath()
			let sample = []
			let localPos = {
				x: this.lastPointerPosition.x - this.image.current.x(),
				y: this.lastPointerPosition.y - this.image.current.y()
			}
			sample.push([ localPos.x, localPos.y ])
			context.moveTo(localPos.x, localPos.y)
			const stage = this.image.current.parent.parent
			let pos = stage.getPointerPosition()
			localPos = {
				x: pos.x - this.image.current.x(),
				y: pos.y - this.image.current.y()
			}
			context.lineTo(localPos.x, localPos.y)
			sample.push([ localPos.x, localPos.y ])
			this.setState({ strokePool: [ ...this.state.strokePool, ...sample ] })
			context.closePath()
			context.stroke()
			this.lastPointerPosition = pos
			this.image.current.getLayer().draw()
		}
	}

	render() {
		const { canvas } = this.state
		return (
			<Image
				image={canvas}
				ref={this.image}
				width={this.props.width}
				height={this.props.height}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}
			/>
		)
	}
}

export default Whiteboard
