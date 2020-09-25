import {blockNames} from '../config.js'
import BlockSelector from './components/BlockSelector.js'
import CommandModal from './components/CommandModal.js'
import TemplateLoader from './components/TemplateLoader.js'
import TransformControls from './components/TransformControls.js'
import {clearBlocks, randomBlocks, generateHouse, generateTower} from '../utils/blocks.js'

const {createElement, useState} = React
const html = htm.bind(createElement)

function GUI({state}) {
	const clear = () => clearBlocks(state)
	const generate = () => setShowModal(true)
	const random = () => randomBlocks(state)
	const house = () => generateHouse(state)
	const tower = () => generateTower(state)

	const [showModal, setShowModal] = useState(false)

	const [mirrorX, setMirrorX] = useState(state.mirrorX)
	const mirrorXClass = `gui__button--inline ${mirrorX ? 'gui__button--active' : ''}`
	const clickMirrorX = () => {
		setMirrorX(!mirrorX)
		state.mirrorX = !mirrorX
	}

	return html`
		<div>
			<div class="gui">
				<${BlockSelector} blockNames=${blockNames} />
				<a href="#" class=${mirrorXClass} onClick=${clickMirrorX}>${(mirrorX && '🔘') || '⚫️'} Mirror</s>
				<a href="#" class="gui__button--inline" onClick=${clear}>Clear</a>
				<a href="#" class="gui__button--inline" onClick=${generate}>Export to Minecraft</a>
				<h3>✨ Random</h3>
				<a href="#" class="gui__button--inline" onClick=${house}>House</a>
				<a href="#" class="gui__button--inline" onClick=${tower}>Building</a>
				<a href="#" class="gui__button--inline" onClick=${random}>Panels</a>
				<h3>💾 Load/Save</h3>
				<${TemplateLoader} state=${state} />
				<h3>↘️ Move model</h3>
				<${TransformControls} state=${state} />
			</div>
			<${CommandModal} state=${state} show=${showModal} onClose=${() => setShowModal(false)} />
		</div>
	`
}

export default (state) => {
	const render = ReactDOM.render
	render(html`<${GUI} state=${state} />`, document.getElementById('react'))
}
