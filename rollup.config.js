import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import react from 'react';
import reactDom from 'react-dom';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
	input: 'src/voxel.ts',
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
		replace({
			// Fixes Error: "Uncaught ReferenceError: process is not defined"
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
		resolve(),
		typescript(),
		commonjs({
			// Fixes Error: 'useState' is not exported by node_modules/react/index.js
			include: 'node_modules/**',
			namedExports: {
				react: Object.keys(react),
				'react-dom': Object.keys(reactDom)
			}
		}),
		babel({
			extensions,
			exclude: 'node_modules/**',
		}),
	],
}
