import React from 'react';
import {connect} from 'react-redux'

const Cell = ({index, children, board, onClick}) => {
	return board[index] == 2 ? <div className='cell possible-step' onClick={() => onClick(index)}>{children }</div> :
		<div className='cell'>{children }</div>
}

const mapStateToProps = (state) => {	
	return {
		turn: state.turn.turn,
		board: state.board
	}
}

export default connect(mapStateToProps)(Cell)