import {blockNames} from '../config'
import {blockExists, toCoordinate} from './blocks'

export const sample = (arr:any) => arr[randomBetween(1, arr.length) - 1]
export const randomBetween = (min:any, max:any) => Math.floor(Math.random() * (max - min + 1) + min)
export const arrayFrom = (num:any) => Array.from(Array(num).keys())

// Random panels
const panelCount = 33

const random = (mirrorX:any) => {
	const panels = arrayFrom(randomBetween(13, panelCount)) // [1,2,3..]
	const blocks:any = []
	const blockLookup:any = {}

	const main = sample(blockNames)
	const secondary = sample(blockNames)
	const tertiary = sample(blockNames)

	panels.forEach(() => {
		const axis: any = {[sample(['x', 'y', 'z'])]: true}
		const randomMain = sample([main, secondary, tertiary])
		const randomSecondary = sample([main, secondary, tertiary])
		const randomTertiary = sample([main, secondary, tertiary])
		const blockSelection = [randomMain, randomMain, randomMain, randomSecondary, randomTertiary]

		const panelXStart = randomBetween(-3, 3)
		const panelYStart = randomBetween(1, 3)
		const panelZStart = randomBetween(-3, 3)

		const panelXLength = axis.x ? 1 : randomBetween(1, 5)
		const panelYLength = axis.y ? 1 : randomBetween(1, 5)
		const panelZLength = axis.z ? 1 : randomBetween(1, 5)

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

	console.log(`Generated: ${panels.length} panels & ${blocks.length} blocks`)

	return blocks
}

export default random
