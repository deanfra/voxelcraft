import * as THREE from 'three'
import slabs from '../generators/slabs'
import house from '../generators/house'
import castle from '../generators/castle'
import { State, Vector, VectorLookup, PanelConfig } from '../interfaces'
import { arrayToObject } from './array'
import addVoxel from '../factories/voxel'
import addStair from '../factories/stair'
import { Object3D } from 'three'

type VectorUnit = number
type BlockUnit = number

export const fillBlocks = (blocks: Vector[], state: State) => {
	blocks.forEach(({x, y, z, block=""}) => {
		const position = {x, y, z} as THREE.Vector3
		const material = block.split('[')[0]

		if(material === 'oak_stairs') {
			addStair(state, position, block)
		} else {
			addVoxel(state, position, state.cubeMaterials[material], block)
		}
	})
}

export const clearBlocks = (state: State) => {
	const blocks = state.objects
		.slice(1) // removes plane
		.map(o => !!o.name ? o : o.parent as Object3D)

	blocks.forEach(o => {
		state.scene.remove(o)
	})

	state.objects.splice(1, state.objects.length - 1)
}

// Refactor these three
export const generateSlabs = (state: State, config: PanelConfig[]) => {
	const mappedConfig = arrayToObject(config)
	const generatedRandomSlabs = slabs(mappedConfig)
	clearBlocks(state)
	fillBlocks(generatedRandomSlabs, state)
}

export const generateHouse = (state: State, config: PanelConfig[]) => {
	const mappedConfig = arrayToObject(config)
	const generatedHouse = house(mappedConfig)
	clearBlocks(state)
	fillBlocks(generatedHouse, state)
}

export const generateCastle = (state: State, config: PanelConfig[]) => {
	const mappedConfig = arrayToObject(config)
	const generatedCastle = castle(mappedConfig)
	clearBlocks(state)
	fillBlocks(generatedCastle, state)
}

export const toCoordinate = (xyz: number): VectorUnit => xyz * 50 - 25
export const toBlock = (xyz: number): BlockUnit => (xyz + 25) / 50

export const blockExists = (x: number, y: number, z: number, lookup: VectorLookup) => {
	const exists =
		lookup[x] !== undefined && lookup[x][y] !== undefined && lookup[x][y][z] !== undefined
	populateLookup(x, y, z, lookup)
	return exists
}
export const populateLookup = (x: number, y: number, z: number, lookup: VectorLookup) => {
	lookup[x] = lookup[x] || {}
	lookup[x][y] = lookup[x][y] || {}
	lookup[x][y][z] = true
}

export const isNonEnclosed = (x: number, y: number, z: number, lookup: VectorLookup) =>
	!(
		lookup[x][y][z - 1] &&
		lookup[x][y][z + 1] &&
		lookup[x][y - 1] &&
		lookup[x][y - 1][z] &&
		lookup[x][y + 1] &&
		lookup[x][y + 1][z] &&
		lookup[x + 1] &&
		lookup[x + 1][y] &&
		lookup[x + 1][y][z] &&
		lookup[x - 1] &&
		lookup[x - 1][y] &&
		lookup[x - 1][y][z]
	)
