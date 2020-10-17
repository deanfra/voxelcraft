import toCommand from './converter'

describe('toCommand', () => {
	describe('when given block coordinates', () => {
		it('converts to a minecraft command block code', () => {
			const blocks = [
				{position: {x: 25, y: 25, z: 25}, name: 'plane'},
				{position: {x: 75, y: 25, z: 25}, name: 'block'},
				{position: {x: -25, y: 25, z: 25}, name: 'block'},
			]
			expect(toCommand(blocks)[0]).toEqual(
				`summon falling_block ~ ~1 ~ {Time:1,BlockState:{Name:redstone_block},Passengers:[{id:falling_block,Passengers:[{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[{id:command_block_minecart,Command:'gamerule commandBlockOutput false'},{id:command_block_minecart,Command:'data merge block ~ ~-2 ~ {auto:0}'},{id:command_block_minecart,Command:'setblock ~2 ~1 ~1 block'},{id:command_block_minecart,Command:'setblock ~0 ~1 ~1 block'},{id:command_block_minecart,Command:'setblock ~ ~1 ~ command_block{auto:1,Command:\"fill ~ ~ ~ ~ ~-3 ~ air\"}'},{id:command_block_minecart,Command:'kill @e[type=command_block_minecart,distance=..1]'}]}]}]}`,
			)
		})
	})
})
