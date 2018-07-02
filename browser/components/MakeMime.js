import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMimeThunk } from '../store/reducers/mimeReducer'

class MakeMime extends Component {
	handleMimeCreate(height, width) {
		const dimensionsObj = { height, width }
		this.props.createMimeThunk(dimensionsObj, this.props.history)
	}
	render() {
		return (
			<div>
				<div>
					<h1>
						Select a size to create your mime wireframe.
					</h1>
				</div>
				<div>
					<button
						type='button'
						onClick={() => this.handleMimeCreate(768, 1024)}
					>
						768 x 1024
					</button>
					<button
						type='button'
						onClick={() => this.handleMimeCreate(1920, 1080)}
					>
						1920 x 1080
					</button>
					<button
						type='button'
						onClick={() => this.handleMimeCreate(2560, 1440)}
					>
						2560 x 1440
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = { createMimeThunk }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MakeMime)
