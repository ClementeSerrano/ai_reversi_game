import reversi from '../../../reversi'
import {takeStep, changeTurn, getPossibleSteps} from './index'

const stepReceived = (step, noNextStepFound) => {	
    return (dispatch, getState) => {        
        dispatch(!!step ? takeStep(step) : changeTurn());

        if (getState().turn.successiveChangeCount >= 2)
            return

        dispatch(getPossibleSteps(getState().turn.turn));

        var possibleStepCount = reversi.getPossibleStepCount(getState().board);
        if (possibleStepCount == 0 && !!noNextStepFound) {
            noNextStepFound();            
        }                
    }
}

export default stepReceived