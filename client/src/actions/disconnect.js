const disconnect = () => {
    return {
        type: 'DISCONNECT',
        group: 'socket',
        fn: (socket) => socket.disconnect()            
    }
}

export default disconnect