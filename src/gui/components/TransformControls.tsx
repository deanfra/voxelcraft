import transform from '../../utils/transform'
import React from 'react';
import { State } from '../../interfaces';
import { btnClass, h3Class } from '../styles';

type Props = {
	state: State
}

const TransformControls = (props:Props) => {
	const pd = (fn: (state: State) => void) => {
		fn(props.state)
		props.state.render()
	}

	const down = () => pd(transform.down)
	const up = () => pd(transform.up)
	const left = () => pd(transform.left)
	const right = () => pd(transform.right)
	const inward = () => pd(transform.inward)
	const outward = () => pd(transform.outward)
	const flipx = () => pd(transform.flipx)
	const flipy = () => pd(transform.flipy)
	const flipz = () => pd(transform.flipz)
	const rotateY = () => pd(transform.rotateYObjects)

	return <div className="pb-20">
		<div className="flex">
			<button className={`${btnClass} flex-1`} onTouchEnd={rotateY} onClick={rotateY}>rotate Y</button><br />
		</div>
		<button className={btnClass} onTouchEnd={left} onClick={left}>- x</button>
		<button className={btnClass} onTouchEnd={right} onClick={right}>+ x</button><br />
		<button className={btnClass} onTouchEnd={down} onClick={down}>- y</button>
		<button className={btnClass} onTouchEnd={up} onClick={up}>+ y</button><br />
		<button className={btnClass} onTouchEnd={outward} onClick={outward}>- z</button>
		<button className={btnClass} onTouchEnd={inward} onClick={inward}>+ z</button><br />
		<h3 className={h3Class}>↘️ Move model</h3>
		<button className={btnClass} onTouchEnd={flipx} onClick={flipx}>x</button>
		<button className={btnClass} onTouchEnd={flipy} onClick={flipy}>y</button>
		<button className={btnClass} onTouchEnd={flipz} onClick={flipz}>z</button>
	</div>
}

export default TransformControls
