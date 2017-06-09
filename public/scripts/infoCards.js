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

function appendData(solarSys) {

  Object.keys(solarSys).forEach(key => {
    var planet = solarSys[key]
    domEvents.addEventListener(planet, 'mousedown', function(event) {
      if (planet.name === key) {
        if($('.info')) {
          $('.info').remove()
        }
        console.log(planet.name, key, planet.facts);
        $('.planetInfo').append(
          `<div class="info"><h5 class="planetHeader">You are currently on planet ${planet.name}</h5>
          <div class="divider"></div>
          <h6 class="planetMoons">Number of moons: ${planet.num_moons}</h6>
          <h6 class="moon names">Moons: ${planet.moon_name}</h6>
          <h6 class="planetOrbit">Orbit Period: ${planet.orbit_period} Earth Days</h6>
          <h6 class="planetTemp">Surface temprature: ${planet.low_temp}F to ${planet.hi_temp}F</h6>
          <div class="divider"></div>
          <ul class="planetFact">
            <li><p>${planet.facts}</p></li>
            <li><a class="link" href="${planet.link}">Tell me more!</a></li>
          </ul>
          <a class="waves-effect waves-light btn closeInfo">Close</a>
        </div>`
        )
        $('.closeInfo').click((event) => {
          event.stopPropagation()
          $('.planetInfo').addClass('animated fadeOutLeft')
        })
      }
      $('.planetInfo').removeClass('animated fadeOutLeft')
      $('.planetInfo').addClass('animated fadeInLeft')
    }, false)
  })
}

$.ajax({
  url: ' https://wanderers-backend.herokuapp.com/data',
  method: 'GET'
})
.done( planetData => {
  createPlanetDataObjects(planetData)
  appendData(solarSys)
})
