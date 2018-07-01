import React, { Component } from 'react'
import { Transformer } from 'react-konva'

export default class Transform extends Component {
	componentDidMount() {
		console.log('sn', this.props)
		const stage = this.transformer.getStage()
		const shapePredicted = stage.findOne(`.${this.props.shapeName}`)
		this.transformer.attachTo(shapePredicted)
		this.transformer.getLayer().batchDraw()
	}
	render() {
		return (
			<Transformer
				ref={node => {
					this.transformer = node
				}}
			/>
		)
	}
}
