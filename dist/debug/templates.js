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

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-notices">\n    <ul class="sticky">\n        <li><i class="icon-headphones icon-white"></i> turn up volume</li>\n    </ul>\n    <ul class="rotating">\n        <li class="click-to-start">click arrow to start</li>\n    </ul>\n</div>\n\n<a href="#" class="ZEEGA-next controls-arrow arrow-right disabled"></a>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<div class="ZEEGA-loader-bg"\n    style="\n        background: url('+
( cover_image )+
');\n        background-position: 50% 50%;\n        background-repeat: no-repeat no-repeat;\n        background-attachment: fixed;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover;\n    "\n></div>\n';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a href="http://zeega.com/user/'+
( userId )+
'" target="blank">\n                <div class="profile-token"><img src="'+
( userThumbnail )+
'"/></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a href="http://zeega.com/user/'+
( userId )+
'" target="blank">\n                    <div class="profile-name">'+
( authors )+
'</div>\n                </a>\n            </div>\n            <div class="caption">And their words to the root and the rock would echo down, down and the magic would hear and answer, faint as a falling butterfly.'+
( title )+
'</div>\n        </div>\n        <div class="citations">\n            <ul></ul>\n            <div class="citation-meta">\n                <div class="citation-title"></div>\n            </div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="http://www.zeega.com">\n    <div class="ZEEGA-tab"><img src="assets/img/zeega-logo-white-30.png"/></div>\n</a>\n\n<a herf="#" class="btnz btns-join">Join Zeega</a>\n\n<div class="menu-right">\n    <a class="social-share-icon" href="https://twitter.com/intent/tweet?original_referer=http://www.zeega.com/'+
( item_id )+
'&url=http://www.zeega.com/'+
( item_id )+
'&text='+
( title )+
' made w/ @zeega" target="blank"><i class="zsocial-twitter"></i></a>\n    <a class="social-share-icon" href="http://www.facebook.com/sharer.php?u=http://www.zeega.com/'+
( item_id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n    <a class="social-share-icon" href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" target="blank"><i class="zsocial-tumblr"></i></a>\n    <a href="#" id="project-fullscreen-toggle" class="btnz">fullscreen</a>\n</div>';
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