import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import 'babel-polyfill'

let store = createStore(reducer, applyMiddleware(thunk))

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('main')
);