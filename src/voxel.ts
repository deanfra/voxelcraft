/** ~~~~ welcome to the monolith ~~~~
 * enjoy your scrolling, if you feel like some housekeeping, it would be so cool if you
 * could help refactor this big boy up a bit
**/

import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import {blockSwatches} from './config'
import GUI from './gui/gui'
import { State, Mesh, Materials } from './interfaces/index.js'

let camera: any // THREE.Camera
let scene: THREE.Scene = {} as THREE.Scene
let canvas: THREE.WebGLRenderer
let controls
let plane: THREE.Mesh
let mouse: THREE.Vector2
let raycaster: THREE.Raycaster
let rollOverMesh: THREE.Mesh
let rollOverMaterial: THREE.MeshBasicMaterial
let cubeGeo: THREE.BoxBufferGeometry
let cubeMaterials: Materials = {}

let objects: Mesh[] = []
let mirrorX = false
let modalOpen = false

let touchTimer: NodeJS.Timeout
let touchTime: number
let touchX: number
let touchY: number

// const doc = document as Document

// Record mouse movement
const mouseMovement = {x: 0, y: 0, moveX:0, moveY: 0}

let state: State = {scene, render, objects, cubeMaterials, mirrorX, modalOpen}

/*
const drawStair = (state) => {
	const stairConfig = {
		w: 25,
		l: 50,
		h: 25
	};

	const positionX = 0
	const positionY = 12.5
	const positionZ = -12.5

	const topStair = new THREE.Mesh(new THREE.CubeGeometry(stairConfig.l, stairConfig.w, stairConfig.h), state.cubeMaterials['oak_planks']);
	topStair.position.x = positionX;
	topStair.position.y = positionY;
	topStair.position.z = positionZ;
	
	const bottomStair = new THREE.Mesh(new THREE.CubeGeometry(stairConfig.l, stairConfig.w, stairConfig.h*2), state.cubeMaterials['oak_planks']);
	bottomStair.position.x = positionX;
	bottomStair.position.y = positionY + -25;
	bottomStair.position.z = positionZ + 12.5;

	const maskMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0, transparent: true})
	const stairMask = new THREE.Mesh(new THREE.CubeGeometry(stairConfig.l, stairConfig.w*2, stairConfig.h*2), maskMaterial);
	topStair.position.x = positionX;
	topStair.position.y = positionY;
	topStair.position.z = positionZ;

	let stair = new THREE.Group();
	stair.add( topStair );
	stair.add( bottomStair );
	stair.add( stairMask );
	// stair.rotation.y = (.9 - .125) * 2

	return stair
};
*/

init()
render()
GUI(state)

function init() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
	camera.position.set(500, 800, 1300)
	camera.lookAt(0, 0, 0)

	state.scene = new THREE.Scene()
	state.scene.background = new THREE.Color(0xf0f0f0)

	// roll-over helpers
	const rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50)
	rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true})
	rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
	rollOverMesh.position.set(9999, 9999, 9999)
	state.scene.add(rollOverMesh)

	// Materials
	state.cubeMaterials = blockSwatches.reduce((acc, cur) => {
		return {
			...acc,
			[cur.name]: new THREE.MeshLambertMaterial({
				map: new THREE.TextureLoader().load('textures/' + cur.name + '.png'),
			}),
		}
	}, {})

	// grid
	const gridHelper = new THREE.GridHelper(1000, 20)
	state.scene.add(gridHelper)

	raycaster = new THREE.Raycaster()
	mouse = new THREE.Vector2()

	const planeGeo = new THREE.PlaneBufferGeometry(1000, 1000)
	planeGeo.rotateX(-Math.PI / 2)

	plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({visible: false}))
	plane.name = 'plane'
	state.scene.add(plane)
	state.objects.push(plane)

	cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)
	
	// Draw a command block as a helper to where the design will generate
	const commandBlock = new THREE.Mesh(rollOverGeo, new THREE.MeshLambertMaterial({
		map: new THREE.TextureLoader().load('textures/command_block.png'), 
		opacity: 0.5,
		transparent: true
	}))
	commandBlock.position.set(25,-75,25)
	state.scene.add(commandBlock)

	// lights
	const ambientLight = new THREE.AmbientLight(0x606060)
	state.scene.add(ambientLight)

	const directionalLight = new THREE.DirectionalLight(0xffffff)
	directionalLight.position.set(1, 0.75, 0.5).normalize()
	state.scene.add(directionalLight)

	// Canvas
	canvas = new THREE.WebGLRenderer({antialias: true})
	canvas.setPixelRatio(window.devicePixelRatio)
	canvas.setSize(window.innerWidth, window.innerHeight)

	// Camera
	controls = new OrbitControls(camera, canvas.domElement) as any
	controls.update()
	controls.addEventListener('change', render)

	const canvasEl = document.querySelector('#canvas') as Element
	canvasEl.appendChild(canvas.domElement)

	// Events
	document.addEventListener('mousemove', onDocumentMouseMove)
	document.addEventListener('mouseup', onDocumentMouseUp)
	document.addEventListener('mousedown', onDocumentMouseDown)
	document.addEventListener('touchstart', onDocumentTouchStart)
	document.addEventListener('touchend', onDocumentTouchEnd, false)
	// document.addEventListener('keydown', onDocumentKeyDown)

	window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	canvas.setSize(window.innerWidth, window.innerHeight)
}

