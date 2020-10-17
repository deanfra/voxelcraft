import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {blockNames} from '../config'
import BlockSelector from './components/BlockSelector'
import CommandModal from './components/CommandModal'
import TemplateLoader from './components/TemplateLoader'
import TransformControls from './components/TransformControls'
import {clearBlocks, randomBlocks, generateHouse, generateTower} from '../utils/blocks'
import { State } from '../interfaces';

type Props = {
	state: State
}

function GUI({state}: Props) {
	const runAndRender = (fn: any) => {
		fn(state)
		state.render()
	}
	const clear = () => runAndRender(clearBlocks)
	const generate = () => runAndRender(setShowModal(true))
	const random = () => runAndRender(randomBlocks)
	const house = () => runAndRender(generateHouse)
	const tower = () => runAndRender(generateTower)

	const [showModal, setShowModal] = useState(false)

	const [mirrorX, setMirrorX] = useState(state.mirrorX)
	const mirrorXClass = `gui__button--inline ${mirrorX ? 'gui__button--active' : ''}`

	const clickMirrorX = (e: any) => {
		e.preventDefault()
		setMirrorX(!mirrorX)
		state.mirrorX = !mirrorX
	}

	// <div className="settings-house">button</div>
	return (
		<div>
			<div className="gui">
				<BlockSelector blockNames={blockNames} />
				<button className={mirrorXClass} onTouchEnd={clickMirrorX} onClick={clickMirrorX}>
					{(mirrorX && '🔘') || '⚫️'} Mirror
				</button>
				<button className="gui__button--inline" onTouchEnd={clear} onClick={clear}>Clear</button>
				<button className="gui__button--inline" onTouchEnd={generate} onClick={generate}>
					Export to Minecraft
				</button>
				<h3>✨ Random</h3>
				<button className="gui__button--inline" onTouchEnd={house} onClick={house}>House</button>
				<button className="gui__button--inline" onTouchEnd={tower} onClick={tower}>Building</button>
				<button className="gui__button--inline" onTouchEnd={random} onClick={random}>Panels</button>
				<h3>💾 Load/Save</h3>
				<TemplateLoader state={state} />
				<h3>↘️ Move model</h3>
				<TransformControls state={state} />
			</div>
			<CommandModal
				state={state}
				show={showModal}
				onClose={() => setShowModal(false)}
			/>
		</div>
	)
}



export default (state: State) => {
	ReactDOM.render(<GUI state={state} />, document.getElementById('react'));
}

