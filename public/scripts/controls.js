let solarSysControls
function initializeControls(camera, element) {

  solarSysControls =  new THREE.OrbitControls(camera, renderer.domElement)
  // solarSysControls = new THREE.FlyControls(camera, element)
  solarSysControls.autoForward = true
  solarSysControls.dragToLook = true
  solarSysControls.movementSpeed = 5
  solarSysControls.rollSpeed = 1

  window.addEventListener('deviceorientation', setOrientationControls, true)
}

function setOrientationControls(e) {

	if (!e.alpha) {
		return
	}
	solarSysControls = new THREE.DeviceOrientationControls(camera, true)
  solarSysControls.autoForward = true
  solarSysControls.movementSpeed = 5
  solarSysControls.connect()
	solarSysControls.update()
	window.removeEventListener('deviceorientation', setOrientationControls, true)
}
