export type Vector = { x: number, y: number, z: number }
export type Mesh = { position: Vector, name: string }
export type State = { objects: Mesh[] }