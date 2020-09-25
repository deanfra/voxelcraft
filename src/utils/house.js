import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isEnclosed} from './blocks.js'

// Random rooms
const roomCount = 10

const house = (mirrorX) => {
	const rooms = arrayFrom(randomBetween(2, roomCount)) // [1,2,3..]
	const blocks = []
	const blockLookup = {}

	const main = sample(blockNames)
	const secondary = sample(blockNames)
	const tertiary = sample(blockNames)

	rooms.forEach(() => {
		const randomMain = sample([main, secondary, tertiary])
		const randomSecondary = sample([main, secondary, tertiary])
		const randomTertiary = sample([main, secondary, tertiary])
		const blockSelection = [randomMain, randomMain, randomMain, randomSecondary, randomTertiary]

		const roomXStart = randomBetween(-3, 3)
		const roomYStart = 1
		const roomZStart = randomBetween(-3, 3)

		const roomXLength = randomBetween(3, 5)
		const roomYLength = randomBetween(3, 5)
		const roomZLength = randomBetween(3, 5)

		arrayFrom(roomXLength).forEach((ix) => {
			arrayFrom(roomYLength).forEach((iy) => {
				arrayFrom(roomZLength).forEach((iz) => {
					const block = sample(blockSelection)
					const x = roomXStart + ix
					const xx = roomXStart + ix - (roomXStart + ix) * 2
					const y = roomYStart + iy
					const z = roomZStart + iz

					if (!blockExists(x, y, z, blockLookup)) {
						blocks.push({
							x: toCoordinate(x),
							y: toCoordinate(y),
							z: toCoordinate(z),
							block,
						})
					}

					if (mirrorX && !blockExists(xx, y, z, blockLookup)) {
						blocks.push({
							x: toCoordinate(xx),
							y: toCoordinate(y),
							z: toCoordinate(z),
							block,
						})
					}
				})
			})
		})
	})

	const nonEnclosedBlocks = blocks.filter(({x, y, z}) => isEnclosed(x, y, z, blockLookup))

	console.log(`Generated: ${rooms.length} rooms & ${nonEnclosedBlocks.length} blocks`)

	return nonEnclosedBlocks
}

export default house
