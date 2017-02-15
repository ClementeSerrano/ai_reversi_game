import React from 'react'
import Board from './Board'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import reversi from '../../../reversi'
import {
    startNewGame,
    takeStep,
    changeTurn,
    getPossibleSteps,
    stepReceived,
    clearPossibleSteps,
    createSocketConnection,
    disconnect,
    emit,
    register,
    gameCreated,
    messageReceived,
    sendMessage,
    joinGame,
    playerJoined,
    playerLeft
} from '../actions'

class TwoPlayerGame extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);                          
        this.turnOfPlayer = !this.props.params.id ? 0 : 1;       
        this.isGameOwner = !this.props.params.id; 
    }

    componentDidMount() {
        this.props.onCreateGame().then(() => {
            if (!!this.isGameOwner) {
                this.props.onStartNewGame(this.turnOfPlayer);
            }            
        })
    }

    componentWillUnmount() {
        this.props.onLeaveGame();
    }

    render() {
        const {whiteCount, blackCount, onStartNewGame, onLeaveGame, onCellClick, msgs} = this.props;
        return (
            <div>
                <div className='col-md-2'>
                    <h1 className='piece-count'>White: {whiteCount}</h1>
                    <h1 className='piece-count'>Black: {blackCount}</h1>
                    <div className='command-buttons' style={{ marginTop: '20px' }}>
                        <button className={this.isGameOwner ? 'btn visible' : 'btn hidden'} onClick={() => onStartNewGame(this.turnOfPlayer) }>Start New Game</button>
                        <button className='btn' style={{ marginTop: '10px' }} onClick={() => {
                            onLeaveGame();
                            browserHistory.push('/');
                        } }>Leave Game</button>
                    </div>                                        
                </div>
                <div className='col-md-7'>
                    <Board onCellClick={onCellClick}/>
                </div>
                <div className='col-md-3'>
                    <div id='chat' className='chat' dangerouslySetInnerHTML={{ __html: msgs }}>
                    </div>                        
                    <div className="input-group">
                        <input id='messageTextBox' type="text" className="form-control" placeholder="Enter a message"
                            onKeyDown={(ev) => {
                                if (ev.keyCode == 13) {
                                    this.sendMessage();
                                }
                            }}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.sendMessage}>Send</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
        
    sendMessage() {
        this.props.onSendMessage($('#messageTextBox').val());        
        $('#messageTextBox').val('');        
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
        turn: state.turn.turn,                
        msgs: state.chat.msgs,
        room: state.chat.room 	
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const room = stateProps.room || ownProps.params.id;      

    return Object.assign({}, stateProps, ownProps, {        
        onCellClick: (index) => {
            let step = { piece: stateProps.turn, index: index };
            dispatch(takeStep(step))        
            dispatch(clearPossibleSteps());    
            dispatch(emit('sendStep', { step, room }));
        },

        onCreateGame: () => {
            return new Promise((resolve) => {
                dispatch(createSocketConnection((socketId) => {                                        
                    if (!room) {                                            
                        dispatch(gameCreated(socketId))
                    }
                    else {
                        dispatch(emit('joinGame', room));                        
                        dispatch(joinGame(room));
                        dispatch(startNewGame());
                    }

                    dispatch(register('playerJoined', () => {
                        dispatch(playerJoined());
                    }))

                    dispatch(register('playerLeft', () => {
                        dispatch(playerLeft());
                    }))

                    dispatch(register('messageReceived', (msg) => {
                        dispatch(messageReceived(msg));
                    }))

                    dispatch(register('stepReceived', (step) => {
                        dispatch(stepReceived(step, () => {
                            dispatch(changeTurn());
                            dispatch(emit('sendStep', { step: null, room }));
                        }))
                    }))

                    dispatch(register('newGameStarted', () => {
                        dispatch(startNewGame())
                    }))

                    resolve();
                }));
            })
        },

        onStartNewGame: (turnOfPlayer) => {
            dispatch(emit('startNewGame'));
            dispatch(startNewGame());
            if (turnOfPlayer == 0) {
                dispatch(getPossibleSteps(turnOfPlayer));
            }            
        },

        onSendMessage: (msg) => {
            dispatch(emit('sendMessage', { msg, room}))
            dispatch(sendMessage(msg));
        },

        onLeaveGame: () => {
            dispatch(disconnect());            
        }
    })
}

export default connect(mapStateToProps, null, mergeProps)(TwoPlayerGame)