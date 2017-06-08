$('.closeLanding').click(() => {
  $('.landing').addClass('animated zoomOutUp')
  setTimeout(() => {
    $('.landing').remove()
  }, 2200)
})
