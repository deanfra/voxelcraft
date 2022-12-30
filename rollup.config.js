import react from 'react';
import reactDom from 'react-dom';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
	input: 'src/voxel.ts',
	output: [
		{
			format: 'umd',
			name: 'voxel',
			file: 'dist/voxel.js',
			indent: '\t',
		},
	],
	plugins: [
		copy({
			targets: [
				{src: 'src/index.html', dest: 'dist'},
				{src: 'src/main.css', dest: 'dist'},
				{src: 'src/textures', dest: 'dist'},
				{src: 'src/favicon.ico', dest: 'dist'},
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
