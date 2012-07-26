// ******** remove this function after you've added the IE if-statements to every template file that refers to tools.js *********
// VERY IMPORTANT!! this script allows prefix browser-targeting classes .ie7, .ie8, .ie9, gecko, etc.
// several stylesheets use these prefix classes
  /*
  CSS Browser Selector v0.4.0 (Nov 02, 2010)
  Rafael Lima (http://rafael.adm.br)
  http://rafael.adm.br/css_browser_selector
  License: http://creativecommons.org/licenses/by/2.5/
  Contributors: http://rafael.adm.br/css_browser_selector#contributors
  */
  function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);

// --------------------------------------------------------------------------------------//
// BEGIN JQUERY TOOLS -------------------------------------------------------------------//
// --------------------------------------------------------------------------------------//
$(document).ready(function() {

// PULLQUOTE SCRIPT
  // This script creates a javascript clone
  // of any content wrapped in a span.pullquote,
  // prepends the contents to the parent block,
  // keeps any extra classes the span originally contained,
  // and changes the "pullquote" class to "pulledquote" to absorb the positioning CSS
  $('.pullquote').each(function() {
    var pulled = $(this).clone()
    .removeClass('pullquote');
    $(this).parent('p').prepend($('<p>')
    .addClass('pulledquote')
    .append(pulled)
    );
  });

// Equal Height Columns for all instances of div.card
  $(function(){
    var H = 0;
    $("div.card").each(function(){
      var h = $(this).height();
      if(h > H) H = h;
    });
    $("div.card").height(H);
  });

// Set the visible value of a text input to whatever the label contains.  on focus, remove the value.  on blur, restore it.
  $('.labels-inside input[type="text"]').add('.labels-inside textarea').add('.labels-inside input[type="password"]').each(function() {
    var label = $(this).prev('label[for="'+$(this)[0].id+'"]').hide().html();
    $(this).focus(function() {
      if ($(this).val() == label) {
        $(this).val('').removeClass('light-grey italic');
      }
    });
    $(this).blur(function() {
      if ($(this).val() == '') {
        $(this).val(label).addClass('light-grey italic');
      }
    });
    $(this).blur();
  });

// Set the visible value of a text input to whatever the input's title attribute contains.  on focus, remove the value.  on blur, restore it.
  $('.titles-inside input[type="text"]').add('.titles-inside textarea').each(function() {
    var title = $(this)[0].title;
    $(this).focus(function() {
      if ($(this).val() == title) {
        $(this).val('').removeClass('light-grey italic');
      }
    });
    $(this).blur(function() {
      if ($(this).val() == '') {
        $(this).val(title).addClass('light-grey italic');
      }
    });
    $(this).blur();
  });

// Make zebra stripes for IE browsers, .zebra is an IE-only CSS Rule
  $("tr:nth-child(odd)").addClass('zebrarows');
});

// MODAL WINDOW
// Requires <a href="#" class="dialog">...</a> + JQueryUI (core,position,widget)
$(function() {
  $('a.dialog').on('click', function(){
    $(this).loadDialog();
    return false;
  });
  $.fn.loadDialog = function() {
    $('body').prepend('<div id="modal" style="display:none; max-width:640px; min-width:300px;"></div>');
    var $external_content = $(this).attr('href').replace(/[^\/]+\.aspx/, 'box.aspx');
    $("#modal").load($external_content, function () {
//    $("#modal").load("external_file.html", function() { // keep this line for debugging purposes
      $('#modal').dialog({
        autoOpen: false,
        width: 'auto',
        modal: true,
        draggable: true,
        resizable: false
      });
      $('#modal').dialog('open');
    });
  };
});

// "Verty" a vertical scrolling anchor list animation effect
// Originally written by nathan@fixler.org, Adapted by steve@petrock.org
(function( $ ) {
  $.fn.scrollyBits = function() {
    var target, target_top, hash, scrolling_offset, bottom_padding;

    bottom_padding = $(window).height() - $('.section').filter(':last').height();
    if (bottom_padding > 0) {
      $('body').css('padding-bottom', bottom_padding); // need to add bottom-padding so you can actually scroll all the way to the last .section
    }

    return $(this).click(function(event) {
      hash = getLinkTarget(this);
      target = $('#' + hash);
      scrolling_offset = $('#siteheader').height() + $('.nav.flat').height(); // if you have these, their heights are subtracted from the scrolling distance.  If you don't have these, scrolling_offset = 0.

      if (target.exists()) {
        target_top = target.offset().top - scrolling_offset;

        $('html, body').animate({ scrollTop: target_top }, 500, function() {
          document.location.hash = '_' + hash; // prefixing the hash prevents Firefox and IE from scrolling to the actual hash, thereby obeying the calculated target_top
        });
        event.preventDefault();
      }
    });
  };

  $.fn.copyNav = function(options) {
    var didScroll, settings, flatMenu, intro_height;
    intro_height = $('.intro').height();

    settings = $.extend({
      'navClass': 'flat'
    }, options);

    flatMenu = this.first()
      .clone()
      .appendTo('body')
      .addClass(settings['navClass'])
      .hide();

    $(window).scroll(function() {
      didScroll = true;
    });

    setInterval(function() {
      if ( didScroll ) {
        didScroll = false;
        windowPosition = $(window).scrollTop();
        menuVisible = flatMenu.is(':visible');

        if (windowPosition > intro_height && !menuVisible) {
          flatMenu.fadeIn();
        }
        else if (windowPosition < intro_height && menuVisible) {
          flatMenu.fadeOut();
        }
        flatMenu.setCurrentSection();
      }
    }, 250);
  };

  $.fn.setCurrentSection = function() {
    var target, scrolling_offset;
    scrolling_offset = $('#siteheader').height() + $('.nav.flat').height();

    if (this.is(':visible')) {
      this.find('a').each(function() {
        target = $('#' + getLinkTarget(this));

        if ((target.offset().top + target.height()) > ($(window).scrollTop() + scrolling_offset)) {
          $('.nav.flat a').removeClass('current');
          $(this).addClass('current');
          return false;
        }
      });
    }
  };

  $.fn.exists = function() {
    return (this.length > 0);
  };

  var getLinkTarget = function(link) {
    return link.href.split('#')[1];
  };
})( jQuery );

