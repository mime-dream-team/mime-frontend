import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)) )
