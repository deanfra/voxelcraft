import React, {useState} from 'react';
import { blockSwatches } from '../../config';
import { sample } from '../../generators/slabs';
import {blockSelectorWrap} from '../styles';
import BlockSelectorButton from './BlockSelectorButton';

type Props = {
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
		const randomBlock = sample(blockSwatches).name
		setSelectedBlock(randomBlock)
		props.onClick(randomBlock)
	}

	return <div className={blockSelectorWrap}>
		<BlockSelectorButton name='random' selected={false} onclick={random} />
		{blockSwatches.map(({name}) =>
			<BlockSelectorButton name={name} selected={selectedBlock === name} onclick={onclick} />
		)}
	</div>
}

export default BlockSelector
