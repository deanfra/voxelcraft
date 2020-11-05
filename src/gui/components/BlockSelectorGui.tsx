import React, {useState} from 'react';
import { State } from '../../interfaces';
import BlockSelector from './BlockSelector';

type Props = {
	state: State
}

// Wrapping a hidden input so that the Three.js monolith can access this value
// can be refactored to just use the external 'state' object in voxel.ts
const BlockSelectorGui = ({state}: Props) => {
	const [selectedBlock, setSelectedBlock] = useState(state.selectedBlock)
	const onclick = (name: string) => {
		setSelectedBlock(name)
		state.selectedBlock = name
	}

	return <div className="mb-3">
		<BlockSelector selected={selectedBlock} onClick={onclick} />
	</div>
}

export default BlockSelectorGui
