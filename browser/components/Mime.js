import React, { Component } from 'react'
import { Stage, Layer, Circle } from 'react-konva'
import socket from '../socket'
import { connect } from 'react-redux'
import Whiteboard from './Whiteboard';

// These dimensions control the size of the canvas and Image component that forms the drawing surface
const drawingHeight = window.innerHeight - 25
const drawingWidth = window.innerWidth - 25

class Mime extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.stage = React.createRef()
		this.renderShapes = this.renderShapes.bind(this)
	}

	render() {
		return (
			<section>
				<Stage
					width={window.innerWidth}
					height={window.innerHeight}
					ref={this.stage}
				>
					<Layer>
						<Whiteboard
							width={drawingWidth}
							height={drawingHeight}
						/>
					</Layer>
					{/* All wireframe shapes will be rendered in this new layer */}
				</Stage>
			</section>
		)
	}
}

const mapStateToProps = state => {
	const { mimeObjects } = state
	return { mimeObjects }
}

export default connect(mapStateToProps)(Mime)
