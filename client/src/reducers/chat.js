const chat = (state = { msgs: '', room: null}, action) => {
    switch (action.type) {
        case 'GAME_CREATED':
            return {
                msgs: String.raw`<p>You have created a two-player game. Invite your 
                            friend by giving them the following game id: <br/>${action.room}</p>`,
                room: action.room
            }                
        case 'JOIN_GAME':
            return {
                msgs: '',
                room: action.room
            }    
        case 'START_NEW_GAME':
            return {
                msgs: String.raw`${state.msgs}<p>A new game has been started</p>`,
                room: state.room
            }
        case 'PLAYER_JOINED':
            return {
                msgs: String.raw`${state.msgs}<p>Your opponent has joined the game</p>`,
                room: state.room
            }
        case 'PLAYER_LEFT':
            return {
                msgs: String.raw`${state.msgs}<p>Your opponent has left the game</p>`,
                room: state.room
            }
        case 'MESSAGE_RECEIVED':
            return {
                msgs: String.raw`${state.msgs}<p>Your opponent: ${action.msg}</p>`,
                room: state.room
            }
        case 'SEND_MESSAGE':
            return {
                msgs: String.raw`${state.msgs}<p>You: ${action.msg}</p>`,
                room: state.room
            }
        default:
            return state;
    }
}

export default chat