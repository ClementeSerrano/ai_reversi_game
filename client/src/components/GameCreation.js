import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

class GameCreation extends React.Component {
    constructor() {
        super()
        this.state = { isJoiningGame: false }
    }

    render() {                        
        return (
            <div className='game-creation'>
                <button className='btn' onClick={() => browserHistory.push('/playerOptions') }>Create new game</button>
                <button className='btn' onClick={() => this.setState({ isJoiningGame: true }) }>Join a game</button>
                <div className={!!this.state.isJoiningGame ? 'visible' : 'hidden'}>
                    <div className='form-group'>
                        <label className='control-label'>Game Id:</label>
                        <input id='gameId' className='form-control input-text' type='text'/>
                    </div>
                    <div className='form-group'>
                        <button className='btn' onClick={() => browserHistory.push('/two/' + $('#gameId').val())} >Join</button>
                    </div>
                </div>    
            </div>            
        )
    }    
}

export default GameCreation