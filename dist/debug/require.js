/**
 * almond 0.1.3 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());
;this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="'+
( attr.attribution_uri )+
'" target="blank">\n    <i class="itemz-'+
( attr.archive.toLowerCase() )+
'"></i>\n</a>';
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

this["JST"]["app/templates/endpage-embed.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="endpage-embed-inner">\n    <a href="'+
( path )+
'@'+
( user.username )+
'" class="btnz watch-more" target="blank" data-bypass="true">Explore more Zeegas by '+
( user.display_name )+
'</a>\n    ';
 if ( authenticated ) { 
;__p+='\n    <a href="'+
( path )+
'project/new" class="btnz create-zeega" target="blank" data-bypass="true">Create Your Own Zeega</a>\n    ';
 } else { 
;__p+='\n    <a href="'+
( path )+
'register" class="btnz create-zeega" target="blank" data-bypass="true">Create Your Own Zeega</a>\n    ';
 } 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/templates/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="end-page-wrapper" >\n    <h2>Explore More Zeegas</h2>\n';
 _.each(projects, function( project ) { 
;__p+='\n    <div class="suggested-zeega">\n\n        <div class="top">'+
( project.user.display_name)+
'</div>\n\n        <a href="'+
(path )+
''+
( project.id )+
'"\n                class="middle zeega-thumb play-next"\n                data-id="'+
( project.id )+
'"\n                data-bypass="true"\n                style="background-image: url('+
( project.cover_image )+
');">\n\n            <div class="profile-token"\n                    style="background-image: url('+
( project.user.thumbnail_url )+
');\n                            background-size: cover;\n                            background-position: center;"></div>\n            <span class="playbutton"></span>\n        </a>\n\n        <div class="bottom">'+
( project.title )+
'</div>\n    </div>\n';
 }); 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if ( remix.remix ) { 
;__p+='\n\n<div class="loader-remix-meta" class="'+
( token_class )+
'">\n\n    <div class="column project-current">\n        <div class="title">a remix by</div>\n        <div class="user-token user-token-large" style="\n            background-image: url('+
( user.thumbnail_url )+
');\n            background-size: cover;\n            background-position: center;\n        "></div>\n        <div class="username">'+
( user.display_name )+
'</div>\n    </div>\n\n    <div class="column column-arrow">\n        <div class="remix-arrow gradient1"></div>\n    </div>\n\n    <div class="column project-parent">\n        <div class="title">via</div>\n        <div class="user-token user-token-medium" style="\n            background-image: url('+
( remix.parent.user.thumbnail_url )+
');\n            background-size: cover;\n            background-position: center;\n        "></div>\n        <div class="username">'+
( remix.parent.user.display_name )+
'</div>\n    </div>\n\n    ';
 if ( remix.parent.id != remix.root.id ) { 
;__p+='\n\n        <div class="column column-arrow">\n            <div class="remix-arrow gradient2"></div>\n        </div>\n\n        <div class="column project-root">\n            <div class="title">started by</div>\n            <div class="user-token user-token-medium" style="\n                background-image: url('+
( remix.root.user.thumbnail_url )+
');\n                background-size: cover;\n                background-position: center;\n            "></div>\n            <div class="username">'+
( remix.root.user.display_name )+
'</div>\n        </div>\n\n    ';
 } 
;__p+='\n</div>\n\n';
 } 
;__p+='\n\n<div class="ZEEGA-notices">\n    <ul class="sticky">\n        <li><i class="icon-headphones icon-white"></i> turn up volume</li>\n        <li>click arrows to explore</li>\n    </ul>\n    <ul class="rotating">\n    </ul>\n</div>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<div class="ZEEGA-loader-bg"\n    style="\n        background: url('+
( cover_image )+
');\n        background-position: 50% 50%;\n        background-repeat: no-repeat no-repeat;\n        background-attachment: fixed;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover;\n    "\n></div>\n<img class="bg-preload" src="'+
( cover_image )+
'">\n';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if( remix.remix ) { 
;__p+='\n\n<div class="remix-meta">\n    <span class="remix-tab"></span>\n    <ul class="remix-trail">\n        <li>\n            <a class="profile-link" href="';
 path 
;__p+='profile/'+
( userId )+
'" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true">\n                <div class="user-token token-small"\n                    style="\n                        background-image: url('+
( user.thumbnail_url )+
');\n                        background-size: cover;\n                    "\n                ></div>\n            </a>\n        </li>\n    </ul>\n</div>\n\n';
 } 
;__p+='\n\n<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a class="profile-link" href="';
 path 
;__p+='profile/'+
( userId )+
'" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true">\n                <div class="profile-token"\n                    style="\n                        background-image: url('+
( user.thumbnail_url )+
');\n                        background-size: cover;\n                    "\n                ></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="caption">'+
( title )+
'</div>\n            <div class="username">\n                <a class="profile-name profile-link" href="';
 path 
;__p+='profile/'+
( userId )+
'" data-bypass="true" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' >\n                    '+
( user.display_name )+
'\n                </a>\n\n                <span class="zeega-favorite_count">'+
( favorites )+
'</span>\n               \n                <span class="zeega-views"> <i class="icon-play icon-white"></i> ';
 if ( !_.isNumber( views ) ) { views = 0 ;} 
;__p+=''+
( views )+
' ';
 if ( views != 1 ) { 
;__p+='views';
 } else { 
;__p+='view';
 } 
;__p+='</span>\n            </div>\n        </div>\n\n        <a href="#" class="ZEEGA-fullscreen"></a>\n\n        <div class="citation-soundtrack">\n            <a class="citation-trackback"><i class="itemz-soundcloud"></i></a>\n            <a href="#" class="play-pause"><i class="pp-btn pause"></i></a>\n        </div>\n\n        <div class="citations">\n            <ul></ul>\n            <div class="citation-meta">\n                <div class="citation-title"></div>\n            </div>\n        </div>\n\n        <a href="#" class="ZEEGA-home"></a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n';
 if ( show_chrome ) { 
;__p+='\n\n<a class="tab-wrapper" href="'+
( path )+
'" ';
 if (window!=window.top ) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" >\n    <div class="ZEEGA-tab">\n        <div class="ZTab-logo"></div>\n    </div>\n</a>\n\n';
 } 
;__p+='\n\n';
 if ( authenticated ) { 
;__p+='\n<a href="'+
( path )+
'project/new" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" class="btnz btnz-join">Create Your Own Zeegas</a>\n';
 } else { 
;__p+='\n<a href="'+
( path )+
'register" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" class="btnz btnz-join">Create Your Own Zeega</a>\n';
 } 
;__p+='\n\n<div class="menu-right">\n\n    <ul class="social-actions">\n       <li>  \n    \n    ';
 if ( favorite && authenticated ) { 
;__p+='\n\n         <a href="#" class="btnz btn-favorite favorited"><i class="icon-heart"></i> <span class="content">favorite</span></a>\n        \n    ';
 } else if ( authenticated) { 
;__p+='\n\n        <a href="#" class="btnz btn-favorite"><i class="icon-heart"></i> <span class="content">favorite</span></a>\n\n     ';
 } 
;__p+='\n\n    </li>\n\n    ';
 if ( remixable ) { 
;__p+='\n        <li>\n            <a href="'+
( path )+
''+
( id )+
'/remix" data-bypass="true" class="btnz btn-remix" ';
 if (window!=window.top ) { 
;__p+=' target="blank" ';
 } 
;__p+='><i class="icon-random"></i> <span class="content">remix</span></a>\n        </li>\n    ';
 } 
;__p+='\n    </ul>\n\n    <ul class ="share-network">\n        <li>\n            <a name="twitter" class="social-share-icon" href="'+
( share_links.twitter )+
'" target="blank"><i class="zsocial-twitter"></i></a>\n        </li>\n        <li>\n            <a name="facebook" class="social-share-icon" href="'+
( share_links.facebook )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n        </li>\n        <li>\n            <a name="tumblr" class="social-share-icon" href="'+
( share_links.tumblr )+
'" target="blank"><i class="zsocial-tumblr"></i></a>\n        </li>\n        <!-- <li>\n            <a name="reddit" class="social-share-icon" href="'+
( share_links.reddit )+
'" target="blank"><i class="zsocial-reddit"></i></a>\n        </li> -->\n    </ul>\n\n</div>';
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

this["JST"]["app/templates/remix-endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="end-page-wrapper" >\n\n    <div class="column project-current">\n        <div class="title">just watched</div>\n        <div class="user-token user-token-medium" style="\n            background-image: url('+
( user.thumbnail_url )+
');\n            background-size: cover;\n            background-position: center;\n        "></div>\n        <div class="username">'+
( user.display_name )+
'</div>\n    </div>\n\n    <div class="column column-arrow">\n        <div class="remix-arrow gradient1"></div>\n    </div>\n\n';
 if ( remix.remix ) { 
;__p+='\n    <div class="column project-parent">\n        <div class="title">up next</div>\n        <div class="user-token user-token-large" style="\n            background-image: url('+
( remix.parent.user.thumbnail_url )+
');\n            background-size: cover;\n            background-position: center;\n        "></div>\n        <div class="username">'+
( remix.parent.user.display_name )+
'</div>\n    </div>\n\n    ';
 if ( remix.parent.id != remix.root.id ) { 
;__p+='\n\n        <div class="column column-arrow">\n            <div class="remix-arrow gradient2"></div>\n        </div>\n\n        <div class="column project-root">\n            <div class="title">remixed from</div>\n            <div class="user-token user-token-medium" style="\n                background-image: url('+
( remix.root.user.thumbnail_url )+
');\n                background-size: cover;\n                background-position: center;\n            "></div>\n            <div class="username">'+
( remix.root.user.display_name )+
'</div>\n        </div>\n\n    ';
 } 
;__p+='\n';
 } 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/av/av.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">media controls</div>\n<a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n<div class="av-slider"></div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/checkbox/checkbox.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="roundedOne">\n    <input type="checkbox" value="None" id="roundedOne" name="check" />\n    <label for="roundedOne"></label>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/color/color.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( _title )+
'</div>\n<div class="color-selector">\n    <input class="simple_color" value="'+
( attr[ _propertyName ] )+
'"/>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/dropdown/dropdown.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="dropdown-wrapper">\n    <select class="'+
( propertyName )+
'-dropdown">\n        ';
 _.each( optionList, function( option ) { 
;__p+='\n            <option value="'+
( option.value )+
'">'+
( option.title )+
'</option>\n        ';
 }); 
;__p+='\n    </select>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkimage/linkimage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">type</div>\n<select class="link-image-select">\n    <option value="arrow_up">Up Arrow</option>\n    <option value="arrow_down">Down Arrow</option>\n    <option value="arrow_left">Left Arrow</option>\n    <option value="arrow_right">Right Arrow</option>\n    <option value="default">Glowing Rectangle</option>\n</select>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkto/linkto.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">link to</div>\n<div class="control-frame-thumb" style="\n    background: url('+
( thumbnail_url )+
') no-repeat center center; \n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <a href="#"></a>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <i class="icon-eye-open id-icon icon-white"></i>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/slider/slider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="control-name">'+
( title )+
'</div>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr[ _propertyName ] * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="control-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio-flash.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="audio-flash-'+
( id )+
'" data-src="'+
( attr.uri )+
'"  data-cue="'+
( attr.cue_in )+
'"  >\n    <div id="flash-'+
( id )+
'" %>" > \n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<audio id="audio-el-'+
( id )+
'" src="'+
( attr.uri )+
'" loop ></audio>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/end_page/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.uri )+
');\n    background-size: cover;\n    background-position: center;\n"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/image/zga.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.zga_uri )+
');\n">\n    <style>'+
( css )+
'</style>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n        <div class="divider">or</div>\n        <ul class="page-chooser-list clearfix"></ul>\n        <div class="bottom-chooser">\n            <a href="#" class="submit btnz btnz-submit btnz-inactive">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href=\'#\' class=\'ZEEGA-link-inner\'></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/rectangle/rectangle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/text-v2.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/textmodal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-content">\n    <div class="modal-title">Edit your text</div>\n    <div class="modal-body">\n\n        <div class="top-box clearfix">\n            <textarea rows="4" cols="59" maxlength="140" placeholder="Type your text here">'+
( attr.content )+
'</textarea>\n            <select class="font-list" id="font-list-'+
( id )+
'"></select>\n            <div class="textarea-info">max 140 characters</div>\n        </div>\n\n        <div class="bottom-chooser clearfix">\n            <a href="#" class="text-modal-save btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/player/templates/controls/arrows.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-prev controls-arrow arrow-left disabled"></a>\n<a href="#" class="ZEEGA-next controls-arrow arrow-right disabled"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/close.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-close">&times;</a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/playpause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-playpause pause-zcon"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/size-toggle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="size-toggle">\n    ';
 if ( previewMode == "mobile" ) { 
;__p+='\n        <i class="size-toggle-mobile"\n            title="Switch to laptop view"\n            data-gravity="w"\n        ></i>\n    ';
 } else { 
;__p+='\n        <i class="size-toggle-laptop"\n            title="Switch to mobile view"\n            data-gravity="w"\n        ></i>\n    ';
 } 
;__p+='\n</a>';
}
return __p;
};

this["JST"]["app/player/templates/layouts/player-layout.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-soundtrack"></div>\n<div class="ZEEGA-player-wrapper">\n    <div class="ZEEGA-player-window"></div>\n</div>';
}
return __p;
};