import { Object3D } from 'three'
import {exampleStorage} from '../config'
import { Template } from '../interfaces'

type LocalStore = {
	saved: Template[]
}

const namespace = 'voxelcraft__storage'
const newStore = exampleStorage

const saveToLocalStorage = (objects: Object3D[]): void => {
	const title = prompt('Enter your template name') as string
	const store = fetchAllFromLocalStorage()
	const positions = objects
		.slice(1) // removes plane
		.map(o => o.parent && o.parent.name ? o.parent : o) // detect named groups
		.map(({position: {x, y, z}, name}) => ({x, y, z, block: name}))

	const template: Template = {
		name: title,
		id: Math.floor(Math.random() * 10000000000).toString(),
		blocks: positions,
	}

	store.saved.push(template)

	window.localStorage.setItem(namespace, JSON.stringify(store))
}

const deleteFromLocalStorage = (id: string): void => {
	const store = fetchAllFromLocalStorage()

	if (store && !!store.saved) {
		let updatedSaved = store.saved.concat([])
		store.saved = updatedSaved.filter((saved: Template) => saved.id !== id)
		window.localStorage.setItem(namespace, JSON.stringify(store))
	}
}

const fetchSavedFromLocalStorage = (id: string): Template | undefined => {
	const mockId = id || 'uuid-uuid-uuid-uuid'
	const store = fetchAllFromLocalStorage()
	const found = store.saved.find((o) => o.id === mockId)
	return found || undefined
}

const fetchAllFromLocalStorage = (): LocalStore => {
	const dataString = window.localStorage.getItem(namespace)
	const parsed = dataString ? JSON.parse(dataString) : newStore
	parsed.saved = parsed.saved || [] 
	return parsed
}

const clearLocalStorage = (): void => {
	window.localStorage.setItem(namespace, '[]')
}

export default {
	clear: clearLocalStorage,
	delete: deleteFromLocalStorage,
	fetch: fetchSavedFromLocalStorage,
	fetchAll: fetchAllFromLocalStorage,
	save: saveToLocalStorage,
}
