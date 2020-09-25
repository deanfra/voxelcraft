const {createElement, useState} = React
const html = htm.bind(createElement)

const BlockSelect = (name, selected, onclick) => {
	const className = `gui__selected-block ${
		name === selected ? ' gui__selected-block--selected' : ''
	}`
	return html`<a href="#" onClick=${() => onclick(name)} class="${className}">
		<img src="./textures/${name}.png" />
	</a>`
}

const BlockSelector = (props) => {
	const [selectedBlock, setSelectedBlock] = useState('cobblestone')
	return html`<div>
		${props.blockNames.map((name) => BlockSelect(name, selectedBlock, setSelectedBlock))}<br />
		<input id="GUISelectedBlock" type="hidden" value=${selectedBlock} /><br />
	</div>`
}

export default BlockSelector
