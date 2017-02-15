import React from 'react'
import {connect} from 'react-redux'
import Cell from './Cell'

class Board extends React.Component {       
	render() {
		console.log('render board');
		var cells = [];
        for (var i = 0; i < 64; i++) {
            cells.push(<Cell key={i} index={i} onClick={this.props.onCellClick}>{this.props.board[i] == 0 ? <div className='piece white-piece'></div> :
				this.props.board[i] == 1 ? <div className='piece black-piece'></div> : ''}</Cell>)
		}
	
		return (
			<div className='board'>
				{
					cells.map(function (cell, index) {
						return cell;
					})
				}
			</div>
		)	
	}	
}

const mapStateToProps = (state) => {
	return {
		board: state.board,
		turn: state.turn.turn
	}
}

export default connect(mapStateToProps)(Board)