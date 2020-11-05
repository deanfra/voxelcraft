import * as THREE from 'three'
import { State } from "../interfaces"


const pi = 3.1415926535897932384626433832795028841971693993751
const deg90 = pi / 2 // equals 90 degrees of rotation
const deg180 = pi
const deg270 = pi * 1.5
const rotations = {south: 0, north: deg180, east: deg90, west: deg270};

const stairConfig = { w: 25, l: 50, h: 25 };

const positionX = 0
const positionY = 12.5
const positionZ = -12.5

const drawStair = (state: State) => {
	const topStair = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w, stairConfig.h), state.cubeMaterials['oak_planks']);
	topStair.position.x = positionX;
	topStair.position.y = positionY;
	topStair.position.z = positionZ + 25;
	
	const bottomStair = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w, stairConfig.h*2), state.cubeMaterials['oak_planks']);
	bottomStair.position.x = positionX;
	bottomStair.position.y = positionY - 25;
	bottomStair.position.z = positionZ + 12.5;

	const stairMesh = new THREE.Group();
	stairMesh.add( topStair );
	stairMesh.add( bottomStair );
	stairMesh.rotation.y = rotations.south

	const maskMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0, transparent: true})
	const stairMask = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w*2, stairConfig.h*2), maskMaterial);

	let stair = new THREE.Group();
	stair.add( stairMask );
	stair.add( stairMesh );

	return stair
};

export default (state: State, position: THREE.Vector3, name: string) => {
	const stair = drawStair(state)
	stair.position.copy(position)
	stair.name = name
	state.scene.add(stair)
	state.objects.push(stair.children[0])
}