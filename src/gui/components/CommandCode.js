import copyToClipboard from '../../utils/copyToClipboard.js'

const {createElement, useState} = React
const html = htm.bind(createElement)

const CommandCode = ({code, i}) => {
	const textareaId = `command-code-textarea_${i + 1}`
	const [copied, setCopied] = useState(false)
	const onClick = () => {
		copyToClipboard(textareaId)
		setCopied(true)
		setTimeout(() => setCopied(false), 3000)
	}

	return html`
		<div class="modal-window__code-wrapper">
			<button class="modal-window__copy" onClick=${onClick}>${copied ? 'Copied!' : 'Copy'}</button>
			<textarea class="modal-window__code" id=${textareaId} value=${code}></textarea>
		</div>
	`
}

export default CommandCode
