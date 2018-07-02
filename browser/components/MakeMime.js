import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMimeThunk } from '../store/reducers/mimeReducer'

class MakeMime extends Component {
	// [h, w]
	// [768, 1024]
	// [1920, 1080]
	// [2560, 1440]
	handleMimeCreate(height, width) {
		const dimensionsObj = { height, width }
		this.props
			.createMimeThunk(dimensionsObj)
			.then((newMimeObj) =>
				this.props.history.push(`/mime/${newMimeObj.urlId}`))
		//we should get the urlId from this and push to history
	}

	render() {
		return (
			<div>
				<button type='button' onClick={() => this.handleMimeCreate(768, 1024)}>
					768 x 1024
				</button>
				<button type='button' onClick={() => this.handleMimeCreate(1920, 1080)}>
					1920 x 1080
				</button>
				<button type='button' onClick={() => this.handleMimeCreate(2560, 1440)}>
					2560 x 1440
				</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = () => {
	return { createMimeThunk }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MakeMime)
