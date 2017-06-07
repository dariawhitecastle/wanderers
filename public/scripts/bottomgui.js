$('.solarSys').click(() => {
  camera.position.set( 0, 0, 5000 )
  scene.add(camera)
})

$('.sun').click(() => {
  var xIndex = sunGroup.position.x/15
  var zIndex = solarSys.sun.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  sunGroup.add(camera)
})

$('.mercury').click(() => {
  var xIndex = mercuryGroup.position.x/15
  var zIndex = solarSys.mercury.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  mercuryGroup.add(camera)
})

$('.venus').click(() => {
  var xIndex = venusGroup.position.x/15
  var zIndex = solarSys.venus.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  venusGroup.add(camera)
})

$('.earth').click(() => {
  var xIndex = earthGroup.position.x/15
  var zIndex = solarSys.earth.geometry.parameters.radius * (-3)
  // zoomFactor = need to calculate the vector from camera to object

  // var center = solarSys.earth.position;
  // var radius = solarSys.earth.radius;
  // var zoomVector = center.distanceTo(camera.position) - radius*1.5;
  // // var zoomFactor = 2 * Math.atan(realHeight * control.correctForDepth / ( 2 * distance )) * ( 180 / Math.PI );
  //
  // camera.zoom = 200;
  // camera.updateProjectionMatrix();
  // console.log(camera.position);
  camera.position.set(xIndex, 0, zIndex)
  earthGroup.add(camera)
})

$('.mars').click(() => {
  var xIndex = marsGroup.position.x/15
  var zIndex = solarSys.mars.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  marsGroup.add(camera)
})

$('.jupiter').click(() => {
  var xIndex = jupiterGroup.position.x/15
  var zIndex = solarSys.jupiter.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  jupiterGroup.add(camera)
})

$('.saturn').click(() => {
  var xIndex = saturnGroup.position.x/15
  var zIndex = solarSys.saturn.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  saturnGroup.add(camera)
})

$('.uranus').click(() => {
  var xIndex = uranusGroup.position.x/15
  var zIndex = solarSys.uranus.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  uranusGroup.add(camera)
})

$('.neptune').click(() => {
  var xIndex = neptuneGroup.position.x/15
  var zIndex = solarSys.neptune.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  neptuneGroup.add(camera)
})

$('.pluto').click(() => {
  var xIndex = plutoGroup.position.x/15
  var zIndex = solarSys.pluto.geometry.parameters.radius * (-3)
  camera.position.set(xIndex, 0, zIndex)
  plutoGroup.add(camera)
})
