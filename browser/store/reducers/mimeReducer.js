// Action types
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'

// Action creators
export const addNewShape = interpretedShape => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

// Reducer
// Mime state will be an array of objects, where objects contain shape data
const reducer = (state = [], action) => {
	switch (action.type) {
	case ADD_NEW_SHAPE:
		return [ ...state, action.interpretedShape ]
	default:
		return state
	}
}

export default reducer
