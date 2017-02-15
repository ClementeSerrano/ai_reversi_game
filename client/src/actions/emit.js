const emit = (event, data) => {
    return {
        type: 'EMIT',
        group: 'socket',                   
        fn: (socket) => {
            socket.emit(event, data);
        }
    }
}

export default emit