import reversi from '../../../reversi'

const board = (state = initState(), action) => {	
	switch (action.type) {		
		case 'TAKE_STEP':
			var board = state.map(function (item) {
				return item;
			});

			reversi.turnPieces(action.step, board, -1, 0);
			reversi.turnPieces(action.step, board, -1, 1);
			reversi.turnPieces(action.step, board, 0, 1);
			reversi.turnPieces(action.step, board, 1, 1);
			reversi.turnPieces(action.step, board, 1, 0);
			reversi.turnPieces(action.step, board, 1, -1);
			reversi.turnPieces(action.step, board, 0, -1);
			reversi.turnPieces(action.step, board, -1, -1);

			board[action.step.index] = action.step.piece;
			return board;
        case 'GET_POSSIBLE_STEPS':			            
			var board = state.map(function (item) {
				return item == 2 ? null : item;
			});

			for (var i = 0; i < 64; i++) {
				if (board[i] == null || board[i] == undefined) {
					if (reversi.isValidStep({ index: i, piece: action.turn }, board)) {
						board[i] = 2;
					}					
				}
			}			

            return board;
        case 'CLEAR_POSSIBLE_STEPS':
            return state.map(function (item) {
                return item == 2 ? null : item;
            });
        case 'START_NEW_GAME':
            return initState();                            
		default:
			return state;
	}	
}

const initState = () => {
	var state = new Array(64);
	state[27] = 0;
	state[36] = 0;
	state[28] = 1;
	state[35] = 1;
	return state;	
}

export default board