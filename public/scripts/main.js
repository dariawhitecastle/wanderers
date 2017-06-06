let container
let camera, scene, projector
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
let earthPivot, mercuryPivot, venusPivot, marsPivot, jupiterPivot, saturnPivot, uranusPivot, neptunePivot, plutoPivot

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
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 )
	camera.position.set( 0, 0, 5000 )
	scene = new THREE.Scene()
	projector = new THREE.Projector()
	document.addEventListener('mousedown', onDocumentMouseDown, false)
	window.addEventListener( 'resize', onWindowResize, false )

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
  const light1 = new THREE.AmbientLight(0xffffff, .5)
  scene.add(light1)

	let light	= new THREE.PointLight(0xffffff, .5, 0)
	light.position.set( 0, 0, 0 )
	light.castShadow	= true
	light.shadow.camera.near	= 0.5
	light.shadow.camera.far	= 500
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

	//Spotlight for the sun params (color, intensity, distance, angle, penumbra, decay)
	// Spotlight front
	let spotLight = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight.position.set(2000, 2000, 2000)
	let spotTarget = new THREE.Object3D()
	spotTarget.position.set(0, 0, 0)
	spotLight.target = spotTarget

	scene.add(spotLight)
	scene.add(new THREE.PointLightHelper(spotLight, 1))
	//SpotLight back
	let spotLight2 = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight2.position.set(-2000, -2000, -2000)
	spotLight2.target = spotTarget

	scene.add(spotLight2)
	scene.add(new THREE.PointLightHelper(spotLight2, 1))
	//SpotLight left-top
	let spotLight3 = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight3.position.set(-5000, 3000, 2000)
	spotLight3.target = spotTarget

	scene.add(spotLight3)
	scene.add(new THREE.PointLightHelper(spotLight3, 1))
	//SpotLight right-bottom
	let spotLight4 = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight4.position.set(2000, -2000, 2000)
	spotLight4.target = spotTarget

	scene.add(spotLight4)
	scene.add(new THREE.PointLightHelper(spotLight4, 1))

	//SpotLight right-top-
	let spotLight5 = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight5.position.set(2000, 2000, -2000)
	spotLight5.target = spotTarget

	scene.add(spotLight5)
	scene.add(new THREE.PointLightHelper(spotLight5, 1))
	//SpotLight left-bottom-back
	let spotLight6 = new THREE.SpotLight( 0xffffff, 1, 0, 0.3, 0.2, 1 )
	spotLight6.position.set(-2000, -2000, 2000)
	spotLight6.target = spotTarget

	scene.add(spotLight6)
	scene.add(new THREE.PointLightHelper(spotLight6, 1))

	let textureLoader = new THREE.TextureLoader()

	// earth
  let earthgeo = new THREE.SphereGeometry( 25, 32, 32 )
  let earthmat = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('../assets/earth_atmos.jpg'),
    specularMap: textureLoader.load('../assets/specularmap.jpg'),
    bumpMap: textureLoader.load('../assets/earth_normal_2048.jpg'),
    bumpScale: 10
  })

	// clouds
  let cloudsgeo = new THREE.SphereGeometry( 25.5, 32, 32 )
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

	// add atmospheric glow
	var geometry	= new THREE.SphereGeometry(900, 32, 32)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0xefaf26)
	material.uniforms.coeficient.value	= .8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.01)
	solarSys.sun.add( mesh )
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)
	var geometry	= new THREE.SphereGeometry(900, 32, 32)
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
	mercuryGroup.position.x = 1200
	mercuryGroup.position.z = 600
	mercuryGroup.add(solarSys.mercury)
	mercuryPivot.add(mercuryGroup)

	//VENUS
	venusPivot = new THREE.Object3D()
	scene.add(venusPivot)
	solarSys.venus = THREEx.Planets.createVenus()
	venusGroup.position.x = 1450
	venusGroup.position.z = 800
	venusGroup.add(solarSys.venus)
	venusPivot.add(venusGroup)

	//EARTH radius 3,959mi
	earthPivot = new THREE.Object3D()
	scene.add(earthPivot)
	solarSys.earth.receiveShadow = true
  solarSys.earth = new THREE.Mesh(earthgeo, earthmat)
	earthGroup.position.x = 1750
	earthGroup.position.z = 950
	earthGroup.add(solarSys.earth)
	earthPivot.add(earthGroup)

	let cloudsPivot = new THREE.Object3D()
  solarSys.clouds = new THREE.Mesh(cloudsgeo, cloudsmat)
	earthGroup.add(solarSys.clouds)

	//add atmospheric glow
	var geometry	= new THREE.SphereGeometry(25, 32, 32)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0x83eff7)
	material.uniforms.coeficient.value	= 0.8 // opacity
	material.uniforms.power.value		= 1.8
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.01) //outer radius of glow
	solarSys.earth.add( mesh )
	var geometry	= new THREE.SphereGeometry(25, 32, 32)
	var material	= createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x83eff7)
	material.uniforms.coeficient.value	= 0.3 // opacity
	material.uniforms.power.value		= 5
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.04) // outer radius of back glow
	solarSys.earth.add( mesh )

	// LUNA radius 1,079mi
	solarSys.moon = THREEx.Planets.createMoon()
	let moonPivot = new THREE.Object3D()
	solarSys.moon.castShadow = true
	solarSys.moon.receiveShadow = true
	solarSys.earth.add(moonPivot)
	moonPivot.position.x = 50
	moonPivot.add(solarSys.moon)

	//MARS
	marsPivot = new THREE.Object3D()
	scene.add(marsPivot)
	solarSys.mars = THREEx.Planets.createMars()
	solarSys.mars.castShadow = true
	solarSys.mars.receiveShadow = false
	marsGroup.position.x = 1900
	marsGroup.position.z = 1100
	marsGroup.add(solarSys.mars)
	marsPivot.add(marsGroup)

	//JUPITER
	jupiterPivot = new THREE.Object3D()
	scene.add(jupiterPivot)
	solarSys.jupiter = THREEx.Planets.createJupiter()
	jupiterGroup.position.x = 2400
	jupiterGroup.position.z = 1300
	jupiterGroup.add(solarSys.jupiter)
	jupiterPivot.add(jupiterGroup)

	//JUPITER's CALLISTO
	solarSys.callisto = new THREE.Mesh(callistogeo, callistomat)
	let callistoPivot = new THREE.Object3D()
	jupiterGroup.add(callistoPivot)
	callistoPivot.position.x = 370
	callistoPivot.position.y = 0
	callistoPivot.add(solarSys.callisto)
	solarSys.callisto.castShadow = true
	solarSys.callisto.receiveShadow = false

	//JUPITER's GANYMEDE
	solarSys.ganymede = new THREE.Mesh(ganymedegeo, ganymedemat)
	let ganymedePivot = new THREE.Object3D()
	jupiterGroup.add(ganymedePivot)
	ganymedePivot.position.x = 450
	ganymedePivot.position.y = 50
	ganymedePivot.add(solarSys.ganymede)
	solarSys.ganymede.castShadow = true
	solarSys.ganymede.receiveShadow = false

	//JUPITER's IO
	solarSys.io = new THREE.Mesh(iogeo, iomat)
	let ioPivot = new THREE.Object3D()
	jupiterGroup.add(ioPivot)
	ioPivot.position.x = 470
	ioPivot.position.y = 100
	ioPivot.add(solarSys.io)
	solarSys.io.castShadow = true
	solarSys.io.receiveShadow = false

	//JUPITER's EUROPA
	solarSys.europa = new THREE.Mesh(europageo, europamat)
	let europaPivot = new THREE.Object3D()
	jupiterGroup.add(europaPivot)
	europaPivot.position.x = 470
	europaPivot.position.z = 150
	europaPivot.add(solarSys.europa)
	solarSys.europa.castShadow = true
	solarSys.europa.receiveShadow = false

	// Saturn and rings
	saturnPivot = new THREE.Object3D()
	scene.add(saturnPivot)
	solarSys.saturn = THREEx.Planets.createSaturn()
	saturnGroup.position.x = 3500
	saturnGroup.position.z = 1700
	saturnPivot.add(saturnGroup)
	saturnGroup.add(solarSys.saturn)

	let saturnRingsPivot = new THREE.Object3D()
	saturnPivot.add(saturnRingsPivot)
	solarSys.saturnRings = THREEx.Planets.createSaturnRing()
	saturnRingsPivot.add(solarSys.saturnRings)
	saturnGroup.add(solarSys.saturnRings)

	// Saturn moon TITAN
	solarSys.titan = new THREE.Mesh(titangeo, titanmat)
	let titanPivot = new THREE.Object3D()
	saturnGroup.add(titanPivot)
	titanPivot.position.x = 370
	titanPivot.position.y = 0
	titanPivot.add(solarSys.titan)
	solarSys.titan.castShadow = true
	solarSys.titan.receiveShadow = false

	var geometry	= new THREE.SphereGeometry(11, 32, 32)
	var material	= createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0xea94f7)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 1.0
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.0)
	solarSys.titan.add( mesh )
	var geometry	= new THREE.SphereGeometry(11, 32, 32)
	var material	= createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xea94f7)
	material.uniforms.coeficient.value	= 0.3
	material.uniforms.power.value		= 8.3
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.scale.multiplyScalar(1.01)
	solarSys.titan.add( mesh )
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)


	// Uranus
	uranusPivot = new THREE.Object3D()
	scene.add(uranusPivot)
	solarSys.uranus = THREEx.Planets.createUranus()
	uranusGroup.position.x = 4200
	uranusGroup.position.z = 2000
	uranusPivot.add(uranusGroup)
	uranusGroup.add(solarSys.uranus)

	let uranusRingsPivot = new THREE.Object3D()
	uranusPivot.add(uranusRingsPivot)
	solarSys.uranusRings = THREEx.Planets.createUranusRing()
	uranusRingsPivot.add(solarSys.uranusRings)
	uranusGroup.add(solarSys.uranusRings)

	// Neptune
	neptunePivot = new THREE.Object3D()
	scene.add(neptunePivot)
	solarSys.neptune = THREEx.Planets.createNeptune()
	neptuneGroup.position.x = 4800
	neptuneGroup.position.z = 2300
	neptunePivot.add(neptuneGroup)
	neptuneGroup.add(solarSys.neptue)

	// Pluto
	plutoPivot = new THREE.Object3D()
	scene.add(plutoPivot)
	solarSys.pluto = THREEx.Planets.createPluto()
	plutoGroup.position.x = 5000
	plutoGroup.position.z = 2600
	plutoPivot.add(plutoGroup)
	plutoGroup.add(solarSys.pluto)

	//Starfield
	solarSys.starfield = THREEx.Planets.createStarfield()

 scene.add(solarSys.starfield)

}

