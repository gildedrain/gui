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

/* CSS Browser Selector v0.3.5 (Feb 05, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors */
function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',o='opera',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);      

/* PDFObject, copyright (C) 2008 Philip Hutchison (pipwerks.com)
Documentation and examples are at www.pdfobject.com 
Version 1.0, September 2008
MIT style license */
var pipwerks=pipwerks||{};pipwerks.pdfUTILS={termFound:function(a,b){return(a.indexOf(b)!==-1)},detect:{hasReaderActiveX:function(){var a=null;if(window.ActiveXObject){a=new ActiveXObject("AcroPDF.PDF");if(!a){a=new ActiveXObject("PDF.PdfCtrl")}if(a!==null){return true}}return false},hasReader:function(){var a=pipwerks.pdfUTILS.termFound;var n=navigator.plugins;for(var i=0;i<n.length;i++){var b=n[i].name;if(a(b,"Adobe Reader")||a(b,"Adobe PDF")||a(b,"Acrobat")){return true}}return false},hasGeneric:function(){var a=navigator.mimeTypes["application/pdf"];return(a&&a.enabledPlugin)},pluginFound:function(){var a=null;var b=pipwerks.pdfUTILS.detect;if(b.hasReader()||b.hasReaderActiveX()){a="Adobe"}else if(b.hasGeneric()){a="generic"}return a}},setCssForFullWindowPdf:function(){if(!document.getElementsByTagName){return false}var a=document.getElementsByTagName("html");if(!a){return false}var c=a[0];c.style.height="100%";c.style.overflow="hidden";var b=document.body;b.style.margin="0";b.style.padding="0";b.style.height="100%";b.style.overflow="hidden"},buildQueryString:function(a){var b="";if(!a){return b}for(var c in a){if(a.hasOwnProperty(c)){b+=c+"=";if(c==="search"){b+=encodeURI(a[c])}else{b+=a[c]}b+="&"}}return b.slice(0,b.length-1)}};pipwerks.pdfObject=function(a){if(!document.getElementById||!a.url){return false}this.url=encodeURI(a.url)+"#";this.id=a.id||false;this.width=a.width||"100%";this.height=a.height||"100%";this.pdfOpenParams=a.pdfOpenParams;this.url+=pipwerks.pdfUTILS.buildQueryString(this.pdfOpenParams);this.pluginTypeFound=pipwerks.pdfUTILS.detect.pluginFound();this.pdfobjectversion="1.0";return this};pipwerks.pdfObject.prototype.get=function(a){var b=null;switch(a){case"url":b=this.url;break;case"id":b=this.id;break;case"width":b=this.width;break;case"height":b=this.height;break;case"pdfOpenParams":b=this.pdfOpenParams;break;case"pluginTypeFound":b=this.pluginTypeFound;break;case"pdfobjectversion":b=this.pdfobjectversion;break}return b};pipwerks.pdfObject.prototype.embed=function(a){if(!this.pluginTypeFound){return false}if(!document.createElement||!document.getElementById){return false}var b=/*@cc_on!@*/false;var c=null;if(a){c=document.getElementById(a);if(!c){return false}}else{c=document.body;pipwerks.pdfUTILS.setCssForFullWindowPdf();this.width="100%";this.height="100%"}var d;if(b){d=document.createElement("<object classid='CLSID:CA8A9780-280D-11CF-A24D-444553540000'>")}else{d=document.createElement("object")}d.setAttribute("type","application/pdf");d.setAttribute("data",this.url);d.setAttribute("width",this.width);d.setAttribute("height",this.height);if(this.id){d.setAttribute("id",this.id)}if(c.hasChildNodes){while(c.childNodes.length>0){c.removeChild(c.firstChild)}}c.appendChild(d);return d};var PDFObject=pipwerks.pdfObject;

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

// Animate #panel open & close
    $('#panel').removeClass('basic'); // JQuery takes over, #panel.basic:hover-to-show is removed
    $('#panel').addClass('closed');
    $('#toggle_open').click(function() {  
      $('#subpanel').animate({height:'show'}, 300, function() {
        $('#panel').removeClass('closed');
        $('#panel').addClass('opened');
      });
    });
    $('#toggle_close').click(function() {
      $('#subpanel').animate({height:'hide'}, 300, function() {
        $('#panel').removeClass('opened');
        $('#panel').addClass('closed');
      });
    });

// Equal Height Columns for DIV.Card  
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
      
// Take current Google Search query and use it to search within the scope of a different website
// to add a new option, modify the subdomain / subdirectory, and modify the CXkey (created on google webmaster tools)
    occSwitchSearch = function(NewSite) {
      loc = window.location.href;
    	qkey = parseUri(loc).queryKey;
    	qHold = $(qkey).attr("q");
    	if (NewSite == 'www') {
    		window.location.href="http://www.sunyocc.edu/search.aspx?cx=009247214289687445570%3A4z5fbtg2lek&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    	}
    	else if (NewSite == 'wwwold') {
    		window.location.href="http://www.sunyocc.edu/searchresult.aspx?cx=009247214289687445570%3A4z5fbtg2lek&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    	}
    	else if (NewSite == 'students') {
    		window.location.href="http://students.sunyocc.edu/search.aspx?cx=012429996574113949521%3Az7uv6wcw71e&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    	}
    	else if (NewSite == 'admission') {
    		window.location.href="http://www.sunyocc.edu/admission/search.aspx?cx=009247214289687445570%3As8i2fdwbink&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    	}
    };      

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
      
// EKTRON MENU OPEN FIRST LINK IF SUBMENU AND HIGHLIGHT      
    $(window).load(function() {
    	if (($('div.menu a:first').hasClass('ekmenu_submenu_btnlink')) && !($('div.ekmenu_submenu > div').hasClass('ekmenu_submenu_items'))) {
    		$('div.ekmenu_submenu_items_hidden').first().addClass('ekmenu_submenu_items').removeClass('ekmenu_submenu_items_hidden');
    		$('span.ekmenu_button').first().addClass('ekmenu_button_selected').removeClass('ekmenu_button');
    	}
    });      
//END DOCUMENT.READY
});