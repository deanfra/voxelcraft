import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isNonEnclosed} from './blocks.js'
import shapes from './shapes.js'

// Random rooms
const panelCount = 3

const tower = (mirrorX) => {
	const rooms = arrayFrom(randomBetween(1, panelCount)) // [1,2,3..]
	const blocks = []
	const blockLookup = {}

	const main = sample(blockNames)
	const secondary = sample(blockNames)
	const tertiary = sample(blockNames)

	rooms.forEach(() => {
		const randomSecondary = sample([main, secondary, tertiary])
		const randomTertiary = sample([main, secondary, tertiary])
		const blockSelection = [main, main, main, randomSecondary, randomTertiary]

		const panelXStart = randomBetween(-3, 3)
		const panelYStart = randomBetween(1, 4)
		const panelZStart = randomBetween(-3, 3)

		const panelXLength = randomBetween(3, 6)
		const panelYLength = randomBetween(3, 6)
		const panelZLength = randomBetween(3, 6)

		// potential spot for tower placement, either end of x and z axis
		const circleDiameter = sample([3, 4, 5, 5])
		const xCenter = sample([panelXStart, panelXStart + panelXLength])
		const zCenter = sample([panelZStart, panelZStart + panelZLength])

		arrayFrom(panelXLength).forEach((ix) => {
			arrayFrom(panelYLength).forEach((iy) => {
				arrayFrom(panelZLength).forEach((iz) => {
					const block = sample(blockSelection)
					const x = panelXStart + ix
					const y = panelYStart + iy
					const z = panelZStart + iz

					if (!blockExists(x, y, z, blockLookup)) {
						blocks.push({x, y, z, block})
					}

					if (mirrorX && !blockExists(-x, y, z, blockLookup)) {
						blocks.push({x: -x, y, z, block})
					}
				})

				const isBottom = panelYStart + iy === panelYStart
				const isTop = panelYStart + iy === panelYStart + panelYLength - 2
				// push a circle
				const circleConfig = {
					thickness: isBottom || isTop ? 'filled' : 'thin',
					width: circleDiameter,
					height: circleDiameter,
				}

				const circleBlocks = shapes.circle(circleConfig)
				circleBlocks.forEach(({x, z}) => {
					const block = sample(blockSelection)
					const cY = panelYStart + iy + 2
					const cX = xCenter + x
					const cZ = zCenter + z

					if (!blockExists(cX, cY, cZ, blockLookup)) {
						blocks.push({x: cX, y: cY, z: cZ, block})
					}

					if (mirrorX && !blockExists(-cX, cY, cZ, blockLookup)) {
						blocks.push({x: -cX, y: cY, z: cZ, block})
					}
				})
			})
		})
	})

	const nonEnclosedBlocks = blocks.filter(({x, y, z}) => isNonEnclosed(x, y, z, blockLookup))

	console.log(`Generated: ${rooms.length} rooms & ${nonEnclosedBlocks.length} blocks`)

	return nonEnclosedBlocks.map(({x, y, z, block}) => ({
		block,
		y: toCoordinate(y),
		x: toCoordinate(x),
		z: toCoordinate(z),
	}))
}

export default tower
