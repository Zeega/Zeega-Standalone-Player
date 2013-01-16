this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<i class="zitem-'+
( type.toLowerCase() )+
' zitem-30"></i>\n<div class="player-citation-bubble clearfix">\n\t<div class="player-citation-content">\n\t\t<h3>'+
( attr.title )+
'</h3>\n\t\t<div class="content">\n\t\t\t<span class="citation-subhead">DESCRIPTION:</span> '+
( attr.description )+
'\n\t\t</div>\n\t\t<div class="creator"><span class="citation-subhead">\n\t\t\tCREATED BY:</span> '+
( attr.media_creator_realname )+
'\n\t\t</div>\n\n\t';
 if( !_.isNull( attr.media_geo_longitude ) ) { 
;__p+='\n\t\t<div class="location-created">\n\t\t\t<span class="citation-subhead">LOCATION:</span> '+
( attr.media_geo_longitude )+
', '+
( attr.media_geo_latitude )+
'\n\t\t</div>\n\t';
 } 
;__p+='\n\t\t<div class="trackback">\n\t\t\t<a href="'+
( attr.attribution_uri )+
'" target="blank">view original</a>\n\t\t</div>\n\t</div>\n\t<div class="player-citation-thumb"><img src="'+
( attr.thumbnail_url )+
'" height="100px" width="100px"/></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="arrow arrow-left prev disabled"></a>\n<a href="#" class="arrow arrow-right next disabled"></a>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-loader-inner">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n    <div class="ZEEGA-loading-bar-wrapper">\n        <div class="ZEEGA-loading-bar"></div>\n    </div>\n    <ul class="ZEEGA-loading-layers"></ul>\n</div>\n<span class="ZEEGA-loader-bg"></span>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="ZEEGA-standalone-controls">\n    <li><a id="project-play-pause" href="#" ><i class="icon-pause icon-white"></i></a></li>\n</ul>\n<ul class="ZEEGA-citations-primary"></ul>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="ZEEGA-menu-bar menu-bar-left">\n    <li>\n        <a href="http://alpha.zeega.org/user/'+
( user_id )+
'" target="blank" style="padding:7px;">\n            <img src="assets/img/zeega-logo-header.png" height="20px">\n        </a>\n    </li>\n    <li class="menu-bar-title"><span class="project-title">'+
( title )+
'</span><span class="sequence-description"></span></li>\n</ul>\n<ul class="ZEEGA-menu-bar menu-bar-right">\n    <li><a id="project-share" href="#">share</a></li>\n    <li class="slide-menu">\n        <a href="https://twitter.com/intent/tweet?original_referer=http://alpha.zeega.org/'+
( id )+
'&text=Zeega%20Project%3A%20'+
( title )+
' &url=http://alpha.zeega.org/'+
( id )+
'" target="blank"><i class="zsocial-twitter"></i></a>\n        <a href="http://www.facebook.com/sharer.php?u=http://alpha.zeega.org/'+
( id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n        <a href="http://www.tumblr.com/share" target="blank"><i class="zsocial-tumblr"></i></a>\n        <a href="mailto:friend@example.com?subject=Check out this Zeega!&body=http://alpha.zeega.org/'+
( id )+
'"><i class="zsocial-email"></i></a>\n    </li>\n    <li><a id="project-credits" href="#"><i class="icon-align-justify icon-white"></i></a></li>\n    <li><a id="project-fullscreen-toggle" href="#"><i class="icon-resize-full icon-white"></i></a></li>\n</ul>\n';
}
return __p;
};