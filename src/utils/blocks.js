import * as THREE from '../../lib/three.module.js'
import random from './randomizer.js'
import house from './house.js'
import tower from './tower.js'

export const fillBlocks = (blocks, state) => {
	const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)

	blocks.forEach(({x, y, z, block}) => {
		// create cube
		var voxel = new THREE.Mesh(cubeGeo, state.cubeMaterials[block])
		voxel.position.set(x, y, z)
		voxel.name = block
		state.scene.add(voxel)
		state.objects.push(voxel)
	})
}

export const clearBlocks = (state) => {
	state.objects.forEach((o) => {
		if (o.name !== 'plane') state.scene.remove(o)
	})

	state.objects.splice(1, state.objects.length - 1)
}

export const randomBlocks = (state) => {
	clearBlocks(state)
	fillBlocks(random(state.mirrorX), state)
}

export const generateHouse = (state) => {
	clearBlocks(state)
	fillBlocks(house(state.mirrorX), state)
}

export const generateTower = (state) => {
	clearBlocks(state)
	fillBlocks(tower(state.mirrorX), state)
}

export const toCoordinate = (xyz) => xyz * 50 - 25
export const toBlock = (xyz) => (xyz + 25) / 50

export const blockExists = (x, y, z, lookup) => {
	const exists =
		lookup[x] !== undefined && lookup[x][y] !== undefined && lookup[x][y][z] !== undefined
	populateLookup(x, y, z, lookup)
	return exists
}
export const populateLookup = (x, y, z, lookup) => {
	lookup[x] = lookup[x] || {}
	lookup[x][y] = lookup[x][y] || {}
	lookup[x][y][z] = true
}

export const isEnclosed = (x, y, z, lookup) =>
	!(
		lookup[toBlock(x)][toBlock(y)][toBlock(z) - 1] &&
		lookup[toBlock(x)][toBlock(y)][toBlock(z) + 1] &&
		lookup[toBlock(x)][toBlock(y) - 1] &&
		lookup[toBlock(x)][toBlock(y) - 1][toBlock(z)] &&
		lookup[toBlock(x)][toBlock(y) + 1] &&
		lookup[toBlock(x)][toBlock(y) + 1][toBlock(z)] &&
		lookup[toBlock(x) + 1] &&
		lookup[toBlock(x) + 1][toBlock(y)] &&
		lookup[toBlock(x) + 1][toBlock(y)][toBlock(z)] &&
		lookup[toBlock(x) - 1] &&
		lookup[toBlock(x) - 1][toBlock(y)] &&
		lookup[toBlock(x) - 1][toBlock(y)][toBlock(z)]
	)
