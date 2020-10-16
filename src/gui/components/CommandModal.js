import toCommand from '../../utils/converter'
import CommandCode from './CommandCode'

const {createElement, useState, useEffect} = React
const html = htm.bind(createElement)

const CommandModal = ({state, show, onClose}) => {
	const [generated, setGenerated] = useState([])

	useEffect(() => {
		state.modalOpen = show
		setGenerated(toCommand(state.objects))
	}, [show])

	return html` <div class="modal-window ${show ? 'modal-window--opened' : ''}">
		<div>
			<h1>🎁 Your command block code${generated.length > 1 ? 's' : ''}</h1>
			<a href="#" title="Close" class="modal-close" onTouchEnd=${onClose} onClick=${onClose}>Close</a>
			${generated.map(
				(code, i) => html`<div>
					${generated.length > 1 ? html`<small>Block ${i + 1}/${generated.length}</small>` : ''}
					<${CommandCode} i=${i} code=${code} />
				</div>`,
			)}
		</div>
	</div>`
}

export default CommandModal
