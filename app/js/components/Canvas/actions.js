export const updatePlayerCarAction = (data) => {
	return {
		type: 'PLAYER_CAR:UPDATE',
		payload: data
	};
}

export const changePlayerCarSpeedAction = (speedDelta) => {
	return {
		type: 'PLAYER_CAR:CHANGE_SPEED',
		payload: speedDelta
	};
}

export const speedUpPlayerCarAction = (isSpeedUp) => {
	return {
		type: 'PLAYER_CAR:SPEED_UP',
		payload: isSpeedUp
	};
}

export const speedDownPlayerCarAction = (isSpeedDown) => {
	return {
		type: 'PLAYER_CAR:SPEED_DOWN',
		payload: isSpeedDown
	};
}

export const changePlayerDistanceAction = (currentPosition) => {
	return {
		type: 'PLAYER_CAR:CHANGE_DISTANCE',
		payload: currentPosition
	};
}

export const updateFoeCarAction = (data) => {
	return {
		type: 'FOE_CAR:UPDATE',
		payload: data
	};
}

export const changeFoeCarSpeedAction = (speedDelta) => {
	return {
		type: 'FOE_CAR:CHANGE_SPEED',
		payload: speedDelta
	};
}

export const renderCanvasAction = (currentMapFrame) => {
	return {
		type: 'CANVAS:RENDER',
		payload: currentMapFrame
	};
}





export const startGameAction = () => {
	return {
		type: 'GAME:START'
	};
}

export const nextLevelAction = (data) => {
	return {
		type: 'GAME:CHANGE_LEVEL',
		payload: data
	};
}

export const gameOverAction = (data) => {
	return {
		type: 'GAME:OVER',
		payload: data
	};
}

export const increaseScoreAction = (socre) => {
	return {
		type: 'GAME:INCREASE_SCORE',
		payload: socre
	};
}

export const gamePauseAction = () => {
	return {
		type: 'GAME:PAUSE'
	};
}

export const gameResumeAction = () => {
	return {
		type: 'GAME:RESUME'
	};
}
