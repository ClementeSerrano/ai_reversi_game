export default function socketMiddleware(socket) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return next(action);
        }

        const {group, fn} = action;
        if (group !== 'socket' || !fn) {
            return next(action);
        }
                
        fn(socket);                             
        next(action);   
    }
}