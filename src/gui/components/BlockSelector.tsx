import React, {useState} from 'react';

type Props = {
	blockNames: string[]
}

const BlockSelect = (name: string, selected: string, onclick: (n: string) => void) => {
	const className = `gui__selected-block ${
		name === selected ? ' gui__selected-block--selected' : ''
	}`
	const label = name.replace(/_/g, ' ')

	return <button
		title={label}
		aria-label={`${label} block`}
		onTouchEnd={() => onclick(name)}
		onClick={() => onclick(name)}
		className={className}
	>
		<img src={`./textures/${name}.png`} alt="${label}" />
	</button>
}

const BlockSelector = (props: Props) => {
	const [selectedBlock, setSelectedBlock] = useState('cobblestone')
	const onclick = (name: string) => {
		setSelectedBlock(name)
	}

	return <div>
		{props.blockNames.map((name) => BlockSelect(name, selectedBlock, onclick))}<br />
		<input id="GUISelectedBlock" type="hidden" value={selectedBlock} /><br />
	</div>
}

export default BlockSelector
