import * as THREE from 'three'

export type Vector = { x: number, y: number, z: number, block?: string }
export type VectorLookup = { [key: number]:{ [key: number]:{ [key: number]: boolean }}}
export type MaterialSwatch = {name: string, type: string, label: string};
export type Materials = {[key:string]: THREE.MeshLambertMaterial};
export type Mesh = { position: Vector, name: string }
export type State = {
  cubeMaterials: Materials;
  mirrorX: boolean;
  modalOpen: boolean;
  objects: Mesh[];
  scene: THREE.Scene;
  render: () => void
}

export type Template = {
  name: string;
  id: string;
  blocks: Vector[];
}

export type PanelConfigValue = number | string | boolean
export type PanelConfigMap = {[key:string]: PanelConfigValue}
export type PanelConfigType = 'material' | 'boolean' | 'number' | 'string'
export type PanelConfig = {
	id: string,
	label: string
	type: PanelConfigType,
	value: PanelConfigValue,
}
