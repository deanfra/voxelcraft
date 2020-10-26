import {arrayFrom, sample, randomBetween} from './slabs'
import {blockExists, toCoordinate, isNonEnclosed} from '../utils/blocks'
import shapes from '../utils/shapes'
import { PanelConfigMap, Vector, VectorLookup } from '../interfaces'

// does this block sit at the start or the end of an array
const isFrame = (block:number, start:number, length:number) => block === start || block === start + length - 1

const castle = (config: PanelConfigMap): Vector[] => {
	// config params
	const minRooms = parseInt(config.minRooms as string, 10)
	const maxRooms = parseInt(config.maxRooms as string, 10)
	const minRoomLength = parseInt(config.minRoomLength as string, 10)
	const maxRoomLength = parseInt(config.maxRoomLength as string, 10)
	const rooms = arrayFrom(randomBetween(minRooms, maxRooms))

	const horizSpread = parseInt(config.horizontalSpread as string, 10)
	const vertSpread = parseInt(config.verticalSpread as string, 10)

	const selectedMaterial: string = config.material1 as string
	const secondSelectedMaterial: string = config.material2 as string
	// config

	const blocks:Vector[] = []
	const blockLookup:VectorLookup = {}

	rooms.forEach(() => {
		const panelXStart = randomBetween(-horizSpread, horizSpread)
		const panelYStart = randomBetween(1, vertSpread)
		const panelZStart = randomBetween(-horizSpread, horizSpread)

		const panelXLength = randomBetween(minRoomLength, maxRoomLength)
		const panelYLength = randomBetween(minRoomLength, maxRoomLength)
		const panelZLength = randomBetween(minRoomLength, maxRoomLength)

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
					const block = placeFrame ? secondSelectedMaterial : selectedMaterial

					if (!blockExists(x, y, z, blockLookup)) {
						blocks.push({x, y, z, block})
					}

					if (config.mirrorX && !blockExists(-x, y, z, blockLookup)) {
						blocks.push({x: -x, y, z, block})
					}
				}) // z

				const isBottom = panelYStart + iy === panelYStart
				const isTop = panelYStart + iy === panelYStart + panelYLength - 1

				if(config.bastions) {
					// draw a bastion at Y increment
					const circleConfig = {
						// Create a floor at the top & bottom of the bastion
						thickness: isBottom || isTop ? 'filled' : 'thin',
						width: circleDiameter,
						height: circleDiameter,
					}

					const bastionBlocks = shapes.circle(circleConfig)
					bastionBlocks.forEach(({x, z}) => {
						const block = isBottom ? secondSelectedMaterial : selectedMaterial
						const cY = panelYStart + iy
						const cX = xCenter + x
						const cZ = zCenter + z

						if (!blockExists(cX, cY, cZ, blockLookup)) {
							blocks.push({x: cX, y: cY, z: cZ, block})
						}

						if (config.mirrorX && !blockExists(-cX, cY, cZ, blockLookup)) {
							blocks.push({x: -cX, y: cY, z: cZ, block})
						}
					})

					// Draw a parapet at the top of the bastion
					if(isTop) {
						const parapetBlocks = shapes.circle({...circleConfig, thickness: 'thin'})
						parapetBlocks.forEach(({x, z}) => {
							const block = secondSelectedMaterial
							const cY = panelYStart + iy
							const cX = xCenter + x
							const cZ = zCenter + z

							if (!blockExists(cX, cY+1, cZ, blockLookup)) {
								blocks.push({x: cX, y: cY+1, z: cZ, block})
							}

							if (config.mirrorX && !blockExists(-cX, cY+1, cZ, blockLookup)) {
								blocks.push({x: -cX, y: cY+1, z: cZ, block})
							}
						})
					}
				} // bastion
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
