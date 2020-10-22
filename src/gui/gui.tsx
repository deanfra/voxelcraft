import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {blockNames} from '../config'
import BlockSelector from './components/BlockSelector'
import CommandModal from './components/CommandModal'
import TemplateLoader from './components/TemplateLoader'
import TransformControls from './components/TransformControls'
import {clearBlocks, randomBlocks, generateHouse, generateCastle} from '../utils/blocks'
import { State } from '../interfaces';

import { btnClass, btnHoverClass, guiClass, h3Class } from './styles'

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
	const castle = () => runAndRender(generateCastle)

	const [showModal, setShowModal] = useState(false)

	const [mirrorX, setMirrorX] = useState(state.mirrorX)
	const mirrorXClass = `${btnClass} ${mirrorX ? btnHoverClass : ''}`

	const clickMirrorX = (e: any) => {
		e.preventDefault()
		setMirrorX(!mirrorX)
		state.mirrorX = !mirrorX
	}

	// <div className="settings-house">button</div>
	return (
		<div>
			<div className={`gui ${guiClass}`}>
				<BlockSelector blockNames={blockNames} />
				<button className={mirrorXClass} onTouchEnd={clickMirrorX} onClick={clickMirrorX}>
					Mirror {(mirrorX && 'on') || 'off'} 
				</button>
				<button className={btnClass} onTouchEnd={clear} onClick={clear}>Clear</button>
				<div className="flex">
					<button className={`${btnClass} flex-1`} onTouchEnd={generate} onClick={generate}>
						Export to Minecraft
					</button>
				</div>

				<h3 className={h3Class}>✨ Random</h3>
				<button className={btnClass} onTouchEnd={house} onClick={house}>House</button>
				<button className={btnClass} onTouchEnd={castle} onClick={castle}>Castle</button>
				<button className={btnClass} onTouchEnd={random} onClick={random}>Panels</button>

				<h3 className={h3Class}>💾 Load/Save</h3>
				<TemplateLoader state={state} />

				<h3 className={h3Class}>↘️ Move model</h3>
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

