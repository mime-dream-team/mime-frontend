import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './routes/history'
import store from './store/store'
import Root from './Root'
import './styles/main.css'

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Root />
		</Router>
	</Provider>,
	document.getElementById('app')
)
