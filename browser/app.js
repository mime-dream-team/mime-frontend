import Whiteboard from './Whiteboard'

// React / Redux setup
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/main.css'

ReactDOM.render(
	<Provider store={store}>
		<Whiteboard />
	</Provider>,
	document.getElementById('app')
)
