const {createElement, useState} = React
const html = htm.bind(createElement)

const BlockSelect = (name, selected, onclick) => {
	const className = `gui__selected-block ${
		name === selected ? ' gui__selected-block--selected' : ''
	}`
	const label = name.replace(/_/g, ' ')
	return html`<a
		href="#"
		title="${label}"
		aria-label="${label} block"
		onClick=${(e) => onclick(e, name)}
		class="${className}"
	>
		<img src="./textures/${name}.png" alt="${label}" />
	</a>`
}

const BlockSelector = (props) => {
	const [selectedBlock, setSelectedBlock] = useState('cobblestone')
	const onclick = (e, name) => {
		e.preventDefault()
		setSelectedBlock(name)
	}

	return html`<div>
		${props.blockNames.map((name) => BlockSelect(name, selectedBlock, onclick))}<br />
		<input id="GUISelectedBlock" type="hidden" value=${selectedBlock} /><br />
	</div>`
}

export default BlockSelector
