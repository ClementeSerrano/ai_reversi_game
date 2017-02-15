const joinGame = (room) => {
    return {
        type: 'JOIN_GAME',
        room
    }
}

export default joinGame