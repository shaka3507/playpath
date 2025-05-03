// helper functions for interacting with local storage
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
export const getLocalStorageItem = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageItem = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data))
}

export const deleteLocalStorageItem = (key) => {
	localStorage.removeItem(key)
}