/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.1.0
 *
 */
(function(f){jQuery.fn.extend({slimScroll:function(l){var a=f.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:0.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:0.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200},l);this.each(function(){function r(d){if(n){d=d||window.event;var c=0;d.wheelDelta&&(c=-d.wheelDelta/
120);d.detail&&(c=d.detail/3);f(d.target||d.srcTarget).closest("."+a.wrapperClass).is(b.parent())&&g(c,!0);d.preventDefault&&!p&&d.preventDefault();p||(d.returnValue=!1)}}function g(d,f,h){var e=d,g=b.outerHeight()-c.outerHeight();f&&(e=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),e=Math.min(Math.max(e,0),g),e=0<d?Math.ceil(e):Math.floor(e),c.css({top:e+"px"}));j=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());e=j*(b[0].scrollHeight-b.outerHeight());h&&(e=d,d=e/b[0].scrollHeight*
b.outerHeight(),d=Math.min(Math.max(d,0),g),c.css({top:d+"px"}));b.scrollTop(e);b.trigger("slimscrolling",~~e);s();m()}function A(){window.addEventListener?(this.addEventListener("DOMMouseScroll",r,!1),this.addEventListener("mousewheel",r,!1)):document.attachEvent("onmousewheel",r)}function t(){q=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),B);c.css({height:q+"px"});var a=q==b.outerHeight()?"none":"block";c.css({display:a})}function s(){t();clearTimeout(w);j==~~j&&(p=a.allowPageScroll,
x!=j&&b.trigger("slimscroll",0==~~j?"top":"bottom"));x=j;q>=b.outerHeight()?p=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function m(){a.alwaysVisible||(w=setTimeout(function(){if((!a.disableFadeOut||!n)&&!u&&!v)c.fadeOut("slow"),h.fadeOut("slow")},1E3))}var n,u,v,w,y,q,j,x,B=30,p=!1,b=f(this);if(b.parent().hasClass(a.wrapperClass)){var k=b.scrollTop(),c=b.parent().find("."+a.barClass),h=b.parent().find("."+a.railClass);t();if(f.isPlainObject(l)){if("scrollTo"in l)k=
parseInt(a.scrollTo);else if("scrollBy"in l)k+=parseInt(a.scrollBy);else if("destroy"in l){c.remove();h.remove();b.unwrap();return}g(k,!1,!0)}}else{a.height="auto"==a.height?b.parent().innerHeight():a.height;k=f("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=f("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&
a.railVisible?"block":"none","border-radius":a.size,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=f("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.size,BorderRadius:a.size,MozBorderRadius:a.size,WebkitBorderRadius:a.size,zIndex:99}),z="right"==a.position?{right:a.distance}:{left:a.distance};h.css(z);c.css(z);b.wrap(k);b.parent().append(c);b.parent().append(h);
a.railDraggable&&c.draggable({axis:"y",containment:"parent",start:function(){v=!0},stop:function(){v=!1;m()},drag:function(){g(0,f(this).position().top,!1)}});h.hover(function(){s()},function(){m()});c.hover(function(){u=!0},function(){u=!1});b.hover(function(){n=!0;s();m()},function(){n=!1;m()});b.bind("touchstart",function(a){a.originalEvent.touches.length&&(y=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){b.originalEvent.preventDefault();b.originalEvent.touches.length&&g((y-
b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0)});"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),g(0,!0)):"top"!==a.start&&(g(f(a.start).position().top,null,!0),a.alwaysVisible||c.hide());A();t()}});return this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);