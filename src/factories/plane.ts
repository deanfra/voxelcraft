import * as THREE from 'three'
import { State } from "../interfaces"

export default (state: State): void => {
  const planeGeo = new THREE.PlaneBufferGeometry(1000, 1000)
	planeGeo.rotateX(-Math.PI / 2)

	const plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({visible: false}))
	plane.name = 'plane'
	state.scene.add(plane)
  state.objects.push(plane)
}