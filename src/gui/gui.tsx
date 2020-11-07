import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {clearBlocks, generateSlabs, generateHouse, generateCastle} from '../utils/blocks'
import {PanelConfig, State} from '../interfaces';
import castleConfig from '../generators/castleConfig';
import houseConfig from '../generators/houseConfig';
import slabsConfig from '../generators/slabsConfig';

import BlockSelectorGui from './components/BlockSelectorGui';
import CommandModal from './components/CommandModal'
import ConfigPanel from './components/ConfigPanel';
import StairControls from './components/StairControls'
import TemplateLoader from './components/TemplateLoader'
import TransformControls from './components/TransformControls'

import {btnClass, btnHoverClass, panelClass, h3Class} from './styles'

type Props = {
	state: State
}

function GUI({state}: Props) {
	const runAndRender = (fn: any) => {
		if(fn) {
			fn(state)
		}
		state.render()
	}

	const clear = () => runAndRender(clearBlocks)
	const generate = () => runAndRender(setShowModal(true))

	const [showCastlePanel, setShowCastlePanel] = useState(false)
	const [showHousePanel, setShowHousePanel] = useState(false)
	const [showSlabsPanel, setShowSlabsPanel] = useState(false)
	const [selectedVoxel, setSelectedVoxel] = useState(state.selectedVoxel)

	const untoggleAll = () => {setShowCastlePanel(false); setShowHousePanel(false); setShowSlabsPanel(false)}
	const toggleCastlePanel = () => {untoggleAll(); setShowCastlePanel(!showCastlePanel)}
	const toggleHousePanel = () => {untoggleAll(); setShowHousePanel(!showHousePanel)}
	const toggleSlabsPanel = () => {untoggleAll(); setShowSlabsPanel(!showSlabsPanel)}

	// refactor
	const castle = (config: PanelConfig[]) => {
		generateCastle(state, config)
		state.render()
	}

	const house = (config: PanelConfig[]) => {
		generateHouse(state, config)
		state.render()
	}

	const slabs = (config: PanelConfig[]) => {
		generateSlabs(state, config)
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
				<h3 className={h3Class}>📦 Place Block</h3>
				<button
					className={`${btnClass} ${selectedVoxel === 'block' && btnHoverClass}`}
					onTouchEnd={() => {setSelectedVoxel('block'); state.selectedVoxel = 'block'}}
					onClick={() => {setSelectedVoxel('block'); state.selectedVoxel = 'block'}}>
					Block
				</button>
				<button
					className={`${btnClass} ${selectedVoxel === 'stairs' && btnHoverClass}`}
					onTouchEnd={() => {setSelectedVoxel('stairs'); state.selectedVoxel = 'stairs'}}
					onClick={() => {setSelectedVoxel('stairs'); state.selectedVoxel = 'stairs'}}>
					Stairs
				</button>

				{selectedVoxel === 'stairs' ? <StairControls state={state} /> : null}
				{selectedVoxel === 'block' ? <BlockSelectorGui state={state} /> : null}

				<button className={btnToggleClass(mirrorX)} onTouchEnd={clickMirrorX} onClick={clickMirrorX}>
					Mirror
				</button>
				<button className={btnClass} onTouchEnd={clear} onClick={clear}>Clear</button>
				<button className={btnClass} onTouchEnd={generate} onClick={generate}>
					Export
				</button>

				<h3 className={h3Class}>✨ Random</h3>
				{/* refactor */}
				<div role="radiogroup">
					<button
						role="radio"
						aria-checked={showHousePanel}
						className={btnToggleClass(showHousePanel)}
						onTouchEnd={toggleHousePanel}
						onClick={toggleHousePanel}>
							House
					</button>
					<button
						role="radio"
						aria-checked={showCastlePanel}
						className={btnToggleClass(showCastlePanel)}
						onTouchEnd={toggleCastlePanel}
						onClick={toggleCastlePanel}>
							Castle
					</button>
					<button
						role="radio"
						aria-checked={showSlabsPanel}
						className={btnToggleClass(showSlabsPanel)}
						onTouchEnd={toggleSlabsPanel}
						onClick={toggleSlabsPanel}>
							Slabs
					</button>
				</div>

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
				title="🏰  Generate Castle"
				visible={showCastlePanel}
			/>
			
			<ConfigPanel
				action={house}
				actionLabel="Generate"
				config={houseConfig}
				onClose={() => {setShowHousePanel(false)}}
				title="🏠  Generate house"
				visible={showHousePanel}
			/>
			
			<ConfigPanel
				action={slabs}
				actionLabel="Generate"
				config={slabsConfig}
				onClose={() => {setShowSlabsPanel(false)}}
				title="🧱  Generate slabs"
				visible={showSlabsPanel}
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

