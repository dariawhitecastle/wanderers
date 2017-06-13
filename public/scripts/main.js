let container
let camera, scene, projector, manager, effect, clock
let solarSys = {
	sun: {},
	mercury: {},
	venus: {},
	earth: {},
	clouds: {},
	moon: {},
	mars: {},
	jupiter: {},
	callisto: {},
	europa: {},
	io: {},
	ganymede: {},
	saturn: {},
	saturnRings: {},
	titan: {},
	uranus: {},
	uranusRings: {},
	neptune: {},
	pluto: {},
	starfield: {}
}

let sunGroup, earthGroup, mercuryGroup, venusGroup, marsGroup, jupiterGroup, saturnGroup, uranusGroup, neptuneGroup, plutoGroup
let earthPivot, moonPivot, mercuryPivot, venusPivot, marsPivot, jupiterPivot, callistoPivot, europaPivot, ioPivot, ganymedePivot, saturnPivot, titanPivot, uranusPivot, neptunePivot, plutoPivot

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainCanvas'), antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)
const windowW = window.innerWidth
const windowH= window.innerHeight

init()
animate()

function init() {

	container = document.getElementById( 'mainCanvas' )
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 ) //fov, aspect, near, far
	camera.position.set( 0, 0, 13000 )
	scene = new THREE.Scene()
	// projector = new THREE.Projector()
	effect = new THREE.StereoEffect(renderer)
	effect.eyeSeparation = 10
	effect.setSize( window.innerWidth, window.innerHeight )
 	manager = new WebVRManager(renderer, effect)
	clock = new THREE.Clock()
	document.addEventListener('mousedown', onDocumentMouseDown, false)
	window.addEventListener( 'resize', onWindowResize, false )
	// window.addEventListener('deviceorientation', setOrientationControls, true)
	initializeControls(camera, renderer.domElement)

	// mobileMode = checkForMobile()


	// GROUPS
	sunGroup = new THREE.Group()
	scene.add(sunGroup)
	mercuryGroup = new THREE.Group()
	scene.add(mercuryGroup)
	venusGroup = new THREE.Group()
	scene.add(venusGroup)
	earthGroup = new THREE.Group()
	scene.add(earthGroup)
	marsGroup = new THREE.Group()
	scene.add(marsGroup)
	jupiterGroup = new THREE.Group()
	scene.add(jupiterGroup)
	saturnGroup = new THREE.Group()
	scene.add(saturnGroup)
	uranusGroup = new THREE.Group()
	scene.add(uranusGroup)
	neptuneGroup = new THREE.Group()
	scene.add(neptuneGroup)
	plutoGroup = new THREE.Group()
	scene.add(plutoGroup)


	//LIGHTS
  const light1 = new THREE.AmbientLight(0xffffff, .8)
  scene.add(light1)

	let light	= new THREE.PointLight(0xffffff, 0.6, 0)
	light.position.set( 0, 0, 0 )
	light.castShadow	= true
	light.shadow.camera.near	= 0.5
	light.shadow.camera.far	= 1000
	light.shadow.camera.fov	= 90
	light.shadow.camera.left	= -1
	light.shadow.camera.right	=  1
	light.shadow.camera.top	=  1
	light.shadow.camera.bottom= -1
	// light.shadowCameraVisible	= true
	light.shadow.bias	= 0.01
	light.shadow.mapSize.width	= 1024
	light.shadow.mapSize.height	= 1024
	scene.add( light )

	let spotTarget = new THREE.Object3D()
	spotTarget.position.set(0, 0, 0)
	//Spotlight for the sun params (color, intensity, distance, angle, penumbra, decay)
	// Spotlight front
	function newSpotLight(x, y, z) {

		let spotLight = new THREE.SpotLight( 0xffffff, 1.5, 7000, 1, 0, 1 )
		spotLight.position.set(x, y, z)
		spotLight.target = spotTarget
		scene.add(spotLight)
		// scene.add(new THREE.SpotLightHelper(spotLight))
	}

	newSpotLight(2500, 2500, -2500)
	newSpotLight(2500, 2500, 2500)
	newSpotLight(2500, -2500, -2500)
	newSpotLight(2300, -2300, 3000)
	newSpotLight(-2500, 2500, -2500)
	newSpotLight(-2500, 2500, 2500)
	newSpotLight(-2500, -2500, -2500)
	newSpotLight(-2500, -2500, 2200)

	let textureLoader = new THREE.TextureLoader()

	// earth
  let earthgeo = new THREE.SphereGeometry( 25, 40, 40 )
  let earthmat = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('../assets/earth_atmos.jpg'),
    specularMap: textureLoader.load('../assets/specularmap.jpg'),
    bumpMap: textureLoader.load('../assets/earth_normal_2048.jpg'),
    bumpScale: 10
  })

	// clouds
  let cloudsgeo = new THREE.SphereGeometry( 25.5, 40, 40 )
  let cloudsmat = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('../assets/earth_clouds_2048.png'),
    opacity: 0.8,
    transparent: true,
    depthWrite: false
  })

	//JUPITER moons
	// callisto radius 1,498mi, 1,170,000mi from Jupiter
	let callistogeo = new THREE.SphereGeometry(9.62, 32, 32)
	let callistomat = new THREE.MeshPhongMaterial({
		map: textureLoader.load('../assets/callisto.jpg'),
		bumpMap: textureLoader.load('../assets/CallistoNormal.png'),
		bumpScale: 5
	})

	//ganymede radius 1,635mi, 665,000mi from Jupiter
	let ganymedegeo = new THREE.SphereGeometry(9.62, 32, 32)
	let ganymedemat = new THREE.MeshPhongMaterial({
		map: textureLoader.load('../assets/ganymede.jpg'),
		bumpMap: textureLoader.load('../assets/ganymede.jpg'),
		bumpScale: 7
	})

	//europa radius 800mi, 414,000 miles from Jupiter
	let europageo = new THREE.SphereGeometry(9.62, 32, 32)
	let europamat = new THREE.MeshPhongMaterial({
		map: textureLoader.load('../assets/europa1_out.jpg'),
		bumpMap: textureLoader.load('../assets/europa1_out.jpg'),
		bumpScale: 6
	})

	//io radius 1,131mi, 262,000 mi from Jupiter
	let iogeo = new THREE.SphereGeometry(9.62, 32, 32)
	let iomat = new THREE.MeshPhongMaterial({
		map: textureLoader.load('../assets/io.png'),
		bumpMap: textureLoader.load('../assets/io.png'),
		bumpScale: 6
	})

	//SATURN MOON
	//Titan radius 1,600mi, 759,220 miles from Saturn,
	let titangeo = new THREE.SphereGeometry(10.62, 32, 32)
	let titanmat = new THREE.MeshPhongMaterial({
		map: textureLoader.load('../assets/Titan.png'),
		bumpMap: textureLoader.load('../assets/Titan.png'),
		bumpScale: 6
	})

	// sun
	solarSys.sun = THREEx.Planets.createSun()
	solarSys.sun.name = 'sun'

	// add atmospheric glow
	var geometry	= new THREE.SphereGeometry(2500, 32, 32)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0xefaf26)
	material.uniforms.coeficient.value	= .8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.01)
	solarSys.sun.add( mesh )
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)
	var geometry	= new THREE.SphereGeometry(2500, 32, 32)
	var material	= createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xefaf26)
	material.uniforms.coeficient.value	= 0.4
	material.uniforms.power.value		= 8.2
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.3)
	solarSys.sun.add( mesh )
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)
	sunGroup.add(solarSys.sun)


	// planets and positions

	//MERCURY
	mercuryPivot = new THREE.Object3D()
	scene.add(mercuryPivot)
  solarSys.mercury = THREEx.Planets.createMercury()
	mercuryGroup.position.x = 4000
	mercuryGroup.position.z = 600
	mercuryGroup.add(solarSys.mercury)
	mercuryPivot.add(mercuryGroup)
	solarSys.mercury.name = 'mercury'

	//VENUS
	venusPivot = new THREE.Object3D()
	scene.add(venusPivot)
	solarSys.venus = THREEx.Planets.createVenus()
	venusGroup.position.x = 4700
	venusGroup.position.z = 800
	venusGroup.add(solarSys.venus)
	venusPivot.add(venusGroup)
	solarSys.venus.name = 'venus'

	//EARTH radius 3,959mi
	earthPivot = new THREE.Object3D()
	scene.add(earthPivot)
	solarSys.earth.receiveShadow = true
  solarSys.earth = new THREE.Mesh(earthgeo, earthmat)
	earthGroup.position.x = 6000
	earthGroup.position.z = 950
	earthGroup.add(solarSys.earth)
	earthPivot.add(earthGroup)
	solarSys.earth.name = 'earth'

	let cloudsPivot = new THREE.Object3D()
  solarSys.clouds = new THREE.Mesh(cloudsgeo, cloudsmat)
	solarSys.earth.add(solarSys.clouds)

	//add atmospheric glow
	var geometry	= new THREE.SphereGeometry(25, 40, 40)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0x4fb4ef)
	material.uniforms.coeficient.value	= 0.8 // opacity
	material.uniforms.power.value		= 1.3
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.01) //outer radius of glow
	solarSys.earth.add( mesh )
	var geometry	= new THREE.SphereGeometry(25, 40, 40)
	var material	= createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x4fb4ef)
	material.uniforms.coeficient.value	= 0.3 // opacity
	material.uniforms.power.value		= 5.2
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.02) // outer radius of back glow
	solarSys.earth.add( mesh )

	// LUNA radius 1,079mi
	solarSys.moon = THREEx.Planets.createMoon()
	moonPivot = new THREE.Object3D()
	solarSys.moon.castShadow = true
	solarSys.moon.receiveShadow = true
	earthGroup.add(moonPivot)
	solarSys.moon.position.x = 50
	moonPivot.add(solarSys.moon)
	// earthGroup.add(moonPivot)
	solarSys.moon.name = 'moon'

	// MARS
	marsPivot = new THREE.Object3D()
	scene.add(marsPivot)
	solarSys.mars = THREEx.Planets.createMars()
	solarSys.mars.castShadow = true
	solarSys.mars.receiveShadow = false
	marsGroup.position.x = 6800
	marsGroup.position.z = 1100
	marsGroup.add(solarSys.mars)
	marsPivot.add(marsGroup)
	solarSys.mars.name = 'mars'

	//JUPITER
	jupiterPivot = new THREE.Object3D()
	scene.add(jupiterPivot)
	solarSys.jupiter = THREEx.Planets.createJupiter()
	jupiterGroup.position.x = 7400
	jupiterGroup.position.z = 1300
	jupiterGroup.add(solarSys.jupiter)
	jupiterPivot.add(jupiterGroup)
	solarSys.jupiter.name = 'jupiter'

	//JUPITER's CALLISTO
	solarSys.callisto = new THREE.Mesh(callistogeo, callistomat)
	callistoPivot = new THREE.Object3D()
	jupiterGroup.add(callistoPivot)
	solarSys.callisto.position.x = 370
	solarSys.callisto.position.y = 0
	callistoPivot.add(solarSys.callisto)
	solarSys.callisto.castShadow = true
	solarSys.callisto.receiveShadow = false
	solarSys.callisto.name = 'callisto'

	//JUPITER's GANYMEDE
	solarSys.ganymede = new THREE.Mesh(ganymedegeo, ganymedemat)
	ganymedePivot = new THREE.Object3D()
	jupiterGroup.add(ganymedePivot)
	solarSys.ganymede.position.x = 450
	solarSys.ganymede.position.y = 50
	ganymedePivot.add(solarSys.ganymede)
	solarSys.ganymede.castShadow = true
	solarSys.ganymede.receiveShadow = false
	solarSys.ganymede.name = 'ganymede'

	//JUPITER's IO
	solarSys.io = new THREE.Mesh(iogeo, iomat)
	ioPivot = new THREE.Object3D()
	jupiterGroup.add(ioPivot)
	solarSys.io.position.x = 470
	solarSys.io.position.y = 100
	ioPivot.add(solarSys.io)
	solarSys.io.castShadow = true
	solarSys.io.receiveShadow = false
	solarSys.io.name = 'io'

	//JUPITER's EUROPA
	solarSys.europa = new THREE.Mesh(europageo, europamat)
	europaPivot = new THREE.Object3D()
	jupiterGroup.add(europaPivot)
	europaPivot.position.x = 470
	europaPivot.position.z = 150
	europaPivot.add(solarSys.europa)
	solarSys.europa.castShadow = true
	solarSys.europa.receiveShadow = false
	solarSys.europa.name = 'europa'

	// Saturn and rings
	saturnPivot = new THREE.Object3D()
	scene.add(saturnPivot)
	solarSys.saturn = THREEx.Planets.createSaturn()
	saturnGroup.position.x = 8200
	saturnGroup.position.z = 1700
	saturnPivot.add(saturnGroup)
	saturnGroup.add(solarSys.saturn)
	solarSys.saturn.name = 'saturn'

	let saturnRingsPivot = new THREE.Object3D()
	saturnPivot.add(saturnRingsPivot)
	solarSys.saturnRings = THREEx.Planets.createSaturnRing()
	saturnRingsPivot.add(solarSys.saturnRings)
	saturnGroup.add(solarSys.saturnRings)

	// Saturn moon TITAN
	solarSys.titan = new THREE.Mesh(titangeo, titanmat)
	titanPivot = new THREE.Object3D()
	saturnGroup.add(titanPivot)
	solarSys.titan.position.x = -450
	solarSys.titan.position.z = 400
	titanPivot.add(solarSys.titan)
	solarSys.titan.castShadow = true
	solarSys.titan.receiveShadow = false
	solarSys.titan.name = 'titan'

	var geometry	= new THREE.SphereGeometry(11, 32, 32)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0x6ded8a)
	material.uniforms.coeficient.value	= 0.3 // opacity
	material.uniforms.power.value		= 2.5 // intensity
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.3) // outer r
	solarSys.titan.add( mesh )
	var geometry	= new THREE.SphereGeometry(11, 32, 32)
	var material	= createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x47ed9f)
	material.uniforms.coeficient.value	= 0.1 // opacity
	material.uniforms.power.value		= 7.3 // intensity
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.4) // outer r
	solarSys.titan.add( mesh )
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)


	// Uranus
	uranusPivot = new THREE.Object3D()
	scene.add(uranusPivot)
	solarSys.uranus = THREEx.Planets.createUranus()
	uranusGroup.position.x = 9000
	uranusGroup.position.z = 2000
	uranusPivot.add(uranusGroup)
	uranusGroup.add(solarSys.uranus)
	solarSys.uranus.name = 'uranus'

	let uranusRingsPivot = new THREE.Object3D()
	uranusPivot.add(uranusRingsPivot)
	solarSys.uranusRings = THREEx.Planets.createUranusRing()
	uranusRingsPivot.add(solarSys.uranusRings)
	uranusGroup.add(solarSys.uranusRings)

	// Neptune
	neptunePivot = new THREE.Object3D()
	scene.add(neptunePivot)
	solarSys.neptune = THREEx.Planets.createNeptune()
	neptuneGroup.position.x = 9700
	neptuneGroup.position.z = 2300
	neptunePivot.add(neptuneGroup)
	neptuneGroup.add(solarSys.neptune)
	solarSys.neptune.name = 'neptune'

	// Pluto
	plutoPivot = new THREE.Object3D()
	scene.add(plutoPivot)
	solarSys.pluto = THREEx.Planets.createPluto()
	plutoGroup.position.x = 11000
	plutoGroup.position.z = 2600
	plutoPivot.add(plutoGroup)
	plutoGroup.add(solarSys.pluto)
	solarSys.pluto.name = 'pluto'

	//Starfield
	solarSys.starfield = THREEx.Planets.createStarfield()

 scene.add(solarSys.starfield)

}

