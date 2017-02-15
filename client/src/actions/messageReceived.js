const messageReceived = (msg) => {
    return {
        type: 'MESSAGE_RECEIVED',
        msg: msg
    }
}

export default messageReceived