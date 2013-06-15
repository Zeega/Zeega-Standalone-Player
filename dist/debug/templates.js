this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<i class="zitem-'+
( attr.archive.toLowerCase() )+
' zitem-30"></i>\n<div class="player-citation-bubble clearfix">\n  <div class="player-citation-content">\n    <h3>'+
( attr.title )+
'</h3>\n    <div class="creator">\n      Author: '+
( attr.media_creator_realname )+
'\n    </div>\n    <div class="trackback">\n      <a href="'+
( attr.attribution_uri )+
'" target="blank">view original</a>\n    </div>\n  </div>\n</div>';
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
__p+='<ul class="ZEEGA-standalone-controls">\n    <li><a id="project-home" href="#" ><i class="home-zcon"></i></a></li>\n    <li><a id="project-play-pause" href="#" ><i class="pause-zcon"></i></a></li>\n</ul>\n<ul class="ZEEGA-citations-primary"></ul>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="ZEEGA-menu-bar menu-bar-left">\n    <li>\n        <a href="http://www.zeega.com/" class="ZEEGA-standalone-logo" style="padding:7px;" ';
 if (window!=window.top)  {  
;__p+=' target="blank" ';
 } 
;__p+=' ></a>\n    </li>\n    <li class="menu-bar-title">\n        <span class="project-title">'+
( title )+
'</span>\n        <span class="sequence-description"></span>\n        <span class="sequence-author">\n            <a href="http:'+
( hostname )+
''+
( directory )+
'profile/'+
( userId )+
'" data-bypass="true" ';
 if (window!=window.top)  {  
;__p+='target="blank" ';
 } 
;__p+=' >\n            <img class = "profile-thumb" src="'+
( user_thumbnail )+
'" />\n                <span class="username"> '+
( authors )+
' </span>\n            </a>\n        </span>\n    </li>\n</ul>\n<ul class="ZEEGA-menu-bar menu-bar-right">\n    <li class="project-views">'+
( projectViews )+
'</li>\n    <li><a id="project-share" href="#">share</a></li>\n    <li class="slide-menu">\n        <a href="https://twitter.com/intent/tweet?original_referer=http://www.zeega.com/'+
( id )+
'&text=Zeega%20Project%3A%20'+
( title )+
' &url=http://www.zeega.com/'+
( id )+
'" target="blank"><i class="zsocial-twitter"></i></a>\n        <a href="http://www.facebook.com/sharer.php?u=http://www.zeega.com/'+
( id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n        <a href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" target="blank"><i class="zsocial-tumblr"></i></a>\n    </li>\n    <!--<li><a id="project-credits" href="#"><i class="icon-align-justify icon-white"></i></a></li>-->\n    <li><a id="project-fullscreen-toggle" href="#"><i class="icon-resize-full icon-white"></i></a></li>\n</ul>\n';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};