// let solarSysControls =  new THREE.OrbitControls(camera, renderer.domElement)

function onDocumentMouseDown(event) {

	if (event.target !== renderer.domElement) {
		return
	}
  let vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5)
	let raycaster = new THREE.Raycaster()
	raycaster.setFromCamera(vector, camera)

	let intersects = raycaster.intersectObjects([solarSys.sun, solarSys.mercury, solarSys.venus, solarSys.earth, solarSys.moon, solarSys.mars, solarSys.jupiter, solarSys.saturn, solarSys.uranus, solarSys.neptune, solarSys.pluto, solarSys.callisto, solarSys.io, solarSys.europa, solarSys.ganymede, solarSys.titan], true)

	if (intersects.length > 0) {

		if (camera.parent) {
			camera.parent.remove(camera)
		}

		if (intersects[0].object.geometry.parameters.radius < 100) {
			let xIndex = intersects[0].object.position.x / 50
			let zIndex = intersects[0].object.geometry.parameters.radius * 5
			solarSysControls.minDistance = intersects[0].object.geometry.parameters.radius*1.25
			solarSysControls.maxDistance = 15000-xIndex
		}
		let xIndex = intersects[0].object.position.x / 15
		let yIndex = intersects[0].object.position.y
		let zIndex = intersects[0].object.geometry.parameters.radius * (-3)
		camera.position.set(xIndex,yIndex,zIndex)
		// var objectPos = intersects[0].object.getWorldPosition()
		// var cameraPos = camera.getWorldPosition()
		// var newVector = new THREE.Vector3()
		// newVector.subVectors(objectPos, cameraPos)

		// camera.lookAt(intersects[0].object)
		// let target = intersects[0].object.getWorldPosition()
		// let tween = new TWEEN.Tween(position)
		// .to(target, 2000)
		// .easing(TWEEN.Easing.Linear.None)
		// .onUpdate(function() {
		// 	camera.position.set(target)
		// })
		// .onComplete(function() {
    // camera.position.set(target)
		// })
		// .start()
		// camera.position = newVector
		intersects[0].object.add(camera)
		solarSysControls.minDistance = intersects[0].object.geometry.parameters.radius+50
  }
}

