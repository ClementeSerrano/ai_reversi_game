function reversi() {
    this.generateStep = (board) => {
        for (var i = 0; i < 64; i++) {
            if (board[i] == null || board[i] == undefined) {
                var step = { index: i, piece: 1 };
                if (this.isValidStep(step, board)) {
                    return step;
                }
            }
        }
    },

    this.isValidStep = (step, board) => {
        return this.turnPieces(step, board, -1, 0, false) ||
            this.turnPieces(step, board, -1, 1, false) ||
            this.turnPieces(step, board, 0, 1, false) ||
            this.turnPieces(step, board, 1, 1, false) ||
            this.turnPieces(step, board, 1, 0, false) ||
            this.turnPieces(step, board, 1, -1, false) ||
            this.turnPieces(step, board, 0, -1, false) ||
            this.turnPieces(step, board, -1, -1, false);
    },


    this.turnPieces = (step, board, rowVariant, colVariant, isTurning = true) => {
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
                if (!!isTurning) {
                    board[row * 8 + col] = step.piece;
                }

                row -= rowVariant;
                col -= colVariant;
                count++;
            }
        }

        return count > 1;
    },

    this.getPossibleStepCount = (board) => {
        var possibleStepCount = 0;
        for (var i = 0; i < 64; i++) {
            possibleStepCount += board[i] == 2 ? 1 : 0;
        }

        return possibleStepCount;
    }    
}

export default new reversi