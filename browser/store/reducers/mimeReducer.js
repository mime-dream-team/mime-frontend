import axios from 'axios'

// Action types
const CREATE_MIME = 'CREATE_MIME'
const LOAD_MIME = 'LOAD_MIME'
const SAVE_MIME = 'SAVE_MIME'
const ADD_NEW_SHAPE = 'ADD_NEW_SHAPE'
const DELETE_SHAPE = 'DELETE_SHAPE'
const UPDATE_SHAPE = 'UPDATE_SHAPE'
const SET_STAGE = 'SET_STAGE'

// Action creators
export const createMime = (mime) => {
	return { type: CREATE_MIME, mime }
}

export const loadMime = (mime) => {
	return { type: LOAD_MIME, mime }
}

export const saveMime = (time) => {
	return { type: SAVE_MIME, time }
}

export const addNewShape = (interpretedShape) => {
	return { type: ADD_NEW_SHAPE, interpretedShape }
}

export const deleteShape = (deletedShape) => {
	return { type: DELETE_SHAPE, deletedShape }
}

export const updateShape = (updatedShape) => {
	return { type: UPDATE_SHAPE, updatedShape }
}

export const setStage = (stage) => {
	return { type: SET_STAGE, stage }
}

// Thunks
export const createMimeThunk = (mimeDimensions, history) => (dispatch) => {
	const { height, width } = mimeDimensions
	axios
		.post('/mimes', { height, width })
		.then((res) => res.data)
		.then((mime) => {
			dispatch(createMime(mime))
			history.push(`/mime/${mime.urlId}`)
		})
		.catch(console.error)
}

export const loadMimeThunk = (urlId) => (dispatch) => {
	axios
		.get(`/mimes/${urlId}`)
		.then((res) => res.data)
		.then((mime) => dispatch(loadMime(mime)))
		.catch(console.error)
}

// This thunk expects to receive the entire state from the front-end
export const saveMimeThunk = (state) => (dispatch) => {
	const { urlId, shapes } = state
	axios
		.put(`/mimes/${urlId}/shapes`, { shapes })
		.then((res) => res.data)
		.then(() => {
			let time = new Date(new Date().getTime()).toTimeString().slice(0,8)
			dispatch(saveMime(time))
		})
}

const initialState = {
	id: 0,
	urlId: '',
	shapes: [],
	height: '',
	width: '',
	lastSave: '',
	stage: {}
}

// Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
	case CREATE_MIME:
		return {
			id: action.mime.id,
			urlId: action.mime.urlId,
			shapes: [],
			height: action.mime.height,
			width: action.mime.width
		}
	case LOAD_MIME:
		return {
			id: action.mime.id,
			urlId: action.mime.urlId,
			shapes: action.mime.shapes,
			height: action.mime.height,
			width: action.mime.width,
			stage: state.stage
		}
	case SAVE_MIME:
		return Object.assign({}, state, { lastSave: action.time })
	case ADD_NEW_SHAPE:
		return Object.assign({}, state, {
			shapes: [ ...state.shapes, action.interpretedShape ]
		})
	case DELETE_SHAPE:
		// filter out shapes that don't have the deleted shape id
		return Object.assign({}, state, {
			shapes: [
				...state.shapes.filter((shape) => shape.id !== action.deletedShape.id)
			]
		})
	case UPDATE_SHAPE:
		// filter out any shapes that don't have the updated shape's id, then add the updated shape to the array
		return Object.assign({}, state, {
			shapes: [
				...state.shapes.filter(
					(shape) => shape.id !== action.updatedShape.id
				),
				action.updatedShape
			]
		})
	case SET_STAGE:
		return Object.assign({}, state, {stage: action.stage})
	default:
		return state
	}
}

export default reducer
