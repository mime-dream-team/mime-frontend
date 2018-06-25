import axios from 'axios'

// action types
const ACTION_TYPE = 'ACTION_TYPE'

// action creators
const actionCreator = data => {
	return {type: ACTION_TYPE, data}
}

// thunks
// wrap async code
const actionCreatorThunk = data => dispatch => {
	axios.get('/api/user/:data')
		.then(newData => dispatch(actionCreator(newData.data)))
		.catch(console.error)
}

// initial state
// each piece of state should be typed
const initialState = {
	data: []
}

// reducer
// must return a new state and not mutate previous state
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE:
			return { data: action.data }
		default:
			return state
	}
}

export default reducer
