import axios from 'axios'

// Action types
const CREATE_MIME = 'CREATE_MIME'
const LOAD_MIME = 'LOAD_MIME'
const SAVE_MIME = 'SAVE_MIME'
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'
const DELETE_SHAPE = 'DELETE_SHAPE'
const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION'
const CHANGE_SHAPE_SIZE = 'CHANGE_SHAPE_SIZE'

// Action creators
export const createMime = mime => {
	return { type: CREATE_MIME, mime }
}

export const loadMime = mime => {
	return { type: LOAD_MIME, mime }
}

export const saveMime = mime => {
	return { type: SAVE_MIME, mime }
}

export const addNewShape = interpretedShape => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

export const deleteShape = (deletedShape) => {
	return { type: DELETE_SHAPE, deletedShape }
}

export const updateShapePosition = (updatedShape) => {
	return { type: UPDATE_SHAPE_POSITION, updatedShape }
}

// Thunks
export const createMimeThunk = () => dispatch => {
	axios.post('/mimes')
		.then(res => res.data)
		.then(mime => dispatch(createMime(mime)))
		.catch(console.error)
}

export const loadMimeThunk = urlId => dispatch => {
	axios.get(`/mimes/${urlId}`)
		.then(res => res.data)
		.then(mime => dispatch(loadMime(mime)))
		.catch(console.error)
}

// This thunk expects to receive the entire state from the front-end
export const saveMimeThunk = state => dispatch => {
	const { urlId, shapes } = state
	axios.put(`/mimes/${urlId}/shapes`, { shapes })
		.then(res => res.data)
		.then(savedMime => dispatch(saveMime(savedMime)))
}

const initialState = {
	id: 0,
	urlId: '',
	shapes: []
}

// Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
	case CREATE_MIME:
		return { id: action.mime.id, urlId: action.mime.urlId, shapes: [] }
	case LOAD_MIME:
		return { id: action.mime.id, urlId: action.mime.urlId, shapes: action.mime.shapes }
	case SAVE_MIME:
		return Object.assign({}, state, { shapes: action.mime.shapes })
	case ADD_NEW_SHAPE:
		return Object.assign({}, state, { shapes: [ ...state.shapes, action.interpretedShape ] })
	case DELETE_SHAPE:
		// filter out shapes that don't have the deleted shape id
		return Object.assign({}, state, {
			shapes: [
				...state.shapes.filter((shape) => shape.id !== action.deletedShape.id)
			]
		})
	case UPDATE_SHAPE_POSITION:
		// filter out any shapes that don't have the updated shape's id, then add the updated shape to the array
		return Object.assign({}, state, {
			shapes: [
				...state.shapes.filter((shape) => shape.id !== action.updatedShape.id),
				action.updatedShape
			]
		})
	default:
		return state
	}
}

export default reducer
