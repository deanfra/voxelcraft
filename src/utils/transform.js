const voxel = 50

const isntPlane = (obj) => obj.name !== 'plane'
const invert = (val) => val - val * 2

const up = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.y += voxel) : null))
const down = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.y -= voxel) : null))
const left = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.x -= voxel) : null))
const right = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.x += voxel) : null))
const inward = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.z -= voxel) : null))
const outward = (state) =>
	state.objects.forEach((obj) => (isntPlane(obj) ? (obj.position.z += voxel) : null))

const flipx = (state) => {
	state.objects.forEach((obj) =>
		isntPlane(obj) ? (obj.position.x = invert(obj.position.x)) : null,
	)
}
const flipy = (state) => {
	state.objects.forEach((obj) =>
		isntPlane(obj) ? (obj.position.y = invert(obj.position.y)) : null,
	)
}
const flipz = (state) => {
	state.objects.forEach((obj) =>
		isntPlane(obj) ? (obj.position.z = invert(obj.position.z)) : null,
	)
}

export default {
	up,
	down,
	left,
	right,
	inward,
	outward,
	flipx,
	flipy,
	flipz,
}
