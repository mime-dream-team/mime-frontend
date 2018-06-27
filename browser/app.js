import Whiteboard from './Whiteboard'

// React / Redux setup
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './routes/history'
import store from './store/store'
import './styles/main.css'

ReactDOM.render(
	<Provider store = { store }>
		<Router history={ history }>
			{/*This will be our upper-most app wrapper*/}
			{/*In the app component, we'll require in the routes component*/}
		</Router>
	</Provider>,
	document.getElementById('app')
)
