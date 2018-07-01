// Action types
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'
const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION'
const DELETE_SHAPE = 'DELETE_SHAPE'

// Action creators
export const addNewShape = (interpretedShape) => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

export const updateShapePosition = (updatedShape) => {
	return { type: UPDATE_SHAPE_POSITION, updatedShape }
}

export const deleteOneShape = (deletedShape) => {
	return { type: DELETE_SHAPE, deletedShape }
}

// Reducer
// Mime state will be an array of objects, where objects contain shape data
const reducer = (state = [], action) => {
	switch (action.type) {
	case ADD_NEW_SHAPE:
		return [ ...state, action.interpretedShape ]
	case UPDATE_SHAPE_POSITION:
		// filter out any shapes that don't have the updated shape's id, then add the updated shape to the array
		return Object.assign({}, state, {
			shapes: [
				...state.filter((shape) => shape.key !== action.updatedShape.key),
				action.updatedShape
			]
		})
	case DELETE_SHAPE:
		// similar logic as above but for deletion, not included the deleted shape
		return Object.assign({}, state, {
			shapes: [
				...state.filter((shape) => shape.key !== action.deletedShape.key)
			]
		})
	default:
		return state
	}
}

export default reducer
