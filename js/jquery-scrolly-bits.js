jQuery.fn.exists = function() {
  return (this.length > 0)
}

jQuery.fn.doAwesomeScrollingThing = function() {
  $('body').css('margin-bottom', $(window).height())
  $('.nav').isOmniPresentAllSeeingNav()

  return this.each(function() {
    $(this).click(function(event) {
      hash = this.href.split('#')[1]
      target = $('#' + hash)

      if (target.exists()) {
        var target_top = target.offset().top
        $('html, body').animate({ scrollTop: target_top - ($('.nav.flat').height() - 20) }, 500, function() {
          document.location.hash = hash
        })
        event.preventDefault()
      }
    })
  })
}

jQuery.fn.isOmniPresentAllSeeingNav = function() {
  flatNav = this.first().clone().appendTo('body').addClass('flat').hide()
}

jQuery.fn.setCurrentSection = function() {
  if (this.is(':visible')) {
    this.find('a').each(function() {
      target = $('#' + this.href.split('#')[1])
      if ((target.offset().top + target.height()) > ($(window).scrollTop() + 50)) {
        $('.nav.flat a').removeClass('current')
        $(this).addClass('current')
        return false
      }
    })
  }
}

$(window).scroll(function() {
  menu = $('.nav.flat')

  if (($(window).scrollTop() > 500) && (!menu.is(':visible'))) {
    menu.fadeIn()
  }
  else if (($(window).scrollTop() < 500) && (menu.is(':visible'))) {
    menu.fadeOut()
  }
  menu.setCurrentSection()
})