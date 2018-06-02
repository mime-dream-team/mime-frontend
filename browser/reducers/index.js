import { combineReducers } from 'redux'
import templateReducer from './templateReducer'

// each reducer will track a single piece of the state, ie:
// state = { template: [everything managed by templateReducer] }
export default combineReducers({ template: templateReducer })
