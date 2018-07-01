import { combineReducers } from 'redux'
import shapeReducer from './shapeReducer'

// each reducer will track a single piece of the state, ie:
// state = { template: [everything managed by templateReducer] }
export default combineReducers({ shapes: shapeReducer })
