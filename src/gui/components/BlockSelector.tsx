import React, {useState} from 'react';
import { sample } from '../../generators/slabs';
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

	const random = () => {
		const randomBlock = sample(props.blockNames)
		setSelectedBlock(randomBlock)
		props.onClick(randomBlock)
	}

	return <>
		<BlockSelectorButton name='random' selected={false} onclick={random} />
		{props.blockNames.map((name) =>
			<BlockSelectorButton name={name} selected={selectedBlock === name} onclick={onclick} />
		)}<br />
	</>
}

export default BlockSelector
