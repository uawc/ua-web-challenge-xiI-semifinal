import { checkCollision } from '../../utils/collision.util';
import { moveCarAside, moveCarUp } from '../../utils/car.util';
import { getMapFrame, generateLevelMap, startGamePattern } from '../../utils/map.util';
import { saveDataToStorage,  getDataFromStorage, removeFromStorage } from '../../utils/localstorage.util';

const savedState = getDataFromStorage('canvas');

const defaultState = {
	level: 0,
	foeCar: {},
	distance: 0,
	levelMap: {},
	playerCar: {},
	finishLine: {},
	isPause: false,
	oilPuddles: {},
	playerDistance: 0,
	currentMapFrame: [],
	isGameStarted: false,
	...savedState,
	isPlayerSpeedUp: false,
	isPlayerSpeedDown: false,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'PLAYER_CAR:UPDATE': {
			let { playerCar, levelMap } = action.payload;

			return { ...state, playerCar, levelMap };
		}
		case 'PLAYER_CAR:CHANGE_SPEED': {
			let playerCar = { ...state.playerCar, speed: action.payload };

			return { ...state, playerCar }
		}
		case 'PLAYER_CAR:SPEED_UP': {
			return { ...state, isPlayerSpeedUp: action.payload }
		}
		case 'PLAYER_CAR:SPEED_DOWN': {
			return { ...state, isPlayerSpeedDown: action.payload }
		}
		case 'PLAYER_CAR:CHANGE_DISTANCE': {
			return { ...state, playerDistance: action.payload }
		}
		case 'FOE_CAR:UPDATE': {
			let { foeCar, levelMap } = action.payload;

			return { ...state, foeCar, levelMap };
		}
		case 'FOE_CAR:CHANGE_SPEED': {
			let speed = state.foeCar.speed + action.payload;
			let foeCar = { ...state.foeCar, speed: speed < 0 ? 0 : speed };

			return { ...state, foeCar }
		}
		case 'CANVAS:RENDER': {
			return { ...state, currentMapFrame: action.payload };
		}
		case 'GAME:OVER': {
			return { ...state, ...defaultState };
		}
		case 'GAME:PAUSE': {
			let newState = { ...state, isPause: true };

			saveDataToStorage('canvas', newState)

			return newState;
		}
		case 'GAME:RESUME': {
			removeFromStorage('canvas');

			return { ...state, isPause: false };
		}
		case 'GAME:CHANGE_LEVEL': {
			const { levelData, currentMapFrame } = action.payload;

			return { ...state, ...levelData, currentMapFrame, isGameStarted: true };
		}
		default:
			return state;
	}
}
