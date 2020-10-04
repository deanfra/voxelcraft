import transform from '../../utils/transform.js'

const {createElement} = React
const html = htm.bind(createElement)

const TransformControls = (props) => {
	const pd = (fn) => {
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

	return html`<div class="gui__transforms">
		<a href="#" class="gui__button gui__button" onTouchEnd=${rotateY} onClick=${rotateY}>rotate Y</a
		><br />
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${left} onClick=${left}>- x</a>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${right} onClick=${right}>+ x</a
		><br />
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${down} onClick=${down}>- y</a>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${up} onClick=${up}>+ y</a><br />
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${outward} onClick=${outward}
			>- z</a
		>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${inward} onClick=${inward}
			>+ z</a
		><br />
		<h3>↪️ Flip</h3>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${flipx} onClick=${flipx}>x</a>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${flipy} onClick=${flipy}>y</a>
		<a href="#" class="gui__button gui__button--inline" onTouchEnd=${flipz} onClick=${flipz}>z</a>
	</div>`
}

export default TransformControls
