const connect = (onConnected) => {    
    return {
        type: 'CONNECT',
        group: 'socket',        
        fn: (socket) => {
            socket.connect().then((id) => {
                if (!!onConnected) {
                    onConnected(id);
                }                
            });
        }
    }    
}

export default connect