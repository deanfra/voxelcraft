import storage from '../../utils/localstorage.js'
import {clearBlocks, fillBlocks} from '../../utils/blocks.js'

const {createElement, useState, useEffect} = React
const html = htm.bind(createElement)

const TemplateLink = (props) => {
	const click = () => {
		props.onClick(props.tpl.id)
	}
	const del = () => {
		props.del(props.tpl.id)
	}

	return html`<li>
		<button class="gui__button" onTouchEnd=${click} onClick=${click}>${props.tpl.name}</button>
		<button class="gui__button gui__button--close" onTouchEnd=${del} onClick=${del}>⨯</button>
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
		props.state.render()
	}

	const del = (id) => {
		storage.delete(id)
		setTemplates(templates.filter((tpl) => tpl.id !== id))
	}

	return html`<ul class="gui__saved-list">
		${templates.map(
			(tpl) =>
				html`<${TemplateLink}
					tpl=${tpl}
					onTouchEnd=${(id) => load(id)}
					onClick=${(id) => load(id)}
					del=${(id) => del(id)}
				/>`,
		)}
		<li>
			<button class="gui__button text-center" onTouchEnd=${save} onClick=${save}>+ Save</button>
		</li>
	</ul>`
}

export default TemplateLoader
