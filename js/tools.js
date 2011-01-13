// parseUri 1.2.2 // (c) Steven Levithan <stevenlevithan.com> // MIT License
function parseUri (str) {
	var	o   = parseUri.options,
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
      
// Modal Window //    
    $('#dialog').hide;
    //select all the a tag with name equal to modal
    $('a[name=modal]').click(function(e) {
      $('#dialog').show;
    	//Cancel the link behavior
    	e.preventDefault();
    	var divid = "#dialog";
    	var lnk = $(this).attr('href');
    	var title = $(this).attr('title');
    	var qkey = parseUri(lnk).queryKey;
    	var ekid = $(qkey).attr("id");
    //	var h3id = "#dialog-h3";
    	var ssid = "#dialog-content";
    	var loadss = '<iframe id="modal-iframe" name="modal-iframe" frameborder="0" scrolling="no" src="/box.aspx?id=' + ekid + '" />';
    //	$(h3id).html(title);
    	$(ssid).html(loadss);
    	//Get the screen height and width
    	var maskHeight = $(document).height();
    	var maskWidth = $(window).width();
    	//Set height and width to mask to fill up the whole screen
    	$('#mask').css({'width':maskWidth,'height':maskHeight});
    	//transition effect		
    	$('#mask').fadeTo("slow",0.8);	
    	//Get the window height and width
    	var winH = $(window).height();
    	var winW = $(window).width();
    	//Set the popup window to center
    	$(divid).css('top',  winH/2-$(divid).height()/2);
    	$(divid).css('left', winW/2-$(divid).width()/2);
    	//transition effect
    	$(divid).fadeIn(100);
    });
    //if close button is clicked
    $('.window .close').click(function (e) {
    	//Cancel the link behavior
    	e.preventDefault();
    	$("#dialog-content").html("")
    	$('#mask, .window').hide();
    });		
    //if mask is clicked
    $('#mask').click(function () {
    	$(this).hide();
    	$("#dialog-content").html("")
    	$('.window').hide();
    });

//END DOCUMENT.READY
});