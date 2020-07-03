import reducer from './../reducers/index'
import { createStore } from 'redux'

const store = createStore(reducer);
export default store;