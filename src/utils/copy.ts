const copy = (id: string): boolean => {
	let textArea = document.getElementById(id) as HTMLInputElement
	let result
	textArea.focus()
	textArea.select()

	try {
		result = document.execCommand('copy')
	} catch (err) {
		result = false
	}

	return result
}

export default copy