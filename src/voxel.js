import * as THREE from '../lib/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import {blockNames} from './config.js'
import GUI from './gui/gui.js'

let camera, scene, canvas, controls
let plane
let mouse, raycaster

let rollOverMesh, rollOverMaterial
let cubeGeo, cubeMaterials

let objects = []
let mirrorX = false
let modalOpen = false

let touchTimer, touchTime, touchX, touchY

// Record mouse movement
const mouseMovement = {x: 0, y: 0}

let state = {scene, render, objects, cubeMaterials, mirrorX, modalOpen}

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
	var rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50)
	rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true})
	rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
	rollOverMesh.position.set(9999, 9999, 9999)
	state.scene.add(rollOverMesh)

	cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50)

	// Materials
	state.cubeMaterials = blockNames.reduce((acc, cur) => {
		return {
			...acc,
			[cur]: new THREE.MeshLambertMaterial({
				map: new THREE.TextureLoader().load('textures/' + cur + '.png'),
			}),
		}
	}, {})

	// grid
	var gridHelper = new THREE.GridHelper(1000, 20)
	state.scene.add(gridHelper)

	//
	raycaster = new THREE.Raycaster()
	mouse = new THREE.Vector2()

	var geometry = new THREE.PlaneBufferGeometry(1000, 1000)
	geometry.rotateX(-Math.PI / 2)

	plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}))
	plane.name = 'plane'
	state.scene.add(plane)
	state.objects.push(plane)

	// lights
	var ambientLight = new THREE.AmbientLight(0x606060)
	state.scene.add(ambientLight)

	var directionalLight = new THREE.DirectionalLight(0xffffff)
	directionalLight.position.set(1, 0.75, 0.5).normalize()
	state.scene.add(directionalLight)

	// Canvas
	canvas = new THREE.WebGLRenderer({antialias: true})
	canvas.setPixelRatio(window.devicePixelRatio)
	canvas.setSize(window.innerWidth, window.innerHeight)

	// Camera
	controls = new OrbitControls(camera, canvas.domElement)
	controls.update()
	controls.addEventListener('change', render)

	document.querySelector('#canvas').appendChild(canvas.domElement)

	// Events
	document.addEventListener('mousemove', onDocumentMouseMove)
	document.addEventListener('mouseup', onDocumentMouseUp)
	document.addEventListener('mousedown', onDocumentMouseDown, {passive: false})
	document.addEventListener('touchstart', onDocumentTouchStart, {passive: false})
	document.addEventListener('touchend', onDocumentMouseUp, false)
	// document.addEventListener('keydown', onDocumentKeyDown)

	window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	canvas.setSize(window.innerWidth, window.innerHeight)
}

function recordStartPosition(event) {
	mouseMovement.x = event.clientX
	mouseMovement.y = event.clientY
	mouseMovement.moveX = 0
	mouseMovement.moveY = 0
}

function recordMovement(event) {
	const clientX = event.clientX
	const clientY = event.clientY
	mouseMovement.moveX += Math.abs(mouseMovement.x - clientX)
	mouseMovement.moveY += Math.abs(mouseMovement.y - clientY)
}

function onDocumentTouchStart(event) {
	touchTime = 0
	touchTimer = setInterval(() => {
		touchTime += 1
	}, 1)
	const target = (!!event.targetTouches && event.targetTouches[0]) || {}
	touchX = target.clientX
	touchY = target.clientY
}

function onDocumentMouseDown(event) {
	event.preventDefault() // prevent scrolling
	recordStartPosition(event)
	window.addEventListener('mousemove', recordMovement)
}

function onDocumentMouseMove(event) {
	event.preventDefault()

	const {clientX, clientY} = event
	const {innerWidth, innerHeight} = window
	mouse.set((clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1)

	raycaster.setFromCamera(mouse, camera)

	var intersects = raycaster.intersectObjects(objects)

	if (intersects.length > 0) {
		var intersect = intersects[0]
		rollOverMesh.position.copy(intersect.point).add(intersect.face.normal)
		rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	}

	render()
}

function onDocumentMouseUp(event) {
	event.preventDefault()

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
	var intersects = raycaster.intersectObjects(objects)

	if (intersects.length > 0) {
		// GET MIRROR
		const doMirrorX = state.mirrorX
		const intersect = intersects[0]

		// delete cube
		if (event.button === 2) {
			if (intersect.object !== plane) {
				state.scene.remove(intersect.object)
				state.objects.splice(state.objects.indexOf(intersect.object), 1)
			}
		} else {
			// GET MATERIAL
			const selectedMaterial = document.querySelector('#GUISelectedBlock').value
			// create cube
			createVoxel(cubeGeo, intersect, state.cubeMaterials[selectedMaterial], selectedMaterial)

			if (doMirrorX) {
				// Mirror X
				const x = intersect.point.x
				intersect.point.x = x - x * 2
				createVoxel(cubeGeo, intersect, state.cubeMaterials[selectedMaterial], selectedMaterial)
			}
		}
	}

	render()
}

const createVoxel = (geo, intersect, material, name) => {
	var voxel = new THREE.Mesh(geo, material)
	voxel.position.copy(intersect.point).add(intersect.face.normal)
	voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
	voxel.name = name
	state.scene.add(voxel)
	state.objects.push(voxel)
}

function render() {
	canvas.render(state.scene, camera)
}
