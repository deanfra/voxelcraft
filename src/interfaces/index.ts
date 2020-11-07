import * as THREE from 'three'
import { Object3D } from 'three';

export type Vector = { x: number, y: number, z: number, block?: string }
export type VectorLookup = { [key: number]:{ [key: number]:{ [key: number]: boolean }}}
export type MaterialSwatch = {name: string, type: string, label: string, transparent?: boolean};
export type Materials = {[key:string]: THREE.MeshLambertMaterial};
export type State = {
  cubeMaterials: Materials;
  mirrorX: boolean;
  selectedVoxel: string;
  selectedBlock: string;
  stairHalf: string;
  stairFacing: string;
  modalOpen: boolean;
  objects: Object3D[];
  render: () => void
  scene: THREE.Scene;
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
