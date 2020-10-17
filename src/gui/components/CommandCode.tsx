import copyToClipboard from '../../utils/copy'
import React, {useState} from 'react';

type Props = {
	code: string
	i: number
}

const CommandCode = ({code, i}: Props) => {
	const textareaId = `command-code-textarea_${i + 1}`
	const [copied, setCopied] = useState(false)
	const onClick = () => {
		copyToClipboard(textareaId)
		setCopied(true)
		setTimeout(() => setCopied(false), 3000)
	}

	return <div className="modal-window__code-wrapper">
			<button className="modal-window__copy" onClick={onClick}>${copied ? 'Copied!' : 'Copy'}</button>
			<textarea className="modal-window__code" id={textareaId} value={code}></textarea>
		</div>
	
}

export default CommandCode
