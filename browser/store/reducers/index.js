import { combineReducers } from 'redux'
import mimeReducer from './mimeReducer'

// each reducer will track a single piece of the state, ie:
// state = { template: [everything managed by templateReducer] }
export default combineReducers({ mimeObjects: mimeReducer })
