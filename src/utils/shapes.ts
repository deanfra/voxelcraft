// Sourced from @donatj from https://github.com/donatj/Circle-Generator

type Block = {x: number, z: number}
type Config = {
	thickness: string
	width: number
	height: number
}

const isEven = (num:number) => num % 2 === 0

let distance = function (x:number, z:number, ratio:number) {
	return Math.sqrt(Math.pow(z * ratio, 2) + Math.pow(x, 2))
}
let filled = function (x:number, z:number, radius:number, ratio:number) {
	return distance(x, z, ratio) <= radius
}
let fatfilled = function (x:number, z:number, radius:number, ratio:number): boolean {
	return (
		filled(x, z, radius, ratio) &&
		!(
			filled(x + 1, z, radius, ratio) &&
			filled(x - 1, z, radius, ratio) &&
			filled(x, z + 1, radius, ratio) &&
			filled(x, z - 1, radius, ratio) &&
			filled(x + 1, z + 1, radius, ratio) &&
			filled(x + 1, z - 1, radius, ratio) &&
			filled(x - 1, z - 1, radius, ratio) &&
			filled(x - 1, z + 1, radius, ratio)
		)
	)
}

const circle = (config: Config): Block[] => {
	let blocks: Block[] = []

	let maxblocks_x: number
	let maxblocks_y: number
	let thick_t: string = config.thickness || 'thin'
	let width_r: number = (config.width || 9) / 2
	let height_r: number = (config.height || 9) / 2
	let ratio: number = width_r / height_r

	// let xCenter = config.xCenter || 0
	// let ifilled = 0

	if (isEven(config.width)) {
		maxblocks_x = Math.ceil(width_r - 0.5) * 2 + 1
	} else {
		maxblocks_x = Math.ceil(width_r) * 2
	}

	if (isEven(config.height)) {
		maxblocks_y = Math.ceil(height_r - 0.5) * 2 + 1
	} else {
		maxblocks_y = Math.ceil(height_r) * 2
	}

	for (let z = -maxblocks_y / 2 + 1; z <= maxblocks_y / 2 - 1; z++) {
		for (let x = -maxblocks_x / 2 + 1; x <= maxblocks_x / 2 - 1; x++) {
			let xfilled: boolean

			if (thick_t == 'thick') {
				xfilled = fatfilled(x, z, width_r, ratio)
			} else if (thick_t == 'thin') {
				xfilled =
					fatfilled(x, z, width_r, ratio) &&
					!(
						fatfilled(x + (x > 0 ? 1 : -1), z, width_r, ratio) &&
						fatfilled(x, z + (z > 0 ? 1 : -1), width_r, ratio)
					)
			} else {
				xfilled = filled(x, z, width_r, ratio)
			}

			// let i = !!xfilled * 1
			// ifilled += !!xfilled ? 1 : 0

			if (xfilled) {
				blocks.push({x, z})
			}
		}
	}

	// correct to grid positions if even width
	if (isEven(config.width)) {
		blocks = blocks.map(({x, z}) => ({
			x: x + 0.5,
			z: z - 0.5,
		}))
	}

	return blocks
}

export default {
	circle,
}
