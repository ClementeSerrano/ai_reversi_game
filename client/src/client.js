import React from 'react'
import {render} from 'react-dom'
import GameCreation from './components/GameCreation'
import PlayerOptions from './components/PlayerOptions'
import SinglePlayerGame from './components/SinglePlayerGame'
import TwoPlayerGame from './components/TwoPlayerGame'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import 'babel-polyfill'
import {Router, Route, browserHistory} from 'react-router'
import socketMiddleware from './middlewares/socketMiddleware'
import SocketClientProxy from './socketClientProxy'

let socket = new SocketClientProxy();
let store = createStore(reducer, applyMiddleware(socketMiddleware(socket), thunk))

render(
	<Provider store={store}>
		<Router history={browserHistory}>
            <Route path="/" component={GameCreation}/>
            <Route path="/playerOptions" component={PlayerOptions}/>
            <Route path="/single" component={SinglePlayerGame}/>            
            <Route path="/two" component={TwoPlayerGame}/>            
            <Route path="/two/:id" component={TwoPlayerGame}/>            
		</Router>		
	</Provider>,
	document.getElementById('main')
);
