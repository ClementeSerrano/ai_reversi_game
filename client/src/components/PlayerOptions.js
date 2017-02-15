import React from 'react'
import {browserHistory} from 'react-router'

const PlayerOptions = () => {
    return (         
        <div className='game-creation'>
            <button className='btn' onClick={() => { browserHistory.push('/single') } }>Single Player</button>
            <button className='btn' onClick={() => { browserHistory.push('/two') } } > Two Players</button>		
        </div>        		
		)
}

export default PlayerOptions