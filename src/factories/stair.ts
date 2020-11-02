import * as THREE from 'three'
import { State } from "../interfaces"

const drawStair = (state: State) => {
	const stairConfig = { w: 25, l: 50, h: 25 };

	const positionX = 0
	const positionY = 12.5
	const positionZ = -12.5

	const topStair = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w, stairConfig.h), state.cubeMaterials['oak_planks']);
	topStair.position.x = positionX;
	topStair.position.y = positionY;
	topStair.position.z = positionZ;
	
	const bottomStair = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w, stairConfig.h*2), state.cubeMaterials['oak_planks']);
	bottomStair.position.x = positionX;
	bottomStair.position.y = positionY + -25;
	bottomStair.position.z = positionZ + 12.5;

	const maskMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0, transparent: true})
	const stairMask = new THREE.Mesh(new THREE.BoxBufferGeometry(stairConfig.l, stairConfig.w*2, stairConfig.h*2), maskMaterial);
	topStair.position.x = positionX;
	topStair.position.y = positionY;
	topStair.position.z = positionZ;

	let stair = new THREE.Group();
	stair.add( stairMask );
	stair.add( topStair );
	stair.add( bottomStair );
	// stair.rotation.y = (.9 - .125) * 2

	return stair
};

export default (state: State, position: THREE.Vector3, name: string) => {
	const stair = drawStair(state)
	stair.position.copy(position)
	stair.name = name
	state.scene.add(stair)
	state.objects.push(stair.children[0])
}