const board = (state = initState(), action) => {
	const turnPieces = (step, board, rowVariant, colVariant, isTurning = true) => {
		let startRow = parseInt(step.index / 8);
		let startCol = step.index % 8;
		let row = startRow + rowVariant;
		let col = startCol + colVariant;
		var count = 0;
		
		while ((rowVariant == 0 || (rowVariant < 0 ? row > 0 : row < 7)) &&
			(colVariant == 0 || (colVariant < 0 ? col > 0 : col < 7)) &&
			board[row * 8 + col] == 1 - step.piece) {
			row += rowVariant;
			col += colVariant;
		}			

		if (row < 0 || row >= 8 || col < 0 || col >= 8) {
			row -= rowVariant;
			col -= colVariant;
		}

		if (board[row * 8 + col] == step.piece) {
			while (row != startRow || col != startCol) {
				if (!!isTurning) {
					board[row * 8 + col] = step.piece;
				}

				row -= rowVariant;
				col -= colVariant;
				count++;
			}						 			
		}			

		return count > 1;
	}

	function isValidStep(step, board) {
		return turnPieces(step, board, -1, 0, false) ||
			turnPieces(step, board, -1, 1, false) ||
			turnPieces(step, board, 0, 1, false) ||
			turnPieces(step, board, 1, 1, false) ||
			turnPieces(step, board, 1, 0, false) ||
			turnPieces(step, board, 1, -1, false) ||
			turnPieces(step, board, 0, -1, false) ||
			turnPieces(step, board, -1, -1, false);
	}

	switch (action.type) {		
		case 'TAKE_STEP':
			var board = state.map(function (item) {
				return item;
			});

			turnPieces(action.step, board, -1, 0);
			turnPieces(action.step, board, -1, 1);
			turnPieces(action.step, board, 0, 1);
			turnPieces(action.step, board, 1, 1);
			turnPieces(action.step, board, 1, 0);
			turnPieces(action.step, board, 1, -1);
			turnPieces(action.step, board, 0, -1);
			turnPieces(action.step, board, -1, -1);

			board[action.step.index] = action.step.piece;
			return board;
		case 'GET_POSSIBLE_STEPS':			
			var board = state.map(function (item) {
				return item == 2 ? undefined : item;
			});

			for (var i = 0; i < 64; i++) {
				if (board[i] == null || board[i] == undefined) {
					if (isValidStep({ index: i, piece: action.turn }, board)) {
						board[i] = 2;
					}					
				}
			}			

			return board;
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