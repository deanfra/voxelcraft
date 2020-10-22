import toCommand from '../../utils/converter'
import CommandCode from './CommandCode'
import React, {useState, useEffect} from 'react';
import { State } from '../../interfaces';
import { h2Class, modalClosedClass, modalInnerClass, modalOpenedClass, modalCloseClass } from '../styles';

type Props = {
	state: State
	show: boolean
	onClose: () => void
}

const CommandModal = ({state, show, onClose}: Props) => {
	const [generated, setGenerated] = useState<string[]>([])

	useEffect(() => {
		state.modalOpen = show
		setGenerated(toCommand(state.objects))
	}, [show])

	return <div className={show ? modalOpenedClass : modalClosedClass}>
		<div className={modalInnerClass}>
			<h2 className={h2Class}>{`🎁 Your command block code${generated.length > 1 ? 's' : ''}`}</h2>
			<button title="Close" className={modalCloseClass} onTouchEnd={onClose} onClick={onClose}>Close</button>
			{generated.map(
				(code, i) => <div>
					{generated.length > 1 ? <small>Block {i + 1}/{generated.length}</small> : ''}
					<CommandCode i={i} code={code} />
				</div>
			)}
		</div>
	</div>
}

export default CommandModal
