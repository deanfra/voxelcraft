import { Object3D } from "three"
import { State } from "../interfaces"

const voxel = 50

// test for parents of groups
const getParent = (obj: Object3D) => obj.parent && obj.parent.name ? obj.parent : obj
const isntPlane = (obj: Object3D) => obj.name !== 'plane'
const invert = (val:number) => val - val * 2

const up = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.y += voxel) : null))
const down = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.y -= voxel) : null))
const left = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.x -= voxel) : null))
const right = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.x += voxel) : null))
const inward = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.z -= voxel) : null))
const outward = (state: State) =>
	state.objects.map(getParent).forEach(obj => (isntPlane(obj) ? (obj.position.z += voxel) : null))

const flipx = (state: State) => {
	state.objects
		.map(getParent)
		.forEach(obj =>
		isntPlane(obj) ? (obj.position.x = invert(obj.position.x)) : null,
	)
}
const flipy = (state: State) => {
	state.objects.map(getParent).forEach(obj =>
		isntPlane(obj) ? (obj.position.y = invert(obj.position.y)) : null,
	)
}
const flipz = (state: State) => {
	state.objects.map(getParent).forEach(obj =>
		isntPlane(obj) ? (obj.position.z = invert(obj.position.z)) : null,
	)
}

const rotateY = (x: number, z: number) => {
	return {z: x, x: invert(z)}
}

const rotateYObjects = (state: State) => {
	state.objects.map(getParent).forEach(obj => {
		const z = obj.position.z
		const x = obj.position.x
		if (isntPlane(obj)) {
			const rotation = rotateY(x, z)
			obj.position.z = rotation.z
			obj.position.x = rotation.x
		}
	})
}

export default {
	up,
	down,
	left,
	right,
	inward,
	outward,
	rotateYObjects,
	rotateY,
	flipx,
	flipy,
	flipz,
}
