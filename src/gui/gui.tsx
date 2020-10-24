import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {clearBlocks, randomBlocks, generateHouse, generateCastle} from '../utils/blocks'
import { PanelConfig, State } from '../interfaces';
import castleConfig from '../generators/castleConfig';
import houseConfig from '../generators/houseConfig';
import {blockNames} from '../config'

import BlockSelectorGui from './components/BlockSelectorGui';
import CommandModal from './components/CommandModal'
import ConfigPanel from './components/ConfigPanel';
import TemplateLoader from './components/TemplateLoader'
import TransformControls from './components/TransformControls'

import { btnClass, btnHoverClass, panelClass, h3Class } from './styles'

type Props = {
	state: State
}

function GUI({state}: Props) {
	const runAndRender = (fn: any) => {
		fn(state)
		state.render()
	}

	const [showCastlePanel, setShowCastlePanel] = useState(false)
	const [showHousePanel, setShowHousePanel] = useState(false)
	const toggleCastlePanel = () => setShowCastlePanel(!showCastlePanel)
	const toggleHousePanel = () => setShowHousePanel(!showHousePanel)

	const clear = () => runAndRender(clearBlocks)
	const generate = () => runAndRender(setShowModal(true))
	const random = () => runAndRender(randomBlocks)

	const castle = (config: PanelConfig[]) => {
		generateCastle(state, config)
		state.render()
	}

	const house = (config: PanelConfig[]) => {
		generateHouse(state, config)
		state.render()
	}

	const [showModal, setShowModal] = useState(false)
	const btnToggleClass = (active: boolean) => `${btnClass} ${active ? btnHoverClass : ''}`

	// mirrorX
	const [mirrorX, setMirrorX] = useState(state.mirrorX)
	const clickMirrorX = (e: any) => {
		e.preventDefault()
		setMirrorX(!mirrorX)
		state.mirrorX = !mirrorX
	}

	return (
		<>
			<menu className={`${panelClass}`}>
				<BlockSelectorGui blockNames={blockNames} />
				<button className={btnToggleClass(mirrorX)} onTouchEnd={clickMirrorX} onClick={clickMirrorX}>
					Mirror {(mirrorX && 'on') || 'off'} 
				</button>
				<button className={btnClass} onTouchEnd={clear} onClick={clear}>Clear</button>
				<div className="flex">
					<button className={`${btnClass} flex-1`} onTouchEnd={generate} onClick={generate}>
						Export to Minecraft
					</button>
				</div>

				<h3 className={h3Class}>✨ Random</h3>
				<button className={btnToggleClass(showHousePanel)} onTouchEnd={toggleHousePanel} onClick={toggleHousePanel}>House</button>
				<button className={btnToggleClass(showCastlePanel)} onTouchEnd={toggleCastlePanel} onClick={toggleCastlePanel}>Castle</button>
				<button className={btnClass} onTouchEnd={random} onClick={random}>Panels</button>

				<h3 className={h3Class}>💾 Load/Save</h3>
				<TemplateLoader state={state} />

				<h3 className={h3Class}>↘️ Move model</h3>
				<TransformControls state={state} />
			</menu>

			<ConfigPanel
				action={castle}
				actionLabel="Generate"
				config={castleConfig}
				onClose={() => {setShowCastlePanel(false)}}
				title="🏰 Generate Castle"
				visible={showCastlePanel}
			/>
			
			<ConfigPanel
				action={house}
				actionLabel="Generate"
				config={houseConfig}
				onClose={() => {setShowHousePanel(false)}}
				title="🏠 Generate house"
				visible={showHousePanel}
			/>
			
			<CommandModal
				state={state}
				show={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	)
}



export default (state: State) => {
	ReactDOM.render(<GUI state={state} />, document.getElementById('react'));
}

