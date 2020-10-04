import {blockNames} from '../config.js'
import BlockSelector from './components/BlockSelector.js'
import CommandModal from './components/CommandModal.js'
import TemplateLoader from './components/TemplateLoader.js'
import TransformControls from './components/TransformControls.js'
import {clearBlocks, randomBlocks, generateHouse, generateTower} from '../utils/blocks.js'

const {createElement, useState} = React
const html = htm.bind(createElement)

function GUI({state}) {
	const pd = (fn) => {
		fn(state)
		state.render()
	}
	const clear = () => pd(clearBlocks)
	const generate = () => pd(setShowModal(true))
	const random = () => pd(randomBlocks)
	const house = () => pd(generateHouse)
	const tower = () => pd(generateTower)

	const [showModal, setShowModal] = useState(false)

	const [mirrorX, setMirrorX] = useState(state.mirrorX)
	const mirrorXClass = `gui__button--inline ${mirrorX ? 'gui__button--active' : ''}`
	const clickMirrorX = (e) => {
		e.preventDefault()
		setMirrorX(!mirrorX)
		state.mirrorX = !mirrorX
	}

	return html`
		<div>
			<div class="gui">
				<${BlockSelector} blockNames=${blockNames} />
				<button class=${mirrorXClass} onTouchEnd=${clickMirrorX} onClick=${clickMirrorX}>
					${(mirrorX && '🔘') || '⚫️'} Mirror
				</button>
				<button class="gui__button--inline" onTouchEnd=${clear} onClick=${clear}>Clear</button>
				<button class="gui__button--inline" onTouchEnd=${generate} onClick=${generate}>
					Export to Minecraft
				</button>
				<h3>✨ Random</h3>
				<button class="gui__button--inline" onTouchEnd=${house} onClick=${house}>House</button>
				<button class="gui__button--inline" onTouchEnd=${tower} onClick=${tower}>Building</button>
				<button class="gui__button--inline" onTouchEnd=${random} onClick=${random}>Panels</button>
				<h3>💾 Load/Save</h3>
				<${TemplateLoader} state=${state} />
				<h3>↘️ Move model</h3>
				<${TransformControls} state=${state} />
			</div>
			<${CommandModal}
				state=${state}
				show=${showModal}
				onClose=${(e) => pd(e)(setShowModal(false))}
			/>
		</div>
	`
}

export default (state) => {
	const render = ReactDOM.render
	render(html`<${GUI} state=${state} />`, document.getElementById('react'))
}
