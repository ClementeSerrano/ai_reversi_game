const register = (event, listener) => {
    return {
        type: 'REGISTER',
        group: 'socket',        
        fn: (socket) => socket.on(event, listener)
    }
}

export default register