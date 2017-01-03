import networkProxy from '../networkProxy'
import takeStep from './takeStep'
import changeTurn from './changeTurn'
import getPossibleSteps from './getPossibleSteps'


const requestStep = () => {	
	return (dispatch, getState) => {
		return networkProxy.requestStep({ board: getState().board }).then((result) => {
			console.log(result);
			dispatch(!!result && !!result.step ? takeStep(result.step) : changeTurn());	
			
			if (getState().turn.successiveChangeCount >= 2)
				return
			
			dispatch(getPossibleSteps(getState().turn.turn))			
					
			var possibleStepCount = 0;
			var board = getState().board;
			for (var i = 0; i < 64; i++) {
				possibleStepCount += board[i] == 2 ? 1 : 0;				
			}
			
			if (possibleStepCount == 0) {
				dispatch(changeTurn());
				dispatch(requestStep());
			}
		});
	}
}

export default requestStep