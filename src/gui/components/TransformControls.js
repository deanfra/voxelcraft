import transform from '../../utils/transform.js'

const {createElement} = React
const html = htm.bind(createElement)

const TransformControls = (props) => {
	const down = () => transform.down(props.state)
	const up = () => transform.up(props.state)
	const left = () => transform.left(props.state)
	const right = () => transform.right(props.state)
	const inward = () => transform.inward(props.state)
	const outward = () => transform.outward(props.state)
	const flipx = () => transform.flipx(props.state)
	const flipy = () => transform.flipy(props.state)
	const flipz = () => transform.flipz(props.state)

	return html`<div class="gui__transforms">
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
