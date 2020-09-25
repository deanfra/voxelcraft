export default (id) => {
	var textArea = document.getElementById(id)
	textArea.focus()
	textArea.select()

	try {
		return document.execCommand('copy')
	} catch (err) {
		return false
	}
}
