import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMimeThunk } from '../store/reducers/mimeReducer'

class MakeMime extends Component {
	constructor(props) {
		super(props)
		this.state = {
			height: '',
			width: ''
		}
		this.handleMimeCreate = this.handleMimeCreate.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleMimeCreate() {
		const height = this.state.height
		const width = this.state.width
		if (height > 0 && width > 0) {
			let dimensionsObj = {
				height: Number(height),
				width: Number(width)
			}
			this.props.createMimeThunk(dimensionsObj, this.props.history)
		}
	}
	handleChange(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div>
				<input name='width' onChange={this.handleChange} />
				<input name='height' onChange={this.handleChange} />
				<button type='button' onClick={this.handleMimeCreate} />
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
