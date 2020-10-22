import copyToClipboard from '../../utils/copy'
import React, {useState} from 'react';
import { modalCopyClass, modalCodeClass } from '../styles';

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

	return <div className={`relative`}>
			<button className={modalCopyClass} onClick={onClick}>{copied ? 'Copied!' : 'Copy'}</button>
			<textarea className={modalCodeClass} id={textareaId} value={code}></textarea>
		</div>
	
}

export default CommandCode
