import toCommand from '../../utils/converter'
import CommandCode from './CommandCode'
import React, {useState, useEffect} from 'react';
import { State } from '../../interfaces';

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

	return  <div className={`modal-window ${show ? 'modal-window--opened' : ''}`}>
		<div>
			<h1>{`🎁 Your command block code${generated.length > 1 ? 's' : ''}`}</h1>
			<a href="#" title="Close" className="modal-close" onTouchEnd={onClose} onClick={onClose}>Close</a>
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
