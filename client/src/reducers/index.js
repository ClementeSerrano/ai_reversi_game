import {combineReducers} from 'redux'
import board from './board'
import turn from './turn'

const reducer = combineReducers({ board, turn})

export default reducer