const TIME_TICK_TRESHOLD = 300;

/**
 * Moving car to left or right
 */
export const moveCarAside = ({ levelMap, car, direction }) => {
	let levelMapCopy = levelMap.map((arr) => arr.slice());
	let coordinates = car.coordinates.map((el) => ({...el}));
	let carCopy = {...car, coordinates};
	let delta = direction === 'left' ? -3 : 3;

	carCopy.coordinates.forEach((coordinate) => levelMapCopy[coordinate.y][coordinate.x] = coordinate.prevType);

	carCopy.coordinates = carCopy.coordinates.map((coordinate) => {
		if (!levelMapCopy[coordinate.y - 1]) {
			return coordinate;
		}

		let prevType = levelMapCopy[coordinate.y][coordinate.x + delta];

		levelMapCopy[coordinate.y][coordinate.x + delta] = carCopy.type;

		return { y: coordinate.y, x: coordinate.x + delta, prevType };
	});

	return { levelMap: levelMapCopy, car: carCopy };
}

/**
 * Moving car up to one cell
 */
export const moveCarUp = ({ levelMap, car }) => {
	let levelMapCopy = levelMap.map((arr) => arr.slice());
	let coordinates = car.coordinates.map((el) => ({...el}));
	let carCopy = {...car, coordinates};

	if (carCopy.timeTick <= TIME_TICK_TRESHOLD && !car.speedUp) {
		carCopy.timeTick = carCopy.timeTick + carCopy.speed;

		return { levelMap: levelMapCopy, car: carCopy };
	}

	carCopy.timeTick = 0;

	carCopy.coordinates.forEach((coordinate) => levelMapCopy[coordinate.y][coordinate.x] = coordinate.prevType);

	carCopy.coordinates = carCopy.coordinates.map((coordinate) => {
		if (!levelMapCopy[coordinate.y - 1]) {
			return coordinate;
		}

		let prevType = levelMapCopy[coordinate.y - 1][coordinate.x];

		levelMapCopy[coordinate.y - 1][coordinate.x] = carCopy.type;

		return { y: coordinate.y - 1, x: coordinate.x, prevType };
	});

	return { levelMap: levelMapCopy, car: carCopy };
}
