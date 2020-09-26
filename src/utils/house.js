import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isEnclosed} from './blocks.js'

// Random rooms
const roomCount = 5

// does this block sit at the start or the end of an array
const isFrame = (block, start, length) => block === start || block === start + length - 1

const house = (mirrorX) => {
	const rooms = arrayFrom(randomBetween(2, roomCount))
	const blocks = []
	const blockLookup = {}

	const planks = sample(blockNames.filter((name) => name.match('planks')))
	const wood = sample(blockNames.filter((name) => name.match('wood')))

	rooms.forEach(() => {
		// const planksSelection = [planks]

		const roomXStart = randomBetween(-3, 3)
		const roomYStart = randomBetween(1, 3)
		const roomZStart = randomBetween(-3, 3)

		const roomXLength = randomBetween(3, 5)
		const roomYLength = randomBetween(3, 7)
		const roomZLength = randomBetween(3, 7)

		arrayFrom(roomXLength).forEach((ix) => {
			arrayFrom(roomYLength).forEach((iy) => {
				arrayFrom(roomZLength).forEach((iz) => {
					const x = roomXStart + ix
					const xx = x - x * 2
					const y = roomYStart + iy
					const z = roomZStart + iz

					const frameX = isFrame(x, roomXStart, roomXLength)
					const frameY = isFrame(y, roomYStart, roomYLength)
					const frameZ = isFrame(z, roomZStart, roomZLength)
					// if at least two blocks sit in a frame position
					const placeFrame = [frameX, frameY, frameZ].filter((frame) => !!frame).length > 1

					const block = placeFrame ? wood : planks

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
