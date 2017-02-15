class SocketClientProxy {        
    constructor() {                      
        this._socket = null;

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.emit = this.emit.bind(this);
        this.on = this.on.bind(this);
    }    

    connect() {
        this._socket = io();
        return new Promise((resolve) => {            
            this._socket.on('connect', () => resolve(this._socket.id));                            
        })       
    }

    disconnect() {
        this._socket.disconnect();                
    }

    emit(event, data) {                
        this._socket.emit(event, data);                
    }    

    on(event, listener) {
        this._socket.on(event, listener);
    }
}

export default SocketClientProxy