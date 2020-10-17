import * as THREE from 'three'

export type Vector = { x: number, y: number, z: number, block?: string }
export type VectorLookup = { [key: number]:{ [key: number]:{ [key: number]: boolean }}}
export type Mesh = { position: Vector, name: string }
export type State = {
  objects: Mesh[];
  mirrorX: boolean;
  cubeMaterials: {[key:string]: THREE.MeshLambertMaterial};
  scene: THREE.Scene;
}

export type Template = {
  name: string;
  id: string;
  blocks: Vector[];
}

