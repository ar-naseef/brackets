this.webpackChunk([2],{"../../node_modules/babel-plugin-syntax-jsx/lib/index.js":function(e,r,n){"use strict";r.__esModule=!0,r.default=function(){return{manipulateOptions:function(e,r){r.plugins.push("jsx")}}},e.exports=r.default},"../../node_modules/babel-plugin-transform-vue-jsx/index.js":function(e,r,n){"use strict";var t=n("../../node_modules/esutils/lib/utils.js"),s=n("../../node_modules/babel-plugin-transform-vue-jsx/lib/group-props.js"),i=n("../../node_modules/babel-plugin-transform-vue-jsx/lib/must-use-prop.js");e.exports=function(e){var r=e.types;return{inherits:n("../../node_modules/babel-plugin-syntax-jsx/lib/index.js"),visitor:{JSXNamespacedName:function(e){throw e.buildCodeFrameError("Namespaced tags/attributes are not supported. JSX is not XML.\nFor attributes like xlink:href, use xlinkHref instead.")},JSXElement:{exit:function(e,n){var i=function(e,n){e.parent.children=r.react.buildChildren(e.parent);var i,a=function e(n,s){if(r.isJSXIdentifier(n)){if("this"===n.name&&r.isReferenced(n,s))return r.thisExpression();if(!t.keyword.isIdentifierNameES6(n.name))return r.stringLiteral(n.name);n.type="Identifier"}else if(r.isJSXMemberExpression(n))return r.memberExpression(e(n.object,n),e(n.property,n));return n}(e.node.name,e.node),u=[];r.isIdentifier(a)?i=a.name:r.isLiteral(a)&&(i=a.value);r.react.isCompatTag(i)?u.push(r.stringLiteral(i)):u.push(a);var l=e.node.attributes;l.length&&(l=function(e,n){var t=[],i=[];function a(){t.length&&(i.push(r.objectExpression(t)),t=[])}for(;e.length;){var u=e.shift();r.isJSXSpreadAttribute(u)?(a(),u.argument._isSpread=!0,i.push(u.argument)):t.push(o(u))}if(a(),1===(i=i.map(function(e){return e._isSpread?e:s(e.properties,r)})).length)e=i[0];else if(i.length){var l=n.addImport("babel-helper-vue-jsx-merge-props","default","_mergeJSXProps");e=r.callExpression(l,[r.arrayExpression(i)])}return e}(l,n),u.push(l));return r.callExpression(r.identifier("h"),u)}(e.get("openingElement"),n);e.node.children.length&&(i.arguments.push(r.arrayExpression(e.node.children)),i.arguments.length>=3&&(i._prettyCall=!0)),e.replaceWith(r.inherits(i,e.node))}},Program:function(e){e.traverse({"ObjectMethod|ClassMethod":function(e){var n=e.get("params");if(!n.length||"h"!==n[0].node.name){var t={hasJsx:!1};if(e.traverse({JSXElement:function(){this.hasJsx=!0}},t),t.hasJsx&&!function e(r,n){return!!n.parentPath&&(!!r.isJSXExpressionContainer(n.parentPath)||e(r,n.parentPath))}(r,e)){var s="render"===e.node.key.name;e.get("body").unshiftContainer("body",r.variableDeclaration("const",[r.variableDeclarator(r.identifier("h"),s?r.memberExpression(r.identifier("arguments"),r.numericLiteral(0),!0):r.memberExpression(r.thisExpression(),r.identifier("$createElement")))]))}}},JSXOpeningElement:function(e){var n=e.get("name").node.name,t=e.get("attributes"),s=t.find(function(e){return e.node.name&&"type"===e.node.name.name}),o=s&&r.isStringLiteral(s.node.value)?s.node.value.value:null;t.forEach(function(e){var t=e.get("name");if(t.node){var s=t.node.name;i(n,o,s)&&r.isJSXExpressionContainer(e.node.value)&&t.replaceWith(r.JSXIdentifier("domProps-"+s))}})}})}}};function o(e){var n=function(e){return r.isJSXExpressionContainer(e)?e.expression:e}(e.value||r.booleanLiteral(!0));return r.isStringLiteral(n)&&!r.isJSXExpressionContainer(e.value)&&(n.value=n.value.replace(/\n\s+/g," ")),r.isValidIdentifier(e.name.name)?e.name.type="Identifier":e.name=r.stringLiteral(e.name.name),r.inherits(r.objectProperty(e.name,n),e)}}},"../../node_modules/babel-plugin-transform-vue-jsx/lib/group-props.js":function(e,r,n){"use strict";var t=i(n("../../node_modules/babel-runtime/core-js/json/stringify.js")),s=i(n("../../node_modules/babel-runtime/core-js/object/create.js"));function i(e){return e&&e.__esModule?e:{default:e}}var o=n("../../node_modules/babel-plugin-transform-vue-jsx/lib/make-map.js")("class,staticClass,style,key,ref,refInFor,slot,scopedSlots"),a=/^(props|domProps|on|nativeOn|hook)([\-_A-Z])/,u=/^v-/,l=/^xlink([A-Z])/;e.exports=function(e,r){var n=[],i=(0,s.default)(null);return e.forEach(function(e){var s=e.key.value||e.key.name;if(o(s))n.push(e);else{var d=s.match(a);if(d){var p=d[1],c=s.replace(a,function(e,r,n){return"-"===n?"":n.toLowerCase()}),m=r.objectProperty(r.stringLiteral(c),e.value),f=i[p];f?f.value.properties.push(m):(f=i[p]=r.objectProperty(r.identifier(p),r.objectExpression([m])),n.push(f))}else if(u.test(s)){s=s.replace(u,"");var b=i.directives;b||(b=i.directives=r.objectProperty(r.identifier("directives"),r.arrayExpression([])),n.push(b)),b.value.elements.push(r.objectExpression([r.objectProperty(r.identifier("name"),r.stringLiteral(s)),r.objectProperty(r.identifier("value"),e.value)]))}else{var j=i.attrs;l.test(e.key.name)&&(e.key.name=(0,t.default)(e.key.name.replace(l,function(e,r){return"xlink:"+r.toLowerCase()}))),j?j.value.properties.push(e):(j=i.attrs=r.objectProperty(r.identifier("attrs"),r.objectExpression([e])),n.push(j))}}}),r.objectExpression(n)}},"../../node_modules/babel-plugin-transform-vue-jsx/lib/make-map.js":function(e,r,n){"use strict";var t,s=n("../../node_modules/babel-runtime/core-js/object/create.js"),i=(t=s)&&t.__esModule?t:{default:t};e.exports=function(e){for(var r=(0,i.default)(null),n=e.split(","),t=0;t<n.length;t++)r[n[t]]=!0;return function(e){return r[e]}}},"../../node_modules/babel-plugin-transform-vue-jsx/lib/must-use-prop.js":function(e,r,n){"use strict";var t=["input","textarea","option","select"];e.exports=function(e,r,n){return"value"===n&&t.includes(e)&&"button"!==r||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e}},"../../node_modules/babel-runtime/core-js/json/stringify.js":function(e,r,n){e.exports={default:n("../../node_modules/core-js/library/fn/json/stringify.js"),__esModule:!0}},"../../node_modules/babel-runtime/core-js/object/create.js":function(e,r,n){e.exports={default:n("../../node_modules/core-js/library/fn/object/create.js"),__esModule:!0}},"../../node_modules/core-js/library/fn/object/create.js":function(e,r,n){n("../../node_modules/core-js/library/modules/es6.object.create.js");var t=n("../../node_modules/core-js/library/modules/_core.js").Object;e.exports=function(e,r){return t.create(e,r)}},"../../node_modules/core-js/library/modules/es6.object.create.js":function(e,r,n){var t=n("../../node_modules/core-js/library/modules/_export.js");t(t.S,"Object",{create:n("../../node_modules/core-js/library/modules/_object-create.js")})}});
//# sourceMappingURL=2.babel-transpiler.3340256c.worker.js.map