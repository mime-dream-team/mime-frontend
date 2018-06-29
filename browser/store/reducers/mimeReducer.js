// Action types
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'
const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION'

// Action creators
export const addNewShape = interpretedShape => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

export const updateShapePosition = updatedShape => {
	return { type: UPDATE_SHAPE_POSITION, updatedShape }
}

// Reducer
// Mime state will be an array of objects, where objects contain shape data
const reducer = (state = [], action) => {
	switch (action.type) {
	case ADD_NEW_SHAPE:
		return [ ...state, action.interpretedShape ]
	case UPDATE_SHAPE_POSITION:
		let shapesNotUpdating = state.filter(shape => shape.key !== action.updatedShape.key)
		return [ ...shapesNotUpdating, action.updatedShape ]
	default:
		return state
	}
}

export default reducer
