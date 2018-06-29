import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Mime from '../components/Mime'
// Import components here
// Import anything from the store here

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' render={() => <h1>Hey</h1>} />
			<Route exact path='/mime' component={Mime} />
			<Route path='/mime/:roomName' component={Mime} />
		</Switch>
	)
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
// https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(Routes)
