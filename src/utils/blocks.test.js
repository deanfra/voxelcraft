const {clearBlocks} = require('./blocks')

let state

describe('clearBlocks', () => {
	state = {
		blocks: [{name: 'bricks'}, {name: 'bricks'}],
	}
	describe('when there are blocks in the state object', () => {
		it('mutates state to clear the blocks', () => {
			clearBlocks(state)
			expect(state.blocks).toEqual([])
		})
	})
})