function recordStartPosition(event: MouseEvent) {
	mouseMovement.x = event.clientX
	mouseMovement.y = event.clientY
	mouseMovement.moveX = 0
	mouseMovement.moveY = 0
}

function recordMovement(event: MouseEvent) {
	const clientX = event.clientX
	const clientY = event.clientY
	mouseMovement.moveX += Math.abs(mouseMovement.x - clientX)
	mouseMovement.moveY += Math.abs(mouseMovement.y - clientY)
}

function onDocumentTouchStart(event: TouchEvent) {
	touchTime = 0
	touchTimer = setInterval(() => {
		touchTime += 1
	}, 1)
	const target = (!!event.targetTouches && event.targetTouches[0]) || {}
	touchX = target.clientX
	touchY = target.clientY
}

function onDocumentMouseDown(event: MouseEvent) {
	// event.preventDefault() // BUG: this prevents input focus
	recordStartPosition(event)
	document.addEventListener('mousemove', recordMovement)
}

function onDocumentMouseMove(event: MouseEvent) {
	event.preventDefault()

	const {clientX, clientY} = event
	const {innerWidth, innerHeight} = window
	mouse.set((clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1)

	raycaster.setFromCamera(mouse, camera)

	let intersects = raycaster.intersectObjects(objects as THREE.Object3D[])

	if (intersects.length > 0 && intersects[0].face) {
		rollOverMesh.position.copy(intersects[0].point).add(intersects[0].face.normal)
		rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	}

	render()
}

function onDocumentTouchEnd(event: TouchEvent) {
	onDocumentMouseUp((event as unknown) as MouseEvent)
}

function onDocumentMouseUp(event: MouseEvent) {
	// event.preventDefault() // BUG: this prevents input focus

	clearInterval(touchTimer)
	const {moveX, moveY} = mouseMovement
	const mouseHasMoved = moveX > 15 || moveX < -15 || moveY > 15 || moveY < -15 || touchTime > 75
	if (state.modalOpen || mouseHasMoved) {
		return
	}

	const clientX = event.clientX || touchX
	const clientY = event.clientY || touchY

	const {innerWidth, innerHeight} = window
	mouse.set((clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1)

	raycaster.setFromCamera(mouse, camera)

	// const allObjects = objects.flatMap(obj => obj.children.length ? obj.children : obj)
	// let intersects = raycaster.intersectObjects(allObjects)

	let intersects = raycaster.intersectObjects(objects as THREE.Object3D[])

	if (intersects.length > 0) {
		// GET MIRROR
		const doMirrorX = state.mirrorX
		const intersect = intersects[0]

		// delete cube
		if (event.button === 2) {
			if (intersects[0].object !== plane) {
				// if(intersects[0].object.parent && intersects[0].object.parent.children.length) {
					// intersects[0].object.parent.children.forEach(child => state.scene.remove(child))
				// } else {
				state.scene.remove(intersects[0].object)
				state.objects.splice(state.objects.indexOf(intersects[0].object), 1)
				// }
			}
		} else {
			// GET MATERIAL
			const selectBlock = document.querySelector('#GUISelectedBlock') as HTMLInputElement
			const selectedMaterial = selectBlock.value
			// create cube
			createVoxel(cubeGeo, intersect, state.cubeMaterials[selectedMaterial], selectedMaterial)

			if (doMirrorX) {
				// Mirror X
				const x = intersect.point.x
				intersect.point.x = x - x * 2
				createVoxel(cubeGeo, intersect, state.cubeMaterials[selectedMaterial], selectedMaterial)
				// createStair(cubeGeo, intersect, state.cubeMaterials[selectedMaterial], selectedMaterial)
			}
		}
	}

	render()
}

const createVoxel = (geo: THREE.BoxBufferGeometry, intersect: THREE.Intersection, material: THREE.MeshLambertMaterial, name: string) => {
	let voxel = new THREE.Mesh(geo, material)
	const face = intersect.face as THREE.Face3
	voxel.position.copy(intersect.point).add(face.normal)
	voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	voxel.name = name
	state.scene.add(voxel)
	state.objects.push(voxel)
}

/*
const createStair = (geo, intersect, material, name) => {
	const stair = drawStair(state, material, name)
	stair.position.copy(intersect.point).add(intersect.face.normal)
	stair.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	stair.name = name
	state.scene.add(stair)
	state.objects.push(stair)
}
*/

function render() {
	canvas.render(state.scene, camera)
}
