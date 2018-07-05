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
	handleMimeCreate(e) {
		e.preventDefault()
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
			<form onSubmit={this.handleMimeCreate} className='mime-form'>
				<div className='mime-form__wrapper'>
					<label className='mime-form__label' htmlFor='width'>Width (px)</label>
					<input className='mime-form__input' name='width' onChange={this.handleChange} type='number' placeholder='1280' />
				</div>
				<div className='mime-form__wrapper'>
					<label className='mime-form__label' htmlFor='height'>Height (px)</label>
					<input className='mime-form__input' name='height' onChange={this.handleChange} type='number' placeholder='720' />
				</div>
				<button className='button button--extra-margin' type='submit'>Make a Mime</button>
			</form>
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
