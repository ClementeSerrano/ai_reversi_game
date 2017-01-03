import React from 'react';
import {connect} from 'react-redux'
import takeStep from '../actions/takeStep'
import requestStep from '../actions/requestStep'
import changeTurn from '../actions/changeTurn'
import getPossibleSteps from '../actions/getPossibleSteps'

const Cell = ({index, children, board, onClick}) => {
	return board[index] == 2 ? <div className='cell possible-step' onClick={onClick}>{children }</div> :
		<div className='cell'>{children }</div>
}

const mapStateToProps = (state) => {	
	return {
		turn: state.turn.turn,
		board: state.board
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {		
	const { dispatch } = dispatchProps;
		
	return Object.assign({}, stateProps, ownProps, {
		onClick: () => {
			dispatch(takeStep({ piece: stateProps.turn, index: ownProps.index }))
			dispatch(requestStep());
		}
	})	
}

export default connect(mapStateToProps, null, mergeProps)(Cell)