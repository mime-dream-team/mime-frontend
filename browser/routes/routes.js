import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Mime from '../components/Mime'
import Home from '../components/Home'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={ Home } />
			<Route exact path='/mime/:urlId' component={ Mime } />
			<Route component={ Home } />
		</Switch>
	)
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
// https://reacttraining.com/react-router/web/api/withRouter
export default Routes
