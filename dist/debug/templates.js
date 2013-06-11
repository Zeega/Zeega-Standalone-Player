this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="'+
( attr.attribution_uri )+
'" target="blank">\n    <i class="icon-'+
( iconType )+
' icon-white"></i>\n</a>';
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

this["JST"]["app/templates/end-page.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="end-page-wrapper">\n    <h2>Explore More Zeegas</h2>\n';
 _.each(projects, function( project ) { 
;__p+='\n    <article style="background-image: url('+
(project.cover_image )+
');" >\n            <div class="info-overlay">\n                <div class="left-column">\n                  <a data-bypass="true" href="'+
(path )+
'profile/'+
(project.user.id )+
'" >\n                    <div class="profile-token" style="background-image: url('+
( project.user.thumbnail_url )+
');"></div>\n                   </a>\n                </div>\n                <div class="right-column">\n                  <h1 class = "caption">'+
( project.title )+
'</h1>\n                  \n                  <div class="profile-name">\n                    <a data-bypass="true" href="'+
(path )+
'profile/'+
(project.user.id)+
'" >\n                      '+
(project.user.display_name)+
'\n                    </a>\n                   \n                  </div>\n                 \n                </div>\n                  \n            \n            </div>\n            <a href="'+
(path )+
''+
(project.id )+
'" class="mobile-play" data-bypass="true"></a>\n    </article>\n';
 }); 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-notices">\n    <ul class="sticky">\n        <li><i class="icon-headphones icon-white"></i> turn up volume</li>\n        <li>click arrows and hotspots to explore</li>\n    </ul>\n    <ul class="rotating">\n    </ul>\n</div>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<div class="ZEEGA-loader-bg"\n    style="\n        background: url('+
( cover_image )+
');\n        background-position: 50% 50%;\n        background-repeat: no-repeat no-repeat;\n        background-attachment: fixed;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover;\n    "\n></div>\n';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a href="';
 path 
;__p+='profile/'+
( userId )+
'" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true">\n                <div class="profile-token"\n                    style="\n                        background-image: url('+
( userThumbnail )+
');\n                        background-size: cover;\n                    "\n                ></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="caption">'+
( title )+
'</div>\n            <div class="username">\n                <a class="profile-name" href="';
 path 
;__p+='profile/'+
( userId )+
'" data-bypass="true" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' >\n                    '+
( authors )+
'\n                </a>\n                ';
 if ( favorite_count > 0 ) {  
;__p+=' \n                <span class="zeega-favorite_count"> ♥ '+
( favorite_count )+
' ';
 if ( favorite_count == 1) {  
;__p+=' favorite ';
 } else {
;__p+=' favorites ';
 } 
;__p+='</span>\n                ';
 } 
;__p+='\n                <span class="zeega-views"> <i class="icon-play icon-white"></i> ';
 if ( !_.isNumber( views ) ) { views = 0 ;} 
;__p+=''+
( views )+
' ';
 if ( views != 1 ) { 
;__p+='views';
 } else { 
;__p+='view';
 } 
;__p+='</span>\n            </div>\n        </div>\n\n        <div class="favorite">\n\n            ';
 if ( favorite === true ) {  
;__p+=' \n                <a href="#" class="btnz favorite-btnz favorited">♥ favorite</a>\n            ';
 } else {
;__p+='\n                <a href="#" class="btnz favorite-btnz">♥ favorite</a>\n            ';
 } 
;__p+='\n        </div>\n\n        <div class="citations">\n            <ul></ul>\n            <div class="citation-meta">\n                <div class="citation-title"></div>\n            </div>\n        </div>\n        <a href="#" class="ZEEGA-home"></a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n';
 if ( !window.hidechrome ) { 
;__p+='\n\n<a href="'+
( path )+
'" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" >\n    <div class="ZEEGA-tab">\n        <div class="ZTab-logo"></div>\n    </div>\n</a>\n\n';
 } 
;__p+='\n\n\n<a href="'+
( path )+
'register/" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" class="btnz btnz-join">Join Zeega</a>\n\n<div class="menu-right">\n    <a class="social-share-icon" href="https://twitter.com/intent/tweet?original_referer='+
( path )+
''+
( id )+
'&text='+
( title )+
' '+
( path )+
''+
( id )+
' made w/ @zeega" target="blank"><i class="zsocial-twitter"></i></a>\n    <a class="social-share-icon" href="http://www.facebook.com/sharer.php?u='+
( path )+
''+
( id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n    <a class="social-share-icon" href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" target="blank"><i class="zsocial-tumblr"></i></a>\n\n    <a href="#" id="project-fullscreen-toggle" class="btnz">fullscreen</a>\n    <a class="ZEEGA-sound-state" style="display:none;"></a>\n</div>';
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