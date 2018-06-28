import axios from 'axios'

// action types
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'

// action creators
const addNewShape = interpretedShape => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

// thunks
// wrap async code
const actionCreatorThunk = data => dispatch => {
	axios
		.get('/api/user/:data')
		.then(newData => dispatch(actionCreator(newData.data)))
		.catch(console.error)
}

// initial state
// each piece of state should be typed
const initialState = {
	mimeObjects: []
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
