import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/main.css'

ReactDOM.render(
	<Provider store = { store }>
		<div>Hello, world!</div>
	</Provider>,
	document.getElementById('app')
)
