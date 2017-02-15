import {combineReducers} from 'redux'
import board from './board'
import turn from './turn'
import chat from './chat'

const reducer = combineReducers({ board, turn, chat})

export default reducer