// Action types
const CREATE_MIME = 'CREATE_MIME'
const LOAD_MIME = 'LOAD_MIME'
const SAVE_MIME = 'SAVE_MIME'
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'
const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION'

// Action creators
export const createMime = mime => {
	return { type: CREATE_MIME, mime }
}

export const addNewShape = interpretedShape => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

export const updateShapePosition = updatedShape => {
	return { type: UPDATE_SHAPE_POSITION, updatedShape }
}

// Create mime thunk
// Load mime thunk
// Save mime thunk

// Might need to convert 'addNewShape' to a thunk, because it's going to receive the interpreted shape from the server and then it will save the interpreted shape from the server

const initialState = {
	id: 0,
	urlId: '',
	shapes: []
}
// Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
	case ADD_NEW_SHAPE:
		return Object.assign({}, state, { shapes: [ ...state.shapes, action.interpretedShape ] })
	case UPDATE_SHAPE_POSITION:
		// filter out any shapes that don't have the updated shape's id, then add the updated shape to the array
		return Object.assign({}, state, { shapes: [ ...state.shapes.filter(shape => shape.key !== action.updatedShape.key), action.updatedShape ] })
	default:
		return state
	}
}

export default reducer
