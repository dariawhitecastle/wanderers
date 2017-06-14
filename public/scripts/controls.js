let solarSysControls
let mobileMode = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Nexus/i.test(navigator.userAgent);

function initializeControls(camera, element) {

  if (mobileMode) {
    // solarSysControls = new THREE.DeviceOrientationControls( camera, element )
    solarSysControls = new THREE.FlyControls(camera, element)
    solarSysControls.autoForward = false
    solarSysControls.dragToLook = true
    solarSysControls.movementSpeed = 10
    solarSysControls.rollSpeed = 10
    window.addEventListener('deviceorientation', setOrientationControls, true)
    console.log("is Mobile!");
	} else {
    // WASD-style movement controls
    solarSysControls = new THREE.OrbitControls(camera, element)
    window.addEventListener('deviceorientation', setOrientationControls, true)
    console.log("is not Mobile!")
  }
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
	// window.removeEventListener('deviceorientation', setOrientationControls, true)
}
