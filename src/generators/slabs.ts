import {PanelConfigMap, Vector, VectorLookup} from '../interfaces'
import {blockExists, toCoordinate} from '../utils/blocks'

export const sample = <T>(arr:T[]): T => arr[randomBetween(1, arr.length) - 1]
export const randomBetween = (min:number, max:number): number => Math.floor(Math.random() * (max - min + 1) + min)
export const arrayFrom = (num:number): number[] => Array.from(Array(num).keys())


const random = (config: PanelConfigMap): Vector[]  => {
	// config params
	const minSlabs = parseInt(config.minSlabs as string, 10)
	const maxSlabs = parseInt(config.maxSlabs as string, 10)
	const minSlabLength = parseInt(config.minSlabLength as string, 10)
	const maxSlabLength = parseInt(config.maxSlabLength as string, 10)

	const horizSpread = parseInt(config.horizontalSpread as string, 10)
	const vertSpread = parseInt(config.verticalSpread as string, 10)

	const main: string = config.material1 as string
	const secondary: string = config.material2 as string
	// config

	const slabs = arrayFrom(randomBetween(minSlabs, maxSlabs)) // [1,2,3..]
	const blocks:Vector[] = []
	const blockLookup:VectorLookup = {}

	slabs.forEach(() => {
		const axis: {[key: string]: boolean} = {[sample(['x', 'y', 'z'])]: true}
		const blockSelection = [main, secondary]
		const block = sample(blockSelection)

		const slabXStart = randomBetween(-horizSpread, horizSpread)
		const slabYStart = randomBetween(1, vertSpread)
		const slabZStart = randomBetween(-horizSpread, horizSpread)

		const slabXLength = axis.x ? 1 : randomBetween(minSlabLength, maxSlabLength)
		const slabYLength = axis.y ? 1 : randomBetween(minSlabLength, maxSlabLength)
		const slabZLength = axis.z ? 1 : randomBetween(minSlabLength, maxSlabLength)

		arrayFrom(slabXLength).forEach((ix) => {
			arrayFrom(slabYLength).forEach((iy) => {
				arrayFrom(slabZLength).forEach((iz) => {
					const x = slabXStart + ix
					const xx = slabXStart + ix - (slabXStart + ix) * 2
					const y = slabYStart + iy
					const z = slabZStart + iz

					if (!blockExists(x, y, z, blockLookup)) {
						blocks.push({
							x: toCoordinate(x),
							y: toCoordinate(y),
							z: toCoordinate(z),
							block,
						})
					}

					if (config.mirrorX && !blockExists(xx, y, z, blockLookup)) {
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

	console.log(`Generated: ${slabs.length} slabs & ${blocks.length} blocks`)

	return blocks
}

export default random
