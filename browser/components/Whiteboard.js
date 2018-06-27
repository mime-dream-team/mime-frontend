import React, { Component } from 'react'
import { Stage, Layer, Image, Circle } from 'react-konva'

export default class Whiteboard extends Component {
	state = {
		isDrawing: false,
		strokePool: []
	}

	componentDidMount() {
		const canvas = document.createElement('canvas')
		canvas.width = 500
		canvas.height = 500
		const context = canvas.getContext('2d')
		this.setState({ canvas, context })
	}

	handleMouseDown = () => {
		console.log('mousedown')
		this.setState({ isDrawing: true })
		const stage = this.image.parent.parent
		this.lastPointerPosition = stage.getPointerPosition()
	}

	handleMouseUp = () => {
		console.log('mouseup')
		this.setState({ isDrawing: false, strokePool: [] })
	}

	handleMouseMove = () => {
		console.log(this.state.strokePool)
		const { context, isDrawing } = this.state

		if (isDrawing) {
			context.strokeStyle = '#000000'
			context.lineJoin = 'round'
			context.lineWidth = 5
			context.globalCompositeOperation = 'source-over'
			context.beginPath()
			let sample = []
			let localPos = {
				x: this.lastPointerPosition.x - this.image.x(),
				y: this.lastPointerPosition.y - this.image.y()
			}
			sample.push([ localPos.x, localPos.y ])
			context.moveTo(localPos.x, localPos.y)
			const stage = this.image.parent.parent
			let pos = stage.getPointerPosition()
			localPos = {
				x: pos.x - this.image.x(),
				y: pos.y - this.image.y()
			}
			context.lineTo(localPos.x, localPos.y)
			sample.push([ localPos.x, localPos.y ])
			this.setState({ strokePool: [ ...this.state.strokePool, ...sample ] })
			context.closePath()
			context.stroke()
			this.lastPointerPosition = pos
			this.image.getLayer().draw()
		}
	}

	render() {
		const { canvas } = this.state

		return (
			<Stage width={500} height={500}>
				<Layer>
					<Image
						image={canvas}
						ref={node => (this.image = node)}
						width={500}
						height={500}
						stroke='black'
						onMouseDown={this.handleMouseDown}
						onMouseUp={this.handleMouseUp}
						onMouseMove={this.handleMouseMove}
					/>
					<Circle
						x={300}
						y={300}
						numPoints={5}
						radius={40}
						fill='#89b717'
						opacity={0.8}
						draggable
						shadowColor='black'
						shadowBlur={10}
						shadowOpacity={0.6}
						onDragStart={this.handleDragStart}
						onDragEnd={this.handleDragEnd}
					/>
				</Layer>
			</Stage>
		)
	}
}
