jest.mock("three")

import { State } from "../interfaces"

const {
	clearBlocks,
	toCoordinate,
	toBlock,
	blockExists,
	populateLookup,
	isNonEnclosed,
} = require('./blocks')

let removeMock: any = jest.fn()

describe('clearBlocks', () => {
	describe('block is in the state object', () => { 
		let mockObject = {name: 'bricks'} as any
		let state = {
			objects: [{name: 'plane'}, mockObject],
			scene: {remove: removeMock} as any,
		} as State

		it('removes it from the scene', () => {
			clearBlocks(state)
			expect(removeMock).toHaveBeenCalledWith(mockObject)
		})
	})
})

describe('toCoordinate', () => {
	it('converts block units to coordinate units', () => {
		expect(toCoordinate(1)).toEqual(25)
	})
})

describe('toBlock', () => {
	it('converts coordinate units to block units', () => {
		expect(toBlock(25)).toEqual(1)
	})
})

describe('populateLookup', () => {
	it('mutates a given object to store coordinates', () => {
		let lookup = {}
		const populatedLookup = {1: {1: {1: true}}}
		populateLookup(1, 1, 1, lookup)
		expect(lookup).toEqual(populatedLookup)
	})
})

describe('blockExists', () => {
	let lookup = {}
	const populatedLookup = {1: {1: {1: true}}}
	describe('block does NOT exist in the lookup object', () => {
		it('returns false', () => {
			expect(blockExists(1, 1, 1, lookup)).toEqual(false)
		})

		it('populates lookup', () => {
			blockExists(1, 1, 1, lookup)
			expect(lookup).toEqual(populatedLookup)
		})
	})
	describe('block DOES exist in the lookup object', () => {
		it('returns true', () => {
			expect(blockExists(1, 1, 1, populatedLookup)).toEqual(true)
		})
		it('does NOT change the lookup object', () => {
			blockExists(1, 1, 1, populatedLookup)
			expect({...populatedLookup}).toEqual(populatedLookup)
		})
	})
})

describe('isNonEnclosed', () => {
	describe('potential block position is surrounded', () => {
		// has coordinates on all sides
		let lookup = {
			2: {3: {2: true}, 1: {2: true}, 2: {3: true, 1: true}},
			3: {2: {2: true}},
			1: {2: {2: true}},
		}
		it('returns false', () => {
			expect(isNonEnclosed(2, 2, 2, lookup)).toEqual(false)
		})
	})
	describe('potential block position is NOT surrounded', () => {
		let lookup = {
			2: {3: {2: true}, 1: {2: true}, 2: {3: true, 1: true}},
			3: {2: {2: true}},
			// missing a coordinate at x-1
		}
		it('returns true', () => {
			expect(isNonEnclosed(2, 2, 2, lookup)).toEqual(true)
		})
	})
})
