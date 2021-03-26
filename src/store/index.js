import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from '@/store/reducers'
import thunk from 'redux-thunk'

const empty = store => {
  return next => {
    return action => {
      return next(action)
    }
  }
}

const store = createStore(combineReducers(reducer), applyMiddleware(empty, thunk))
export default store