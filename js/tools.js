// parseUri 1.2.2 // (c) Steven Levithan <stevenlevithan.com> // MIT License
function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;
  while (i--) uri[o.key[i]] = m[i] || "";
  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
};
parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

/* VERY IMPORTANT!!, Several CSS Hacks rely on this script!
CSS Browser Selector v0.3.5 (Feb 05, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors */
function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',o='opera',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);

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

//END DOCUMENT.READY
});



// MODAL WINDOW FUNCTION -- requires: <a class="dialog">link</a>
(function($) {
  $('a.dialog').live('click', function() {
    $(this).loadDialog();
    return false;
  });

  // Add the loadDialog() function to any jQuery element. This adds all of the
  // dialog-related HTML to the DOM, binds the close events, and adds the iframe.
  // See my comments below for an alternative to the iframe technique.
  $.fn.loadDialog = function() {
    $('body').append('<div id="modal" style="display:none;">'+
      '<div class="window" id="dialog">'+
      '<a class="close" title="Close Window">Click to close</a>'+
      '<span class="null" id="dialog-content">'+
      '<iframe id="modal-iframe" frameborder="0" scrolling="no" '+
      'src="'+this.attr('href').replace(/[^\/]+\.aspx/, 'box.aspx') + '" />'+
      '</span></div><div id="mask" />'+
    '</div>');

    $('#modal').show();
    $('#mask').css({
      'height': $(window).height(),
      'width':  $(window).width()
      }).fadeTo('slow',0.8);

    $('#dialog').css({
      'top': $(window).height()/2 - $('#dialog').height()/2,
      'left': $(window).width()/2 - $('#dialog').width()/2
    }).fadeIn(100);

    // Instead of leaving the dialog HTML in the DOM after the dialog is closed,
    // I decided to just remove the entire <div id="modal" /> entirely. This
    // removes everything inside also, and leaves the page exactly the way it
    // was before the dialog was opened.
    $('#dialog .close').add('#mask').click(function() {
      $('#modal').remove();
      return this;
    });

    // I'm still not sure if I think the iframe is really necessary, but there might
    // be some funky ektron stuff that I'm not fully understanding.  I would probably
    // do something like this instead:
    // $('#dialog-content').load(url for box.aspx), function() {
    //   ...
    //   show the modal and size it appropriately
    //   fade in animations
    // });
    // The advantage here is that you can wait for the box.aspx content before starting
    // the fade-in animations, ensuring that the modal is not displayed empty.
  }
})(jQuery);




// "Verty" a vertical scrolling anchor list animation effect
// Written by nathan@fixler.org
(function( $ ) {

  $.fn.scrollyBits = function() {
    var target, target_top, hash, scrolling_offset;

    return $(this).click(function(event) {
      hash = getLinkTarget(this);
      target = $('#' + hash);
      scrolling_offset = $('#siteheader').height() + $('.nav.flat').height();

      if (target.exists()) {
        target_top = target.offset().top - scrolling_offset;

        $('html, body').animate({ scrollTop: target_top }, 500, function() {
          document.location.hash = '_' + hash;
        });
        event.preventDefault();
      }
    });
  }

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
  }

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
  }

  $.fn.exists = function() {
    return (this.length > 0);
  }

  var getLinkTarget = function(link) {
    return link.href.split('#')[1];
  }
})( jQuery );

 $(document).ready(function() {
   $('.nav').copyNav()
   $('.scroll').scrollyBits()
 })

// "Horzy" a horizontal sliding door animation effect
// Written by nathan@fixler.org
var getPosition = function(list, item) {
  for (var i=0; i < list.length; i++) {
    if (list[i] == item) {
      return i;
    }
  }
}
$(function() {
  var slideWidth = $('.slide').width();
  $('.slidernav a').live('click', function(e) {
    var clickedLink = this;
    var listPosition = getPosition($(clickedLink).closest('.slidernav').find('a'), clickedLink);
    var currentSlide = $('#' + clickedLink.href.split('#')[1])
    var slideHeight = currentSlide.height();
    currentSlide.closest('.slides').animate({
      'margin-left': '-'+(listPosition*slideWidth)+'px',
      'height': slideHeight
    });
    $('.slidernav .current').removeClass('current');
    $(clickedLink).addClass('current');
    e.preventDefault();
  })
  $('.slides').height(function() {
    return $(this).find('.slide').first().height();
  })
})
