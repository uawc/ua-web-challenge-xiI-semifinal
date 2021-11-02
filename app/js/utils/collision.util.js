const LEFT_WALL_POINT = 0;
const RIGHT_WALL_POINT = 9;

/**
 * Checking collision with walls
 */
export const checkWallCollision = (object) => {
	let xCoordinates = object.coordinates.map((element) => element.x);

	return xCoordinates.includes(LEFT_WALL_POINT) || xCoordinates.includes(RIGHT_WALL_POINT);
};

/**
 * Checking collision with objects
 */
export const checkCollision = (object, allObjects) => {
	let yCoordinates = object.coordinates.map((element) => element.y);
	let xCoordinates = object.coordinates.map((element) => element.x);
	let result = false;

	allObjects.forEach((element) => {
		element.coordinates.forEach((coordinate) => {
			if (yCoordinates.includes(coordinate.y) && xCoordinates.includes(coordinate.x)) {
				result = true;
			}
		});
	});

	return result;
}
