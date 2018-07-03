import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMimeThunk } from '../store/reducers/mimeReducer'

class MakeMime extends Component {
	constructor(props) {
		super(props)
		this.state = {
			height: 0,
			width: 0
		}
		this.handleMimeCreate = this.handleMimeCreate.bind(this)
	}
	handleMimeCreate(height, width) {
		const dimensionsObj = { height, width }
		this.props.createMimeThunk(dimensionsObj, this.props.history)
	}
	render() {
		return (
			<div>
				<input name={height} />
				<input name={width} />
				<button />
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