$(document).ready(function() {
 if ( $(".scroll").length > 0 ) { // only activate these functions if .scroll exists on the page
   $('.nav').copyNav();
   $('.scroll').scrollyBits();
  }
});

// "Horzy" a horizontal sliding door animation effect
// Written by nathan@fixler.org
var getPosition = function(list, item) {
  for (var i=0; i < list.length; i++) {
    if (list[i] == item) {
      return i;
    }
  }
};
$(function() {
  var slideWidth = $('.slide').width();
  $('.slidernav a').live('click', function(e) {
    var clickedLink = this;
    var listPosition = getPosition($(clickedLink).closest('.slidernav').find('a'), clickedLink);
    var currentSlide = $('#' + clickedLink.href.split('#')[1]);
    var slideHeight = currentSlide.height();
    currentSlide.closest('.slides').animate({
      'margin-left': '-'+(listPosition*slideWidth)+'px',
      'height': slideHeight
    });
    $('.slidernav .current').removeClass('current');
    $(clickedLink).addClass('current');
    e.preventDefault();
  });
  $('.slides').height(function() {
    return $(this).find('.slide').first().height();
  });
});

// Background-Image Slideshow
// Requires: <ul class="bg_slideshow"><li><img /><a href="#">Link</a></li></ul>
$(document).ready(function () {
  // Add Control Buttons
    $('.bg_slideshow').before(
      '<div class="container">' +
        '<ul class="bg_slideshow_controls">' +
          '<li><a href="#" id="previous">Previous</a></li>' +
          '<li><a href="#" id="playpause">Pause</a></li>' +
          '<li><a href="#" id="next">Next</a></li>' +
        '</ul>' +
      '</div>'
    );

  // Make the Slides
    $('.bg_slideshow li').each(function () {
      var slideImg = $(this).find('img');
      var slideHeight = slideImg.height();
      var slideImgSrc = $(this).find('img').attr('src');
      $(this).css({
       'background-image' : 'url(' + slideImgSrc + ')',
       'height' : slideHeight + 'px'
      });
      $(this).find('img').remove(); // we can toss these now that we have them set as bg-images
      $(this).find('a').wrap('<div class="container" />');
    });

  // Settings
    slides = $('.bg_slideshow li');
    totalSlides = slides.length;
    currentSlide = 0;
    slideSpeed = 5000;
    fadeSpeed = 300;

  // Start it off
    $(slides).eq(currentSlide).fadeIn(fadeSpeed);
    startAnimation();

  // Behaviors
    $("#next").click(function() {
      stopAnimation();
      navigate("next");
    });
    $("#previous").click(function() {
      stopAnimation();
      navigate("previous");
    });
    $("#playpause").click(function() {
      if (animating == true) {
        stopAnimation();
      }
      else {
        startAnimation();
      }
    });

    function startAnimation() {
      $('#playpause').removeClass('play');
      $('#playpause').html("Pause");
      interval = setInterval(function() {
        navigate("next");
      }, slideSpeed);
      animating = true;
    }
    function stopAnimation() {
      $('#playpause').addClass('play');
      $('#playpause').html("Play");
      animating = false;
      clearInterval(interval);
    }
    function navigate(direction) {
      if (direction == "next") {
        $(slides).eq(currentSlide).fadeOut(fadeSpeed);
        currentSlide = (currentSlide + 1) % totalSlides;
        $(slides).eq(currentSlide).fadeIn(fadeSpeed);
      }
      if (direction == "previous") {
        $(slides).eq(currentSlide).fadeOut(fadeSpeed);
        currentSlide = (currentSlide - 1) % totalSlides;
        $(slides).eq(currentSlide).fadeIn(fadeSpeed);
      }
    }
// END DOCUMENT.READY
});

// Background-Banners
// Requires: <ul class="bg_banners"><li><img /><a href="#">Link</a></li></ul>
$(document).ready(function () {
  // Make the Banners
    $('.bg_banners li').each(function () {
      var slideImg = $(this).find('img');
      var slideHeight = slideImg.height();
      var slideWidth = slideImg.width();
      var slideImgSrc = $(this).find('img').attr('src');
      if (slideImg.exists()) { // use that img's unique height and width
        $(this).css({
         'background-image' : 'url(' + slideImgSrc + ')',
         'height' : slideHeight + 'px',
         'width' : slideWidth + 'px'
        });
//        $(this).find('img').remove(); // we can toss these now that we have them set as bg-images
      }
      else { // use the height & width of the first image that exists
        slideHeight = $(this).siblings().children('img').eq(0).height();
        $(this).css({
         'height' : slideHeight + 'px'
        });
      }
      $(this).find('a').wrapInner('<span />');
    });
// END DOCUMENT.READY
});