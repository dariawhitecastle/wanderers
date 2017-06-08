$('.closeLanding').click(() => {
  $('.landing').addClass('animated fadeOut')
  setTimeout(() => {
    $('.landing').remove()
  }, 2200)
})
