import {exampleStorage} from '../config'

const namespace = 'voxelcraft__storage'
const newStore = exampleStorage

const saveToLocalStorage = (objects) => {
	const title = prompt('Enter your template name')
	const store = fetchAllFromLocalStorage()
	const positions = objects
		.filter((o) => o.name !== 'plane')
		.map(({position: {x, y, z}, name}) => ({x, y, z, block: name}))

	store.saved.push({
		name: title,
		id: Math.floor(Math.random() * 10000000000).toString(),
		blocks: positions,
	})

	window.localStorage.setItem(namespace, JSON.stringify(store))
}

const deleteFromLocalStorage = (id) => {
	const store = fetchAllFromLocalStorage()

	if (store && !!store.saved) {
		let updatedSaved = store.saved.concat([])
		store.saved = updatedSaved.filter((saved) => saved.id !== id)
		window.localStorage.setItem(namespace, JSON.stringify(store))
	}
}

const fetchSavedFromLocalStorage = (id) => {
	const mockId = id || 'uuid-uuid-uuid-uuid'
	const store = fetchAllFromLocalStorage()

	if (store && !!store.saved) {
		const found = store.saved.find((o) => o.id === mockId)
		return found || null
	} else {
		return null
	}
}

const fetchAllFromLocalStorage = () => {
	const dataString = window.localStorage.getItem(namespace)
	const parsed = dataString ? JSON.parse(dataString) : newStore
	return parsed
}

const clearLocalStorage = () => {
	window.localStorage.setItem(namespace, '[]')
}

export default {
	clear: clearLocalStorage,
	delete: deleteFromLocalStorage,
	fetch: fetchSavedFromLocalStorage,
	fetchAll: fetchAllFromLocalStorage,
	save: saveToLocalStorage,
}
