import { combineReducers } from 'redux'
import filters from './filters'
import cartItems from './cartItems'

export default combineReducers({
  filters,
  cartItems
})