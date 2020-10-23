import * as THREE from 'three'
import panels from '../generators/panels'
import house from '../generators/house'
import castle from '../generators/castle'
import { State, Vector, VectorLookup, Mesh, PanelConfig } from '../interfaces'

type VectorUnit = number
type BlockUnit = number

export const fillBlocks = (blocks: Vector[], state: State) => {
	const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)

	blocks.forEach(({x, y, z, block}) => {
		// create cube
		var voxel = new THREE.Mesh(cubeGeo, state.cubeMaterials[block as string])
		voxel.position.set(x, y, z)
		voxel.name = block as string
		state.scene.add(voxel)
		state.objects.push(voxel)
	})
}

export const clearBlocks = (state: State) => {
	state.objects.forEach((o:Mesh) => {
		if (o.name !== 'plane') state.scene.remove(o as THREE.Object3D)
	})

	state.objects.splice(1, state.objects.length - 1)
}

export const randomBlocks = (state: State) => {
	const generatedRandomPanels = panels(state.mirrorX)
	clearBlocks(state)
	fillBlocks(generatedRandomPanels, state)
}

export const generateHouse = (state: State) => {
	const generatedHouse = house(state.mirrorX)
	clearBlocks(state)
	fillBlocks(generatedHouse, state)
}

export const generateCastle = (state: State, config: PanelConfig[]) => {
	const generatedCastle = castle(config)
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
