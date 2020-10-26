import * as THREE from 'three'

export type Vector = { x: number, y: number, z: number, block?: string }
export type VectorLookup = { [key: number]:{ [key: number]:{ [key: number]: boolean }}}
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

export type PanelConfigMap = {[key:string]: string | number | boolean}
export type PanelConfig = {
	id: string,
	type: 'material' | 'boolean' | 'number' | 'string',
	value: number | string | boolean,
	label: string
}
