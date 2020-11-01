import { PanelConfig } from "../interfaces"

const slabsConfig: PanelConfig[] = [
	{
		id: 'material1',
		value: 'stone_bricks',
		type: 'material',
		label: 'Block 1',
	},
	{
		id: 'material2',
		value: 'spruce_planks',
		type: 'material',
		label: 'Block 2',
	},
	{
		id: 'mirrorX',
		value: false,
		type: 'boolean',
		label: 'Symmetrical',
	},
	{
		id: 'minSlabs',
		value: 3,
		type: 'number',
		label: 'Min Slabs',
	},
	{
		id: 'maxSlabs',
		value: 5,
		type: 'number',
		label: 'Max Slabs',
	},
	{
		id: 'minSlabLength',
		value: 3,
		type: 'number',
		label: 'Min Slab Size',
	},
	{
		id: 'maxSlabLength',
		value: 7,
		type: 'number',
		label: 'Max Slab Size',
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

export default slabsConfig