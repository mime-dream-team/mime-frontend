import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Whiteboard from '../components/Whiteboard'
// Import components here
// Import anything from the store here

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/mime' component={ Whiteboard } />
		</Switch>
	)
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
// https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(Routes)
