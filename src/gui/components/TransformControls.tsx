import transform from '../../utils/transform'
import React from 'react';
import { State } from '../../interfaces';

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

	return <div className="gui__transforms">
		<a href="#" className="gui__button gui__button" onTouchEnd={rotateY} onClick={rotateY}>rotate Y</a
		><br />
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={left} onClick={left}>- x</a>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={right} onClick={right}>+ x</a
		><br />
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={down} onClick={down}>- y</a>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={up} onClick={up}>+ y</a><br />
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={outward} onClick={outward}
			>- z</a
		>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={inward} onClick={inward}
			>+ z</a
		><br />
		<h3>↪️ Flip</h3>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={flipx} onClick={flipx}>x</a>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={flipy} onClick={flipy}>y</a>
		<a href="#" className="gui__button gui__button--inline" onTouchEnd={flipz} onClick={flipz}>z</a>
	</div>
}

export default TransformControls