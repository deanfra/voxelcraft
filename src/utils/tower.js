import {blockNames} from '../config.js'
import {arrayFrom, sample, randomBetween} from './randomizer.js'
import {blockExists, toCoordinate, isEnclosed} from './blocks.js'

// Random panels
const panelCount = 80

const tower = (mirrorX) => {
	const panels = arrayFrom(randomBetween(50, panelCount)) // [1,2,3..]
	const blocks = []
	const blockLookup = {}

	const main = sample(blockNames)
	const secondary = sample(blockNames)
	const tertiary = sample(blockNames)

	panels.forEach(() => {
		const randomMain = sample([main, secondary, tertiary])
		const randomSecondary = sample([main, secondary, tertiary])
		const randomTertiary = sample([main, secondary, tertiary])
		const blockSelection = [randomMain, randomMain, randomMain, randomSecondary, randomTertiary]

		const panelXStart = randomBetween(-5, 5)
		const panelYStart = randomBetween(1, 8)
		const panelZStart = randomBetween(-5, 5)

		const panelXLength = randomBetween(1, 10)
		const panelYLength = randomBetween(1, 10)
		const panelZLength = randomBetween(1, 10)

		arrayFrom(panelXLength).forEach((ix) => {
			arrayFrom(panelYLength).forEach((iy) => {
				arrayFrom(panelZLength).forEach((iz) => {
					const block = sample(blockSelection)
					const x = panelXStart + ix
					const xx = panelXStart + ix - (panelXStart + ix) * 2
					const y = panelYStart + iy
					const z = panelZStart + iz

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

	console.log(`Generated: ${panels.length} panels & ${nonEnclosedBlocks.length} blocks`)

	return nonEnclosedBlocks
}

export default tower
