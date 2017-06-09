var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)

function createPlanetDataObjects(planetData) {

  Object.keys(solarSys).forEach(key => {
    let name = key.substr(0,1).toUpperCase() + key.substr(1)
    planetData.forEach(planet => {
      if (name === planet.name) {
        solarSys[key]['num_moons'] = planet.num_moons,
        solarSys[key]['moon_name'] = planet.moon_name,
        solarSys[key]['orbit_period'] =  planet.orbit_period,
        solarSys[key]['low_temp'] = planet.low_temp,
        solarSys[key]['hi_temp'] = planet.hi_temp,
        solarSys[key]['facts'] = planet.facts,
        solarSys[key]['link'] = planet.link
      }
    })
  })
  return solarSys
}

$.ajax({
  url: '/data',
  method: 'GET'
})
.done( planetData => {
  createPlanetDataObjects(planetData)
  // $('[data-planet]').click(() => {
  //   var planetData = solarSys[this.dataset.planet]
  //   renderPlanetData
  //
  // })
})

Object.keys(solarSys).forEach(key => {
  var planet = solarSys[key]
  domEvents.addEventListener(planet, 'mousedown', function(event) {

    $('.planetInfo').append(
      `<h5 class="planetHeader">You are currently on planet ${planet.name}</h5>
      <div class="divider"></div>
      <h6 class="planetMoons">Number of moons: ${planet.num_moons}</h6>
      <h6 class="moon names">Moons: ${planet.moon_name}</h6>
      <h6 class="planetOrbit">Orbit Period: ${planet.orbit_period} Earth Days</h6>
      <h6 class="planetTemp">Surface temprature: ${planet.low_temp}F to ${planet.hi_temp}F</h6>
      <div class="divider"></div>
      <ul class="planetFact">
        <li><p>The Earth’s rotation is gradually slowing.
          This deceleration is happening almost imperceptibly, at approximately 17 milliseconds per hundred years, although the rate at which it occurs is not perfectly uniform. This has the effect of lengthening our days, but it happens so slowly that it could be as much as 140 million years before the length of a day will have increased to 25 hours.</p></li>
        <li><p>There is only one natural satellite of the planet Earth.
          As a percentage of the size of the body it orbits, the Moon is the largest satellite of any planet in our solar system. In real terms, however, it is only the fifth largest natural satellite.</p></li>
        <li><p>The Earth is the densest planet in the Solar System.
          This varies according to the part of the planet; for example, the metallic core is denser than the crust. The average density of the Earth is approximately 5.52 grams per cubic centimetre.</p></li>
      </ul>
      <a class="link" href=${planet.link}>Tell me more!</a>
      `
    )
    $('.planetInfo').removeClass('animated fadeOutLeft')
    $('.planetInfo').addClass('animated fadeInLeft')
  }, false)
})

$('.closeInfo').click((event) => {
  event.stopPropagation()
  $('.planetInfo').addClass('animated fadeOutLeft')
})
