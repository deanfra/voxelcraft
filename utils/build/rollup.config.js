import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

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
		resolve(),
		typescript(),
		commonjs(),
		babel({
			extensions,
			exclude: 'node_modules/**',
		}),
	],
}
