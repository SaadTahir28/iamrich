class LocalStorage {
	static get(key) {
		return localStorage.getItem(key);
	}

	static set(key, item) {
		localStorage.setItem(key, JSON.stringify(item));
	}

	static remove(key) {
		localStorage.removeItem(key);
	}
}

export default LocalStorage;
