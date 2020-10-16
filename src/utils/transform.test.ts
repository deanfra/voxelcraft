const transform = require('./transform').default

const mockState = () => ({
	objects: [
		{
			position: {x: 25, y: 25, z: 25},
		},
	],
})

describe('up', () => {
	it('mutates state and increments y axis', () => {
		const state = mockState()
		transform.up(state)
		expect(state.objects[0].position).toEqual({x: 25, y: 75, z: 25})
	})
})
describe('down', () => {
	it('mutates state and decrements y axis', () => {
		const state = mockState()
		transform.down(state)
		expect(state.objects[0].position).toEqual({x: 25, y: -25, z: 25})
	})
})
describe('right', () => {
	it('mutates state and increments x axis', () => {
		const state = mockState()
		transform.right(state)
		expect(state.objects[0].position).toEqual({x: 75, y: 25, z: 25})
	})
})
describe('left', () => {
	it('mutates state and decrements x axis', () => {
		const state = mockState()
		transform.left(state)
		expect(state.objects[0].position).toEqual({x: -25, y: 25, z: 25})
	})
})
describe('outward', () => {
	it('mutates state and increments z axis', () => {
		const state = mockState()
		transform.outward(state)
		expect(state.objects[0].position).toEqual({x: 25, y: 25, z: 75})
	})
})
describe('inward', () => {
	it('mutates state and decrements z axis', () => {
		const state = mockState()
		transform.inward(state)
		expect(state.objects[0].position).toEqual({x: 25, y: 25, z: -25})
	})
})

describe('flipx', () => {
	it('mutates state and flips x axis', () => {
		const state = mockState()
		transform.flipx(state)
		expect(state.objects[0].position).toEqual({x: -25, y: 25, z: 25})
	})
})
describe('flipy', () => {
	it('mutates state and flips y axis', () => {
		const state = mockState()
		transform.flipy(state)
		expect(state.objects[0].position).toEqual({x: 25, y: -25, z: 25})
	})
})
describe('flipz', () => {
	it('mutates state and flips z axis', () => {
		const state = mockState()
		transform.flipz(state)
		expect(state.objects[0].position).toEqual({x: 25, y: 25, z: -25})
	})
})

describe('rotateYObjects', () => {})

describe('rotateYObjects', () => {
	it('mutates state and rotates Y axis', () => {
		const state = mockState()
		state.objects[0].position = {x: -25, y: 25, z: 75}
		transform.rotateYObjects(state)
		expect(state.objects[0].position).toEqual({x: -75, y: 25, z: -25})
	})
})
