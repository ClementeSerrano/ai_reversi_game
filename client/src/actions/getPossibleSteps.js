const getPossibleSteps = (turn) => {	        
	return {
		type: 'GET_POSSIBLE_STEPS',
		turn
	}	
}

export default getPossibleSteps