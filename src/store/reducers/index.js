import cameraReducer from './cameraReducer'
import recipeReducer from './recipeReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  camera: cameraReducer,
  recipe: recipeReducer,
  user: userReducer
})