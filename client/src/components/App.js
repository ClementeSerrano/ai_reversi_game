import React from 'react'
import Board from './Board'
import {connect} from 'react-redux'

const App = ({whiteCount, blackCount}) => {
	return (
		<div>
			<div className='col-md-3'>
				<h1 className='piece-count'>White: {whiteCount}</h1>
				<h1 className='piece-count'>Black: {blackCount}</h1>
			</div>
			<div className='col-md-9'>
				<Board/>
			</div>
		</div>
		)
}

const mapStateToProps = (state) => {
	let whiteCount = 0;
	let blackCount = 0;
	for (var i = 0; i < 64; i++) {
		whiteCount += state.board[i] == 0 ? 1 : 0;
		blackCount += state.board[i] == 1 ? 1 : 0;
	}

	return {
		whiteCount: whiteCount,
		blackCount: blackCount	
	}
}

export default connect(mapStateToProps)(App)