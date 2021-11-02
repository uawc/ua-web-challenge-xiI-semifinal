import { saveDataToStorage, getDataFromStorage, getNumberFromStorage, removeFromStorage } from '../../utils/localstorage.util';

const hiScore = getNumberFromStorage('score');
const savedState = getDataFromStorage('gameinfo');

const defaultState = {
	hiScore,
	speed: 0,
	level: 0,
	lapScore: 0,
	raceScore: 0,
	isPause: false,
	isGameOver: true,
	currentDistance: 0,
	totalDistance: 100,
	...savedState
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'GAME:OVER': {
			let hiScore = state.hiScore;
			let totalScore = state.raceScore + state.lapScore;

			if (totalScore > hiScore) {
				localStorage.setItem('score', totalScore);
				hiScore = totalScore;
			}

			return { ...state, ...defaultState, hiScore };
		}
		case 'GAME:CHANGE_LEVEL': {
			const { levelData } = action.payload;
			const { level, distance, score } = levelData;
			const raceScore = state.raceScore + state.lapScore;

			return { ...state, level, raceScore, totalDistance: distance, isGameOver: false };
		}
		case 'GAME:INCREASE_SCORE': {
			const lapScore = state.lapScore + action.payload;

			return { ...state, lapScore };
		}
		case 'PLAYER_CAR:CHANGE_SPEED': {
			return { ...state, speed: action.payload };
		}
		case 'PLAYER_CAR:CHANGE_DISTANCE': {
			return { ...state, currentDistance: action.payload }
		}
		case 'GAME:PAUSE': {
			let newStore = { ...state, isPause: true };

			saveDataToStorage('gameinfo', newStore);

			return newStore;
		}
		case 'GAME:RESUME': {
			removeFromStorage('gameinfo');

			return { ...state, isPause: false };
		}
		default:
			return state;
	}
}
