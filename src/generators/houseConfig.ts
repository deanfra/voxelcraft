import { PanelConfig } from "../interfaces"

const houseConfig: PanelConfig[] = [
	{
		id: 'material1',
		value: 'oak_planks',
		type: 'material',
		label: 'Walls',
	},
	{
		id: 'material2',
		value: 'oak_wood',
		type: 'material',
		label: 'Frames',
	},
	{
		id: 'material3',
		value: 'oak_planks',
		type: 'material',
		label: 'Roof',
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
		value: 2,
		type: 'number',
		label: 'Horizontal Spread',
	},
	{
		id: 'verticalSpread',
		value: 1,
		type: 'number',
		label: 'Vertical Spread',
	}
]

export default houseConfig