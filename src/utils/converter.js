import {toBlock} from './blocks.js'

let offsetX = 0
let offsetY = -1
let wrappingCharacters = 540 // the summon code around the blocks
let commandLimit = 32500 - wrappingCharacters // the max characters per-iteration

const toCommand = (objects) => {
	const coordinates = objects
		.filter((o) => o.name !== 'plane')
		.map((o) => ({...o.position, block: o.name}))

	const blocks = coordinates.map(({x, y, z, block}) => ({
		x: toBlock(x),
		y: toBlock(y),
		z: toBlock(z),
		block,
	}))

	// get the highest X value
	offsetX =
		coordinates
			.map((b) => b.x)
			.reduce((a, c) => (toBlock(c) > toBlock(a) ? toBlock(c) : toBlock(a)), 0) + 1

	const blockSets = getBlockStrings(blocks)
	const output = blockSets.map((strings) => getCommand(strings))

	return output
}

const getBlockStrings = (blocks) => {
	let blockSet = []
	let blockSets = []

	blocks.forEach(({x, y, z, block}) => {
		const string = `{id:command_block_minecart,Command:'setblock ~${x + offsetX} ~${
			y + offsetY
		} ~${z} ${block}'}`

		if (blockSet.join(',').length + string.length > commandLimit) {
			// if this new command exceeds the command limit, make a new command
			blockSets.push(blockSet)
			blockSet = [string]
		} else {
			// else push to the existing command
			blockSet.push(string)
		}
	})

	// push the last set (because it wouldn't have crossed the limit in the above if statement)
	blockSets.push(blockSet)

	return blockSets
}

const getCommand = (strings) =>
	'summon falling_block ~ ~1 ~ {Time:1,BlockState:{Name:redstone_block},Passengers:[' +
	'{id:falling_block,Passengers:[' +
	'{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[' +
	"{id:command_block_minecart,Command:'gamerule commandBlockOutput false'}," +
	"{id:command_block_minecart,Command:'data merge block ~ ~-2 ~ {auto:0}'}," +
	strings.join(',') +
	',' +
	'{id:command_block_minecart,Command:\'setblock ~ ~1 ~ command_block{auto:1,Command:"fill ~ ~ ~ ~ ~-3 ~ air"}\'},' +
	"{id:command_block_minecart,Command:'kill @e[type=command_block_minecart,distance=..1]'}]}]}]}"

export default toCommand