let solarSysControls =  new THREE.OrbitControls(camera, renderer.domElement)
function onDocumentMouseDown(event) {

	if (event.target !== renderer.domElement) {
		return
	}
  let vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5)
	let raycaster = new THREE.Raycaster()
	raycaster.setFromCamera(vector, camera)

	let intersects = raycaster.intersectObjects([solarSys.sun, solarSys.mercury, solarSys.venus, solarSys.earth, solarSys.mars, solarSys.jupiter, solarSys.saturn, solarSys.uranus, solarSys.neptune, solarSys.pluto, solarSys.callisto, solarSys.io, solarSys.europa, solarSys.ganymede, solarSys.titan], true)

	if (intersects.length > 0) {

		if (camera.parent) {
			camera.parent.remove(camera)
		}

		if (intersects[0].object.geometry.parameters.radius < 100) {
			let zIndex = intersects[0].object.geometry.parameters.radius+((intersects[0].object.geometry.parameters.radius)*0.1)
			let xIndex = intersects[0].object.position.x - ((intersects[0].object.geometry.parameters.radius)*1.5)
			// let xIndex = -500
			console.log(intersects[0].object.geometry.parameters.radius);
		}
		let xIndex = intersects[0].object.position.x - ((intersects[0].object.geometry.parameters.radius)*2)
		let yIndex = intersects[0].object.position.y
		let zIndex = intersects[0].object.geometry.parameters.radius+((intersects[0].object.geometry.parameters.radius)*2)
		camera.position.set(xIndex,yIndex,zIndex)
		// camera.lookAt(intersects[0].object)
		// let target = {x: xIndex, y: yIndex, z: zIndex}
		// let tween = new TWEEN.Tween(position)
		// .to(target, 2000)
		// .easing(TWEEN.Easing.Linear.None)
		// .onUpdate(function() {
		// 	console.log("hello")
		// 	camera.position.set(target)
		// })
		// .onComplete(function() {
		// console.log("hello")
    // camera.position.set(target)
		// })
		// .start()

		intersects[0].object.parent.add(camera)
		solarSysControls.minDistance = intersects[0].object.geometry.parameters.radius+50
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

	camera.lookAt( scene.position )
	solarSys.callisto.rotation.y -= 0.007
	solarSys.europa.rotation.y -= 0.002
	solarSys.io.rotation.y -= 0.001
	solarSys.ganymede.rotation.y -= 0.01
	sunGroup.rotation.y -= 1/24.47*0.001*(-1)
	// solarSys.starfield.rotation.y -= 0.0001
	mercuryGroup.rotation.y -= 1/58*0.001*(-1)
	mercuryPivot.rotation.y -=365/88*0.001*(-1)
	venusGroup.rotation.y -= 1/116*0.001
	venusPivot.rotation.y -= 365/225*0.001*(-1)
	earthGroup.rotation.y -= 0.001*(-1)
	earthPivot.rotation.y -= 0.001*(-1)
	marsGroup.rotation.y -= 0.001*(-1)
	marsPivot.rotation.y -= 365/687*0.001*(-1)
	jupiterGroup.rotation.y -= 1/0.5*0.001*(-1)
	jupiterPivot.rotation.y -= 365/4300*0.001*(-1)
	solarSys.saturn.rotation.y -= 1/0.5*0.001*(-1)
	saturnPivot.rotation.y -= 365/11000*0.001*(-1)
	uranusGroup.rotation.y -= 1/0.8*0.001
	uranusPivot.rotation.y -= 365/31000*0.001*(-1)
	neptuneGroup.rotation.y -=1/0.7*0.001*(-1)
	neptunePivot.rotation.y -=365/60200*0.001*(-1)
	plutoGroup.rotation.y -=1/6*0.001*(-1)
	plutoPivot.rotation.y -=365/90155*0.001*(-1)
	renderer.render( scene, camera )

}
