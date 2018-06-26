// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import Whiteboard from './Whiteboard'

// React / Redux setup
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/main.css'

ReactDOM.render(
	<Provider store = { store }>
		<Whiteboard />
	</Provider>,
	document.getElementById('app')
)
