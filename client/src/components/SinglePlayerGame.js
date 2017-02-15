import React from 'react'
import Board from './Board'
import {connect} from 'react-redux'
import {startNewGame, takeStep, changeTurn, getPossibleSteps, stepReceived, clearPossibleSteps, generateStep} from '../actions'


class SinglePlayerGame extends React.Component {
    constructor(props) {
        super(props);

        this.turnOfPlayer = 0;
    }

    componentDidMount() {
        this.props.onStartNewGame(this.turnOfPlayer);
    }

    render() {
        const {whiteCount, blackCount, onStartNewGame, onCellClick} = this.props;
        return (
            <div>
                <div className='col-md-3'>
                    <h1 className='piece-count'>White: {whiteCount}</h1>
                    <h1 className='piece-count'>Black: {blackCount}</h1>
                    <button className='btn' style={{ marginTop: '10px' }} onClick={() => onStartNewGame(this.turnOfPlayer)}>Start New Game</button>
                </div>
                <div className='col-md-9'>
                    <Board onCellClick={onCellClick}/>
                </div>
            </div>
        )
    }	
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
        blackCount: blackCount,
        turn: state.turn.turn        
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    
    return Object.assign({}, stateProps, ownProps, {
        onCellClick: (index) => {
            var step = { piece: stateProps.turn, index: index };
            dispatch(takeStep(step))
            dispatch(clearPossibleSteps())
            dispatch(generateStep())            
        },

        onStartNewGame: (turnOfPlayer) => {
            dispatch(startNewGame())
            if (turnOfPlayer == 0) {
                dispatch(getPossibleSteps(turnOfPlayer))
            }            
        }
    })
}

export default connect(mapStateToProps, null, mergeProps)(SinglePlayerGame)