import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
// Import components here
// Import anything from the store here

const Routes = () => {
	return (
		<Switch>
			<Route path='/mime' component={ {/*Mime component name will go here*/} } />
		</Switch>
	)
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(Routes)
