import reversi from '../../../reversi'
import {takeStep, changeTurn, stepReceived} from './index'

const generateStep = () => {	
    return (dispatch, getState) => {
        let step = reversi.generateStep(getState().board);
        dispatch(stepReceived(step, () => {
            dispatch(changeTurn());
            dispatch(generateStep());
        }));                
    }
}

export default generateStep