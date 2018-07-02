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
		this.props.createMimeThunk(dimensionsObj)
		//we should get the urlId from this and push to history
	}

	render() {
		return <h1>HOME</h1>
	}
}

const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = {
	createMimeThunk
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MakeMime)
