// Sourced from @donatj from https://github.com/donatj/Circle-Generator

let distance = function (x, z, ratio) {
	return Math.sqrt(Math.pow(z * ratio, 2) + Math.pow(x, 2))
}
let filled = function (x, z, radius, ratio) {
	return distance(x, z, ratio) <= radius
}
let fatfilled = function (x, z, radius, ratio) {
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

const circle = (config) => {
	let blocks = []

	let maxblocks_x
	let maxblocks_y
	let thick_t = config.thickness || 'thin'
	let width_r = (config.width || 9) / 2
	let height_r = (config.height || 9) / 2
	let ratio = width_r / height_r
	let xCenter = config.xCenter || 0

	// let ifilled = 0

	if ((width_r * 2) % 2 == 0) {
		maxblocks_x = Math.ceil(width_r - 0.5) * 2 + 1
	} else {
		maxblocks_x = Math.ceil(width_r) * 2
	}

	if ((height_r * 2) % 2 == 0) {
		maxblocks_y = Math.ceil(height_r - 0.5) * 2 + 1
	} else {
		maxblocks_y = Math.ceil(height_r) * 2
	}

	for (let z = -maxblocks_y / 2 + 1; z <= maxblocks_y / 2 - 1; z++) {
		for (let x = -maxblocks_x / 2 + 1; x <= maxblocks_x / 2 - 1; x++) {
			let xfilled

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
	return blocks
}

export default {
	circle,
}
