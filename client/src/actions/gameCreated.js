const gameCreated = (room) => {
    return {
        type: 'GAME_CREATED',
        room: room
    }
}

export default gameCreated