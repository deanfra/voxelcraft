import React, {useState} from 'react';
import BlockSelector from './BlockSelector';

// Wrapping a hidden input so that the Three.js monolith can access this value
// can be refactored to just use the external 'state' object in voxel.ts
const BlockSelectorGui = () => {
	const [selectedBlock, setSelectedBlock] = useState('cobblestone')
	const onclick = (name: string) => {
		setSelectedBlock(name)
	}

	return <>
		<BlockSelector selected={selectedBlock} onClick={onclick} />
		<input id="GUISelectedBlock" type="hidden" value={selectedBlock} /><br />
	</>
}

export default BlockSelectorGui
