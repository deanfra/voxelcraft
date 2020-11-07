/** ~~~~ welcome to the monolith ~~~~
 * enjoy your scrolling, if you feel like some housekeeping, it would be so cool if you
 * could help refactor this big boy up a bit
**/

import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls'
import {blockSwatches} from './config'
import GUI from './gui/gui'
import { State, Materials } from './interfaces/index'
import { Object3D } from 'three'
import addVoxel from './factories/voxel'
import addStair from './factories/stair'
import addPlane from './factories/plane'

let camera: any // THREE.Camera
let scene: THREE.Scene = {} as THREE.Scene
let canvas: THREE.WebGLRenderer
let controls
let mouse: THREE.Vector2
let raycaster: THREE.Raycaster
let rollOverMesh: THREE.Mesh
let rollOverMaterial: THREE.MeshBasicMaterial
let cubeMaterials: Materials = {}

let objects: Object3D[] = []
let mirrorX = false
let modalOpen = false
let selectedVoxel = 'block'
let selectedBlock = 'cobblestone'
let stairFacing = 'south'
let stairHalf = 'bottom'

let touchTimer: NodeJS.Timeout
let touchTime: number
let touchX: number
let touchY: number

// Record mouse movement
const mouseMovement = {x: 0, y: 0, moveX:0, moveY: 0}

let state: State = {scene, render, objects, cubeMaterials, mirrorX, modalOpen, selectedVoxel, selectedBlock, stairHalf, stairFacing}

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
				transparent: !!cur.transparent,
				map: new THREE.TextureLoader().load('textures/' + cur.name + '.png'),
			}),
		}
	}, {})

	// grid
	const gridHelper = new THREE.GridHelper(1000, 20)
	state.scene.add(gridHelper)

	raycaster = new THREE.Raycaster()
	mouse = new THREE.Vector2()
	addPlane(state)
	
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
		const position = getIntersectPosition(intersects[0])
		rollOverMesh.position.copy(position)
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

	let intersects = raycaster.intersectObjects(objects as THREE.Object3D[])

	if (intersects.length > 0) {
		// GET MIRROR
		const doMirrorX = state.mirrorX
		const intersect = intersects[0]

		// delete
		if (event.button === 2) {
			const target = intersects[0].object
			const parent = target.parent as Object3D
			// whole scene will have no name
			const siblings = !!parent.name && parent.children || []
			const obj = (siblings.length ? target.parent : target) as Object3D
			if (obj.name !== 'plane') {
				// Remove the siblings
				siblings.forEach(child => state.scene.remove(child))
				state.scene.remove(obj)
				state.objects.splice(state.objects.indexOf(target), 1)
			}
		} else {
			// GET MATERIAL
			const selectedMaterial = state.cubeMaterials[state.selectedBlock]
			const position = getIntersectPosition(intersect)
			if(state.selectedVoxel==='block') {
				addVoxel(state, position, selectedMaterial, state.selectedBlock)
			} else {
				addStair(state, position, `oak_stairs[facing=${state.stairFacing},half=${state.stairHalf}]`)
			}

			if (doMirrorX) {
				// Mirror X
				const x = intersect.point.x
				intersect.point.x = x - x * 2
				const position = getIntersectPosition(intersect)

				if(state.selectedVoxel==='block') {
					addVoxel(state, position, selectedMaterial, state.selectedBlock)
				} else {
					addStair(state, position, `oak_stairs[facing=${state.stairFacing},half=${state.stairHalf}]`)
				}
			}
		}
	}

	render()
}

function render() {
	canvas.render(state.scene, camera)
}

const getIntersectPosition = (intersect: THREE.Intersection): THREE.Vector3 => {
	const face = intersect.face as THREE.Face3
	intersect.point.add(face.normal).divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	return intersect.point
}