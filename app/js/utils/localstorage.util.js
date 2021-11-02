/**
 * Save objects to localStorage
 */
export const saveDataToStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Getting a value from localStorage
 */
export const getNumberFromStorage = (key) => {
	return localStorage.getItem(key) || 0;
}

/**
 * Getting an object from localStorage
 */
export const getDataFromStorage = (key) => {
	let data = localStorage.getItem(key);

	try {
		data = JSON.parse(data);
	} catch(e) {
		data = {};
	}

	return data;
}

/**
 * Removing data from localStorage
 */
export const removeFromStorage = (key) => {
		localStorage.removeItem(key)
}
