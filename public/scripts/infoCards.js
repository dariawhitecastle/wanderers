var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)

//


domEvents.addEventListener(solarSys.earth, 'mousedown', function(event){
  $('.planetInfo').removeClass('animated fadeOutLeft')
  $('.planetInfo').addClass('animated fadeInLeft')
}, false)

$('.closeInfo').click((event) => {
  event.stopPropagation()
  $('.planetInfo').addClass('animated fadeOutLeft')
})
