import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Mime from '../components/Mime'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/mime/:urlId' component={ Mime } />
		</Switch>
	)
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
// https://reacttraining.com/react-router/web/api/withRouter
export default Routes
