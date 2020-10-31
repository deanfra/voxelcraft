import { PanelConfig } from "../interfaces"

const castleConfig: PanelConfig[] = [
	{
		id: 'material1',
		value: 'stone_bricks',
		type: 'material',
		label: 'Walls',
	},
	{
		id: 'material2',
		value: 'polished_andesite',
		type: 'material',
		label: 'Edges',
	},
	{
		id: 'bastions',
		value: true,
		type: 'boolean',
		label: 'Bastions',
	},
	{
		id: 'mirrorX',
		value: false,
		type: 'boolean',
		label: 'Symmetrical',
	},
	{
		id: 'minRooms',
		value: 1,
		type: 'number',
		label: 'Min Rooms',
	},
	{
		id: 'maxRooms',
		value: 5,
		type: 'number',
		label: 'Max Rooms',
	},
	{
		id: 'minRoomLength',
		value: 3,
		type: 'number',
		label: 'Min Room Size',
	},
	{
		id: 'maxRoomLength',
		value: 7,
		type: 'number',
		label: 'Max Room Size',
	},
	{
		id: 'horizontalSpread',
		value: 4,
		type: 'number',
		label: 'Horizontal Spread',
	},
	{
		id: 'verticalSpread',
		value: 4,
		type: 'number',
		label: 'Vertical Spread',
	}
]

export default castleConfig