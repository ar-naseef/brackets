(this.webpackJsonp=this.webpackJsonp||[]).push([[9],{"./src/sandbox/eval/transpilers/vue/style-compiler/loader.js":function(e,n,s){"use strict";s.r(n);var t=s("./node_modules/babel-runtime/core-js/object/assign.js"),o=s.n(t),a=s("./node_modules/babel-runtime/core-js/promise.js"),r=s.n(a),i=s("./node_modules/postcss/lib/postcss.js"),u=s.n(i),c=(s("./src/sandbox/eval/transpiled-module.js"),s("./node_modules/postcss/lib/postcss.js").plugin("trim",function(e){return function(e){e.walk(function(e){"rule"!==e.type&&"atrule"!==e.type||(e.raws.before=e.raws.after="\n")})}})),p=s("./node_modules/babel-runtime/core-js/object/keys.js"),l=s.n(p),m=s("./node_modules/babel-runtime/core-js/object/create.js"),d=s.n(m),f=s("./node_modules/postcss/lib/postcss.js"),v=s("../../node_modules/postcss-selector-parser/dist/index.js"),b=f.plugin("add-id",function(e){return function(n){var s=d()(null);n.each(function n(t){t.selector?t.selector=v(function(n){n.each(function(n){var s=null;n.each(function(e){if("combinator"===e.type&&">>>"===e.value)return e.value=" ",e.spaces.before=e.spaces.after="",!1;if("tag"===e.type&&"/deep/"===e.value){var n=e.next();return"combinator"===n.type&&" "===n.value&&n.remove(),e.remove(),!1}"pseudo"!==e.type&&"combinator"!==e.type&&(s=e)}),n.insertAfter(s,v.attribute({attribute:e.id}))})}).process(t.selector).result:"atrule"===t.type&&("media"===t.name?t.each(n):"keyframes"===t.name&&(s[t.params]=t.params=t.params+"-"+e.id))}),l()(s).length&&n.walkDecls(function(e){/-?animation-name$/.test(e.prop)&&(e.value=e.value.split(",").map(function(e){return s[e.trim()]||e.trim()}).join(",")),/-?animation$/.test(e.prop)&&(e.value=e.value.split(",").map(function(e){var n=e.split(/\s+/),t=n[0];return s[t]?[s[t]].concat(n.slice(1)).join(" "):e}).join(","))})}});n.default=function(e,n){return new r.a(function(s,t){var a=n.options,r=n.options.__vueOptions__;r||(r=o()({},n.options.vue,n.vue));var i=[c],p={to:n.path,from:n.path,map:!1};return a.scoped&&i.push(b({id:a.id})),n.sourceMap&&!1!==r.cssSourceMap&&!n.map&&(p.map={inline:!1,annotation:!1,prev:n.map}),u()(i).process(null===e?void 0:e,p).then(function(e){e.messages&&e.messages.forEach(function(e){"dependency"===e.type&&n.addDependency(e.file)});var t=e.map&&e.map.toJSON();return s({transpiledCode:e.css,sourceMap:t}),null}).catch(function(e){return t(e)})})}},10:function(e,n){},9:function(e,n){}}]);
//# sourceMappingURL=vue-style-compiler.9a4e6c5a.chunk.js.map