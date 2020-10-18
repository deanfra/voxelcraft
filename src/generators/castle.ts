import {blockNames} from '../config'
import {arrayFrom, sample, randomBetween} from './panels'
import {blockExists, toCoordinate, isNonEnclosed} from '../utils/blocks'
import shapes from '../utils/shapes'
import { Vector, VectorLookup } from '../interfaces'

// Random rooms
const panelCount = 5

// does this block sit at the start or the end of an array
const isFrame = (block:number, start:number, length:number) => block === start || block === start + length - 1

const castle = (mirrorX:boolean): Vector[] => {
	const rooms = arrayFrom(randomBetween(1, panelCount))
	const blocks:Vector[] = []
	const blockLookup:VectorLookup = {}

	const doc = document as any
	const selectedMaterial: string = doc.querySelector('#GUISelectedBlock').value
	const main = selectedMaterial
	const secondary = sample(blockNames)
	const tertiary = sample(blockNames)

	rooms.forEach(() => {
		const panelXStart = randomBetween(-4, 3)
		const panelYStart = randomBetween(1, 4)
		const panelZStart = randomBetween(-4, 3)

		const panelXLength = randomBetween(3, 7)
		const panelYLength = randomBetween(3, 7)
		const panelZLength = randomBetween(3, 7)

		// potential spot for bastion placement, either end of x and z axis
		const circleDiameter = sample([3, 4, 5, 5])
		const xCenter = sample([panelXStart, panelXStart + panelXLength])
		const zCenter = sample([panelZStart, panelZStart + panelZLength])

		arrayFrom(panelXLength).forEach((ix) => {
			arrayFrom(panelYLength).forEach((iy) => {
				arrayFrom(panelZLength).forEach((iz) => {
					const x = panelXStart + ix
					const y = panelYStart + iy
					const z = panelZStart + iz

					const frameX = isFrame(x, panelXStart, panelXLength)
					const frameY = isFrame(y, panelYStart, panelYLength)
					const frameZ = isFrame(z, panelZStart, panelZLength)

					// if at least two blocks sit in a frame position
					const placeFrame = [frameX, frameY, frameZ].filter((frame) => !!frame).length > 1
					const block = placeFrame ? secondary : sample([main, main, main, main, tertiary])

					if (!blockExists(x, y, z, blockLookup)) {
						blocks.push({x, y, z, block})
					}

					if (mirrorX && !blockExists(-x, y, z, blockLookup)) {
						blocks.push({x: -x, y, z, block})
					}
				}) // z

				const isBottom = panelYStart + iy === panelYStart
				const isTop = panelYStart + iy === panelYStart + panelYLength - 1

				// draw a bastion at Y increment
				const circleConfig = {
					// Create a floor at the top & bottom of the bastion
					thickness: isBottom || isTop ? 'filled' : 'thin',
					width: circleDiameter,
					height: circleDiameter,
				}

				const bastionBlocks = shapes.circle(circleConfig)
				bastionBlocks.forEach(({x, z}) => {
					const block = isBottom ? secondary : main
					const cY = panelYStart + iy
					const cX = xCenter + x
					const cZ = zCenter + z

					if (!blockExists(cX, cY, cZ, blockLookup)) {
						blocks.push({x: cX, y: cY, z: cZ, block})
					}

					if (mirrorX && !blockExists(-cX, cY, cZ, blockLookup)) {
						blocks.push({x: -cX, y: cY, z: cZ, block})
					}
				})

				// Draw a parapet at the top of the bastion
				if(isTop) {
					const parapetBlocks = shapes.circle({...circleConfig, thickness: 'thin'})
					parapetBlocks.forEach(({x, z}) => {
						const block = secondary
						const cY = panelYStart + iy
						const cX = xCenter + x
						const cZ = zCenter + z

						if (!blockExists(cX, cY+1, cZ, blockLookup)) {
							blocks.push({x: cX, y: cY+1, z: cZ, block})
						}

						if (mirrorX && !blockExists(-cX, cY+1, cZ, blockLookup)) {
							blocks.push({x: -cX, y: cY+1, z: cZ, block})
						}
					})
				}
			}) // y
		}) // x
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

export default castle