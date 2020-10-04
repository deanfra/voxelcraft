import transform from '../../utils/transform.js'

const {createElement} = React
const html = htm.bind(createElement)

const TransformControls = (props) => {
	const pd = (fn) => {
		fn(props.state)
		props.state.render()
		return false
	}

	const down = (e) => pd(transform.down)
	const up = (e) => pd(transform.up)
	const left = (e) => pd(transform.left)
	const right = (e) => pd(transform.right)
	const inward = (e) => pd(transform.inward)
	const outward = (e) => pd(transform.outward)
	const flipx = (e) => pd(transform.flipx)
	const flipy = (e) => pd(transform.flipy)
	const flipz = (e) => pd(transform.flipz)
	const rotateY = (e) => pd(transform.rotateYObjects)

	return html`<div class="gui__transforms">
		<a href="#" class="gui__button gui__button" onClick=${rotateY}>rotate Y</a><br />
		<a href="#" class="gui__button gui__button--inline" onClick=${left}>- x</a>
		<a href="#" class="gui__button gui__button--inline" onClick=${right}>+ x</a><br />
		<a href="#" class="gui__button gui__button--inline" onClick=${down}>- y</a>
		<a href="#" class="gui__button gui__button--inline" onClick=${up}>+ y</a><br />
		<a href="#" class="gui__button gui__button--inline" onClick=${outward}>- z</a>
		<a href="#" class="gui__button gui__button--inline" onClick=${inward}>+ z</a><br />
		<h3>↪️ Flip</h3>
		<a href="#" class="gui__button gui__button--inline" onClick=${flipx}>x</a>
		<a href="#" class="gui__button gui__button--inline" onClick=${flipy}>y</a>
		<a href="#" class="gui__button gui__button--inline" onClick=${flipz}>z</a>
	</div>`
}

export default TransformControls
