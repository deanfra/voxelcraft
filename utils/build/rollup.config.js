import copy from 'rollup-plugin-copy'

export default {
	input: 'src/voxel.js',
	output: [
		{
			format: 'umd',
			name: 'voxel',
			file: 'build/voxel.js',
			indent: '\t',
		},
	],
	plugins: [
		copy({
			targets: [
				{src: 'src/index.html', dest: 'build'},
				{src: 'src/main.css', dest: 'build'},
				{src: 'src/textures', dest: 'build'},
				{src: 'src/favicon.ico', dest: 'build'},
			],
		}),
	],
}
