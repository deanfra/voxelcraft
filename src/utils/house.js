import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isEnclosed} from './blocks.js'

// Random rooms
const roomCount = 3

// does this block sit at the start or the end of an array
const isFrame = (block, start, length) => block === start || block === start + length - 1

const house = (mirrorX) => {
	const rooms = arrayFrom(randomBetween(2, roomCount))
	const blocks = []
	const blockLookup = {}

	const planks = blockNames.filter((name) => name.match('planks'))
	const walls = sample([...planks, 'cobblestone'])
	const wood = sample(blockNames.filter((name) => name.match('wood')))

	rooms.forEach(() => {
		// const planksSelection = [planks]

		const roomXStart = randomBetween(-3, 3)
		const roomYStart = 1
		const roomZStart = randomBetween(-3, 3)

		const roomXLength = randomBetween(3, 6)
		const roomYLength = randomBetween(4, 6)
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

					const block = placeFrame ? wood : walls

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

		arrayFrom(roomZLength + 2).forEach((iz) => {
			let halfCounter = 0
			arrayFrom(roomXLength + 2).forEach((ix) => {
				const roofX = roomXStart - 1 + ix
				const isHalf = ix < (roomXLength + 1) / 2
				const roofZ = roomZStart - 1 + iz
				let roofY = roomYStart + (roomYLength - 1)
				if (isHalf) {
					roofY += ix
				} else {
					roofY += (roomXLength + 2) / 2 - (ix + 1 - (roomXLength + 2) / 2)
				}
				if (!blockExists(roofX, roofY, roofZ, blockLookup)) {
					// generate roof
					blocks.push({
						x: toCoordinate(roofX),
						y: toCoordinate(roofY),
						z: toCoordinate(roofZ),
						block: 'oak_planks',
					})
				}
				if (isHalf) {
					halfCounter = halfCounter + 1
				}
			})
		})
	})

	const nonEnclosedBlocks = blocks.filter(({x, y, z}) => isEnclosed(x, y, z, blockLookup))

	console.log(`Generated: ${rooms.length} rooms & ${nonEnclosedBlocks.length} blocks`)

	return nonEnclosedBlocks
}

export default house
