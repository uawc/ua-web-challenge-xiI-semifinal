const MAP_MIN_LENGTH = 20;

const carPatterns = [
	[
		[0,2,0],
		[2,2,2],
		[0,2,0],
		[2,0,2],
	],
	[
		[0,2,0],
		[2,2,2],
		[0,2,0],
		[2,0,2],
		[2,0,2],
	],
	[
		[0,2,0],
		[2,2,2],
		[0,2,0],
		[0,2,0],
	],
	[
		[0,2,0],
		[0,2,0],
		[2,2,2],
		[2,0,2],
		[2,2,2],
	]
];

const wallsPattern = [
	[0,0,0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1]
];

const finishPattern = [
	[0,5,0,5,0,5,0,5],
	[5,0,5,0,5,0,5,0]
];

const oilPuddlePattern = [
	[6,6,6],
	[6,6,6],
	[6,6,6]
];

export const startGamePattern = [
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,2,0,0,0,0,0,1],
	[0,0,2,2,2,0,0,0,0,0],
	[1,0,0,2,0,0,0,0,0,1],
	[1,0,2,0,2,0,0,0,0,1],
	[0,0,0,0,0,0,2,0,0,0],
	[1,0,0,0,0,2,2,2,0,1],
	[1,0,0,0,0,0,2,0,0,1],
	[0,0,0,0,0,2,0,2,0,0],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,2,2,0,0,0,2,0,0],
	[0,0,2,0,0,0,2,2,0,0],
	[0,0,2,2,0,0,0,2,0,0],
	[0,0,2,0,0,0,0,2,0,0],
	[0,0,2,0,0,0,0,2,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

const playerCarSettings = {
	type: 2,
	speed: 0,
	maxSpeed: 100,
	pattern: Math.floor(Math.random() * 100) < 10 ? carPatterns[Math.randomRange(1, 3)] : carPatterns[0]
}

const finishLineSettings = {
	type: 5,
	speed: 0,
	startX: 1,
	startY: 15,
	maxSpeed: 0,
	pattern: finishPattern
}

const foeCarSettings = {
	type: 3,
	speed: 0,
	changeLineChance: 0,
	appearChance: 10,
	pattern: carPatterns[0]
}

const oilPuddleSettings = {
	type: 6,
	speed: 0,
	pattern: oilPuddlePattern
}

const gameLevelSettings = [
	{
		distance: 400,
		oilPuddleSettings,
		playerCarSettings,
		foeCarSettings,
	},
	{
		distance: 400,
		playerCarSettings: {
			...playerCarSettings,
			maxSpeed: 150
		},
		foeCarSettings,
		oilPuddleSettings,
	},
	{
		distance: 500,
		playerCarSettings: {
			...playerCarSettings,
			maxSpeed: 200
		},
		foeCarSettings: {
			...foeCarSettings,
			speed: 20,
			changeLineChance: 5,
			appearChance: 40
		},
		oilPuddleSettings
	},
	{
		distance: 700,
		playerCarSettings: {
			...playerCarSettings,
			maxSpeed: 250
		},
		foeCarSettings: {
			...foeCarSettings,
			speed: 20,
			changeLineChance: 10,
			appearChance: 40
		},
		oilPuddleSettings
	},
	{
		distance: 700,
		playerCarSettings: {
			...playerCarSettings,
			maxSpeed: 300
		},
		foeCarSettings: {
			...foeCarSettings,
			speed: 20,
			changeLineChance: 20,
			appearChance: 90
		},
		oilPuddleSettings
	}
];

/**
 * Generating a level map
 */
export const generateLevelMap = (level) => {
	let oilPuddles = [];
	let distance = gameLevelSettings[level - 1].distance;
	let levelMap = generatePlainLevelMap(distance);
	let playerCar = addObjectToMap({ ...gameLevelSettings[level - 1].playerCarSettings, levelMap, startX: 2, startY: levelMap.length - 1 });
	let finishLine = addObjectToMap({ ...finishLineSettings, levelMap });
	let foeCar = addObjectToMap({ ...gameLevelSettings[level - 1].foeCarSettings, levelMap, startX: 5, startY: levelMap.length - 21 });

	oilPuddles.push(addObjectToMap({ ...gameLevelSettings[level - 1].oilPuddleSettings, levelMap, startX: 5, startY: levelMap.length - 122 }));
	oilPuddles.push(addObjectToMap({ ...gameLevelSettings[level - 1].oilPuddleSettings, levelMap, startX: 2, startY: levelMap.length - 322 }));

	return { levelMap, playerCar, finishLine, foeCar, level, distance, oilPuddles };
}

/**
 * Getting current frame from level map
 */
export const getMapFrame = ({ levelMap, playerCar }) => {
	let map = levelMap.slice(playerCar.coordinates[0].y + 1 - 20, playerCar.coordinates[0].y + 1);

	return map;
}

/**
 * Removing object from level map
 */
export const removeObjectFromMap = (object, levelMap) => {
	let levelMapCopy = levelMap.map((arr) => arr.slice());

	object.coordinates.forEach((coordinate) => levelMapCopy[coordinate.y][coordinate.x] = coordinate.prevType);

	return levelMapCopy;
}

/**
 * Adding a foe car to random place in level map
 */
export const addFoeCarToMap = ({ playerCar, levelMap, level }) => {
	let startX = Math.random() * 100 < 50 ? 2 : 5;
	let startY = playerCar.coordinates[0].y - 20;
	let initialSpeed = gameLevelSettings[level - 1].foeCarSettings.speed;
	let speed = Math.random() * 100 > 50 ? initialSpeed * level : initialSpeed;

	return addObjectToMap({ ...gameLevelSettings[level - 1].foeCarSettings, speed, levelMap, startY, startX });
}

/**
 * Generating a level map
 */
const generatePlainLevelMap = (distance) => {
	let map = [];

	while(map.length < distance) {
		let wallsPatternCopy = wallsPattern.map((arr) => arr.slice());

		map = [...wallsPatternCopy, ...map];
	}

	map = map.slice(map.length - distance);

	return map;
}

/**
 * Adding object to level map
 */
const addObjectToMap = ({ levelMap, pattern, startX, startY, type, speed = 0, maxSpeed = 0, changeLineChance = 0, appearChance = 0 }) => {
	let objectData = { speed, maxSpeed, type, timeTick: 0, changeLineChance, appearChance, coordinates: [] };
	let patternCopy = pattern.map((arr) => arr.slice());

	patternCopy.reverse().forEach((row, y) =>
		row.reverse().forEach((element, x) => {
			if (element) {
				let prevType = levelMap[startY - y][startX + x];

				levelMap[startY - y][startX + x] = type ? type : element;
				objectData.coordinates.push({ y: startY - y, x: startX + x, prevType });
			}
		}));

		return objectData;
}
