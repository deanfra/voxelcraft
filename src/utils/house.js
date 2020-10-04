import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isNonEnclosed} from './blocks.js'
import transform from './transform.js'

// TODO:
// - Doors
// - Chimneys
// - Windows
// - Stair roofs (big one)

// Random rooms
const roomCount = 3

// does this block sit at the start or the end of an array
const isFrame = (block, start, length) => block === start || block === start + length - 1

const house = (mirrorX) => {
	let blocks = []
	const rooms = arrayFrom(randomBetween(2, roomCount))
	const blockLookup = {}

	const planks = blockNames.filter((name) => name.match('planks'))
	const walls = sample([...planks, 'cobblestone', 'terracotta', 'white_terracotta'])
	const wood = sample(blockNames.filter((name) => name.match('wood')))

	rooms.forEach(() => {
		// const planksSelection = [planks]
		let roomBlocks = []

		const roomXStart = randomBetween(-3, 3)
		const roomYStart = 1
		const roomZStart = randomBetween(-3, 3)

		const roomXLength = randomBetween(3, 7)
		const roomYLength = randomBetween(4, 5)
		const roomZLength = randomBetween(3, 7)

		arrayFrom(roomXLength).forEach((ix) => {
			arrayFrom(roomYLength).forEach((iy) => {
				arrayFrom(roomZLength).forEach((iz) => {
					const x = roomXStart + ix
					const y = roomYStart + iy
					const z = roomZStart + iz

					const frameX = isFrame(x, roomXStart, roomXLength)
					const frameY = isFrame(y, roomYStart, roomYLength)
					const frameZ = isFrame(z, roomZStart, roomZLength)

					// if at least two blocks sit in a frame position
					const placeFrame = [frameX, frameY, frameZ].filter((frame) => !!frame).length > 1
					const block = placeFrame ? wood : walls
					roomBlocks.push({x, y, z, block})
				})
			})
		})

		// generate roof
		arrayFrom(roomZLength + 2).forEach((iz) => {
			arrayFrom(roomXLength + 2).forEach((ix) => {
				const roofX = roomXStart - 1 + ix
				const roofZ = roomZStart - 1 + iz
				let roofY = roomYStart + (roomYLength - 1)

				const isHalf = ix < (roomXLength + 1) / 2
				if (isHalf) {
					roofY += ix
				} else {
					roofY += (roomXLength + 2) / 2 - (ix + 1 - (roomXLength + 2) / 2)
				}
				roomBlocks.push({
					x: roofX,
					y: roofY,
					z: roofZ,
					block: 'oak_planks',
				})

				//fill the triangle below roof - above frame
				const isAboveHouseFrame =
					(roofZ === roomZStart || roofZ === roomZStart + roomZLength - 1) &&
					roofX >= roomXStart + 1 &&
					roofX <= roomXStart + roomXLength - 1
				if (isAboveHouseFrame) {
					let fillerYPosition = roofY
					// step down from roof until we hit the frame
					while (fillerYPosition > roomYStart + roomYLength || fillerYPosition > 3) {
						roomBlocks.push({
							x: roofX,
							y: fillerYPosition,
							z: roofZ,
							block: walls,
						})
						fillerYPosition = fillerYPosition - 1
					}
				}
			})
		})

		// apply room rotation
		if (sample([0, 1])) {
			const rotatedBlocks = roomBlocks.map(({x, y, z, block}) => {
				const rotated = transform.rotateY(x, z)
				return {block, y, x: rotated.x, z: rotated.z}
			})
			roomBlocks = rotatedBlocks
		}

		if (mirrorX) {
			const mirroredBlocks = roomBlocks.map(({x, y, z, block}) => {
				const xx = x - x * 2
				return {block, y, x: xx, z}
			})
			roomBlocks = roomBlocks.concat(mirroredBlocks)
		}

		blocks = blocks.concat(roomBlocks)
	})

	const uniqueBlocks = blocks.filter(({x, y, z}) => !blockExists(x, y, z, blockLookup))
	const nonEnclosedBlocks = uniqueBlocks.filter(({x, y, z}) => isNonEnclosed(x, y, z, blockLookup))

	console.log(`Generated: ${rooms.length} rooms & ${nonEnclosedBlocks.length} blocks`)

	return nonEnclosedBlocks.map(({x, y, z, block}) => ({
		block,
		y: toCoordinate(y),
		x: toCoordinate(x),
		z: toCoordinate(z),
	}))
}

export default house
