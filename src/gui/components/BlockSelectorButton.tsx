import React from 'react';
import { btnBlockClass, btnBlockSelectedClass } from '../styles';

type Props = {
	name: string;
	selected: boolean;
	onclick: (n: string) => void
}

const BlockSelectorButton = ({name, selected, onclick}: Props) => {
	const className = `${btnBlockClass} ${selected ? btnBlockSelectedClass : ''}`
	const label = name.replace(/_/g, ' ')

	return <button
		title={label}
		aria-label={`${label} block`}
		onTouchEnd={() => onclick(name)}
		onClick={() => onclick(name)}
		className={className}
	>
		<img src={`./textures/${name}.png`} alt={`${label}`} />
	</button>
}

export default BlockSelectorButton
