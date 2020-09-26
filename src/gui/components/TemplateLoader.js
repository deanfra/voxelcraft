import storage from '../../utils/localstorage.js'
import {clearBlocks, fillBlocks} from '../../utils/blocks.js'

const {createElement, useState, useEffect} = React
const html = htm.bind(createElement)

const TemplateLink = (props) => {
	const click = (e) => {
		e.preventDefault()
		props.onClick(props.tpl.id)
	}
	const del = (e) => {
		e.preventDefault()
		props.del(props.tpl.id)
	}

	return html`<li>
		<a class="gui__button" href="#" onClick=${click}>${props.tpl.name}</a>
		<a class="gui__button gui__button--close" href="#" onClick=${del}>⨯</a>
	</li>`
}

const TemplateLoader = (props) => {
	const [templates, setTemplates] = useState([])
	useEffect(() => {
		const store = storage.fetchAll()
		setTemplates(store.saved)
	}, [])

	const save = (e) => {
		e.preventDefault()
		storage.save(props.state.objects)
		const store = storage.fetchAll()
		setTemplates(store.saved)
	}

	const load = (id) => {
		clearBlocks(props.state)
		const savedBlocks = storage.fetch(id)
		if (savedBlocks) fillBlocks(savedBlocks.blocks, props.state)
	}

	const del = (id) => {
		storage.delete(id)
		setTemplates(templates.filter((tpl) => tpl.id !== id))
	}

	return html`<ul class="gui__saved-list">
		${templates.map(
			(tpl) =>
				html`<${TemplateLink} tpl=${tpl} onClick=${(id) => load(id)} del=${(id) => del(id)} />`,
		)}
		<li>
			<a class="gui__button text-center" href="#" onClick=${save}>+ Save</a>
		</li>
	</ul>`
}

export default TemplateLoader
