import React, {useState} from 'react';
import BlockSelectorButton from './BlockSelectorButton';

type Props = {
	blockNames: string[]
	selected: string
	onClick: (name: string) => void
}

const BlockSelector = (props: Props) => {
	const [selectedBlock, setSelectedBlock] = useState(props.selected)
	const onclick = (name: string) => {
		setSelectedBlock(name)
		props.onClick(name)
	}

	return <>
		{props.blockNames.map((name) =>
			<BlockSelectorButton name={name} selected={selectedBlock === name} onclick={onclick} />
		)}<br />
	</>
}

export default BlockSelector