function checkForMobile() {
	try {
		document.createEvent("TouchEvent")
		return true
	} catch(error) {
		return false
	}
}

function animate() {

	requestAnimationFrame(animate)
	render()

}

function onWindowResize(event) {

	renderer.setSize( window.innerWidth, window.innerHeight )
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

}

function render() {

	// Groups rotate the planet's group on its axis
	// Pivots rotate the planet's group around the sun
	// Planet/Moon rotate the planet/moon on it's axis within the group

	camera.lookAt( scene.position )
	sunGroup.rotation.y -= 1/24.47*0.001*(-1)
	mercuryGroup.rotation.y -= 1/58*0.001*(-1)
	mercuryPivot.rotation.y -=365/88*0.001*(-1)

	venusGroup.rotation.y -= 1/116*0.001
	venusPivot.rotation.y -= 365/225*0.001*(-1)

	solarSys.earth.rotation.y -= 0.001*(-1)
	earthPivot.rotation.y -= 0.001*(-1)
	moonPivot.rotation.y -= 1/29*0.001*(-1)

	marsGroup.rotation.y -= 0.001*(-1)
	marsPivot.rotation.y -= 365/687*0.001*(-1)

	jupiterGroup.rotation.y -= 1/0.5*0.001*(-1)
	jupiterPivot.rotation.y -= 365/4300*0.001*(-1)
	callistoPivot.rotation.y -= 1/7*0.001*(-1)
	europaPivot.rotation.y -= 1/3.5*0.001*(-1)
	ioPivot.rotation.y -= 1/1.77*0.001*(-1)
	ganymedePivot.rotation.y -= 1/7*0.001*(-1)

	solarSys.saturn.rotation.y -= 1/0.5*0.001*(-1)
	saturnPivot.rotation.y -= 365/11000*0.001*(-1)
	titanPivot.rotation.y -= 1/16*0.001*(-1)

	uranusGroup.rotation.y -= 1/0.8*0.001
	uranusPivot.rotation.y -= 365/31000*0.001*(-1)
	neptuneGroup.rotation.y -=1/0.7*0.001*(-1)
	neptunePivot.rotation.y -=365/60200*0.001*(-1)
	plutoGroup.rotation.y -=1/6*0.001*(-1)
	plutoPivot.rotation.y -=365/90155*0.001*(-1)

	if(!mobileMode) {
		renderer.render( scene, camera )
	} else {
		// Update the scene through the manager.
		manager.render( scene, camera )
		// document.body.webkitRequestFullscreen() // attach to a click handler
		window.scrollTo(0, 1)
		let delta = clock.getDelta()
	  solarSysControls.update(delta)
		$('.landing').remove()
	}



}
