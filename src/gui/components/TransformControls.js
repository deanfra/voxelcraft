import transform from '../../utils/transform.js'

const {createElement} = React
const html = htm.bind(createElement)

const TransformControls = (props) => {
	const pd = (e) => (fn) => e.preventDefault() && fn

	const down = (e) => pd(e)(transform.down(props.state))
	const up = (e) => pd(e)(transform.up(props.state))
	const left = (e) => pd(e)(transform.left(props.state))
	const right = (e) => pd(e)(transform.right(props.state))
	const inward = (e) => pd(e)(transform.inward(props.state))
	const outward = (e) => pd(e)(transform.outward(props.state))
	const flipx = (e) => pd(e)(transform.flipx(props.state))
	const flipy = (e) => pd(e)(transform.flipy(props.state))
	const flipz = (e) => pd(e)(transform.flipz(props.state))
	const rotateY = (e) => pd(e)(transform.rotateYObjects(props.state))

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
