const turn = (state = { turn: 0, successiveChangeCount: 0 }, action) => {
	switch (action.type) {
		case 'TAKE_STEP':			
			return {
				turn: 1 - state.turn,
				successiveChangeCount: 0
			}
		case 'CHANGE_TURN':
			return {
				turn: 1 - state.turn,
				successiveChangeCount: state.successiveChangeCount + 1	
			}			
		default:
			return state;
	}
}

export default turn