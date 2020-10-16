import random from './randomizer'
import house from './house'
import tower from './tower'
import * as THREE from 'three'

export const fillBlocks = (blocks: any, state: any) => {
	const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)

	blocks.forEach(({x, y, z, block}: any) => {
		// create cube
		var voxel: any = new THREE.Mesh(cubeGeo, state.cubeMaterials[block])
		voxel.position.set(x, y, z)
		voxel.name = block
		state.scene.add(voxel)
		state.objects.push(voxel)
	})
}

export const clearBlocks = (state: any) => {
	state.objects.forEach((o:any) => {
		if (o.name !== 'plane') state.scene.remove(o)
	})

	state.objects.splice(1, state.objects.length - 1)
}

export const randomBlocks = (state: any) => {
	clearBlocks(state)
	fillBlocks(random(state.mirrorX), state)
}

export const generateHouse = (state: any) => {
	clearBlocks(state)
	fillBlocks(house(state.mirrorX), state)
}

export const generateTower = (state: any) => {
	clearBlocks(state)
	fillBlocks(tower(state.mirrorX), state)
}

export const toCoordinate = (xyz: any) => xyz * 50 - 25
export const toBlock = (xyz: any) => (xyz + 25) / 50

export const blockExists = (x: number, y: number, z: number, lookup: any) => {
	const exists =
		lookup[x] !== undefined && lookup[x][y] !== undefined && lookup[x][y][z] !== undefined
	populateLookup(x, y, z, lookup)
	return exists
}
export const populateLookup = (x: number, y: number, z: number, lookup: any) => {
	lookup[x] = lookup[x] || {}
	lookup[x][y] = lookup[x][y] || {}
	lookup[x][y][z] = true
}

export const isNonEnclosed = (x: number, y: number, z: number, lookup: any) =>
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
