module.exports = {
	generateStep: function (board) {					
		for (var i = 0; i < 64; i++) {
			if (board[i] == null || board[i] == undefined) {
				var step = { index: i, piece: 1 };
				if (isValidStep(step, board)) {
					return step;
				}							
			}						
		}

		function isValidStep(step, board) {			
			return turnPieces(step, board, -1, 0) ||
				turnPieces(step, board, -1, 1) ||
				turnPieces(step, board, 0, 1) ||
				turnPieces(step, board, 1, 1) ||
				turnPieces(step, board, 1, 0) ||
				turnPieces(step, board, 1, -1) ||
				turnPieces(step, board, 0, -1) ||
				turnPieces(step, board, -1, -1);			
		}

		function turnPieces(step, board, rowVariant, colVariant) {
			var startRow = parseInt(step.index / 8);
			var startCol = step.index % 8;
			var row = startRow + rowVariant;
			var col = startCol + colVariant;
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
					row -= rowVariant;
					col -= colVariant;
					count++;
				}
			}

			return count > 1;
		}
	}	
}