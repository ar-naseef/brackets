(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BrowserFS"] = factory();
	else
		root["BrowserFS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(1);
/*</replacement>*/

var Readable = __webpack_require__(13);
var Writable = __webpack_require__(11);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Process = __webpack_require__(21);
var process = new Process(), processProxy = {};
function defineKey(key) {
    if (processProxy[key]) {
        // Probably a builtin Object property we don't care about.
        return;
    }
    if (typeof process[key] === 'function') {
        processProxy[key] = function () {
            return process[key].apply(process, arguments);
        };
    }
    else {
        processProxy[key] = process[key];
    }
}
for (var key in process) {
    // Don't check if process.hasOwnProperty; we want to also expose objects
    // up the prototype hierarchy.
    defineKey(key);
}
// Special key: Ensure we update public-facing values of stdin/stdout/stderr.
processProxy.initializeTTYs = function () {
    if (process.stdin === null) {
        process.initializeTTYs();
        processProxy.stdin = process.stdin;
        processProxy.stdout = process.stdout;
        processProxy.stderr = process.stderr;
    }
};
process.nextTick(function () {
    processProxy.initializeTTYs();
});
module.exports = processProxy;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(19)
var ieee754 = __webpack_require__(20)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).Buffer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(11);
exports.Duplex = __webpack_require__(0);
exports.Transform = __webpack_require__(17);
exports.PassThrough = __webpack_require__(28);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(4)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(1);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(27)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(14);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(10).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(15);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(0);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
function posixSplitPath(filename) {
    var out = splitPathRe.exec(filename);
    out.shift();
    return out;
}
/**
 * Emulates Node's `path` module. This module contains utilities for handling and
 * transforming file paths. **All** of these methods perform only string
 * transformations. The file system is not consulted to check whether paths are
 * valid.
 * @see http://nodejs.org/api/path.html
 * @class
 */
var path = (function () {
    function path() {
    }
    /**
     * Normalize a string path, taking care of '..' and '.' parts.
     *
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     * @example Usage example
     *   path.normalize('/foo/bar//baz/asdf/quux/..')
     *   // returns
     *   '/foo/bar/baz/asdf'
     * @param [String] p The path to normalize.
     * @return [String]
     */
    path.normalize = function (p) {
        // Special case: '' -> '.'
        if (p === '') {
            p = '.';
        }
        // It's very important to know if the path is relative or not, since it
        // changes how we process .. and reconstruct the split string.
        var absolute = p.charAt(0) === path.sep;
        // Remove repeated //s
        p = path._removeDuplicateSeps(p);
        // Try to remove as many '../' as possible, and remove '.' completely.
        var components = p.split(path.sep);
        var goodComponents = [];
        for (var idx = 0; idx < components.length; idx++) {
            var c = components[idx];
            if (c === '.') {
                continue;
            }
            else if (c === '..' && (absolute || (!absolute && goodComponents.length > 0 && goodComponents[0] !== '..'))) {
                // In the absolute case: Path is relative to root, so we may pop even if
                // goodComponents is empty (e.g. /../ => /)
                // In the relative case: We're getting rid of a directory that preceded
                // it (e.g. /foo/../bar -> /bar)
                goodComponents.pop();
            }
            else {
                goodComponents.push(c);
            }
        }
        // Add in '.' when it's a relative path with no other nonempty components.
        // Possible results: '.' and './' (input: [''] or [])
        // @todo Can probably simplify this logic.
        if (!absolute && goodComponents.length < 2) {
            switch (goodComponents.length) {
                case 1:
                    if (goodComponents[0] === '') {
                        goodComponents.unshift('.');
                    }
                    break;
                default:
                    goodComponents.push('.');
            }
        }
        p = goodComponents.join(path.sep);
        if (absolute && p.charAt(0) !== path.sep) {
            p = path.sep + p;
        }
        return p;
    };
    /**
     * Join all arguments together and normalize the resulting path.
     *
     * Arguments must be strings.
     * @example Usage
     *   path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
     *   // returns
     *   '/foo/bar/baz/asdf'
     *
     *   path.join('foo', {}, 'bar')
     *   // throws exception
     *   TypeError: Arguments to path.join must be strings
     * @param [String,...] paths Each component of the path
     * @return [String]
     */
    path.join = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i - 0] = arguments[_i];
        }
        // Required: Prune any non-strings from the path. I also prune empty segments
        // so we can do a simple join of the array.
        var processed = [];
        for (var i = 0; i < paths.length; i++) {
            var segment = paths[i];
            if (typeof segment !== 'string') {
                throw new TypeError("Invalid argument type to path.join: " + (typeof segment));
            }
            else if (segment !== '') {
                processed.push(segment);
            }
        }
        return path.normalize(processed.join(path.sep));
    };
    /**
     * Resolves to to an absolute path.
     *
     * If to isn't already absolute from arguments are prepended in right to left
     * order, until an absolute path is found. If after using all from paths still
     * no absolute path is found, the current working directory is used as well.
     * The resulting path is normalized, and trailing slashes are removed unless
     * the path gets resolved to the root directory. Non-string arguments are
     * ignored.
     *
     * Another way to think of it is as a sequence of cd commands in a shell.
     *
     *     path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
     *
     * Is similar to:
     *
     *     cd foo/bar
     *     cd /tmp/file/
     *     cd ..
     *     cd a/../subfile
     *     pwd
     *
     * The difference is that the different paths don't need to exist and may also
     * be files.
     * @example Usage example
     *   path.resolve('/foo/bar', './baz')
     *   // returns
     *   '/foo/bar/baz'
     *
     *   path.resolve('/foo/bar', '/tmp/file/')
     *   // returns
     *   '/tmp/file'
     *
     *   path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
     *   // if currently in /home/myself/node, it returns
     *   '/home/myself/node/wwwroot/static_files/gif/image.gif'
     * @param [String,...] paths
     * @return [String]
     */
    path.resolve = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i - 0] = arguments[_i];
        }
        // Monitor for invalid paths, throw out empty paths, and look for the *last*
        // absolute path that we see.
        var processed = [];
        for (var i = 0; i < paths.length; i++) {
            var p = paths[i];
            if (typeof p !== 'string') {
                throw new TypeError("Invalid argument type to path.join: " + (typeof p));
            }
            else if (p !== '') {
                // Remove anything that has occurred before this absolute path, as it
                // doesn't matter.
                if (p.charAt(0) === path.sep) {
                    processed = [];
                }
                processed.push(p);
            }
        }
        // Special: Remove trailing slash unless it's the root
        var resolved = path.normalize(processed.join(path.sep));
        if (resolved.length > 1 && resolved.charAt(resolved.length - 1) === path.sep) {
            return resolved.substr(0, resolved.length - 1);
        }
        // Special: If it doesn't start with '/', it's relative and we need to append
        // the current directory.
        if (resolved.charAt(0) !== path.sep) {
            // Remove ./, since we're going to append the current directory.
            if (resolved.charAt(0) === '.' && (resolved.length === 1 || resolved.charAt(1) === path.sep)) {
                resolved = resolved.length === 1 ? '' : resolved.substr(2);
            }
            // Append the current directory, which *must* be an absolute path.
            var cwd = process.cwd();
            if (resolved !== '') {
                // cwd will never end in a /... unless it's the root.
                resolved = this.normalize(cwd + (cwd !== '/' ? path.sep : '') + resolved);
            }
            else {
                resolved = cwd;
            }
        }
        return resolved;
    };
    /**
     * Solve the relative path from from to to.
     *
     * At times we have two absolute paths, and we need to derive the relative path
     * from one to the other. This is actually the reverse transform of
     * path.resolve, which means we see that:
     *
     *    path.resolve(from, path.relative(from, to)) == path.resolve(to)
     *
     * @example Usage example
     *   path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
     *   // returns
     *   '..\\..\\impl\\bbb'
     *
     *   path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
     *   // returns
     *   '../../impl/bbb'
     * @param [String] from
     * @param [String] to
     * @return [String]
     */
    path.relative = function (from, to) {
        var i;
        // Alright. Let's resolve these two to absolute paths and remove any
        // weirdness.
        from = path.resolve(from);
        to = path.resolve(to);
        var fromSegs = from.split(path.sep);
        var toSegs = to.split(path.sep);
        // Remove the first segment on both, as it's '' (both are absolute paths)
        toSegs.shift();
        fromSegs.shift();
        // There are two segments to this path:
        // * Going *up* the directory hierarchy with '..'
        // * Going *down* the directory hierarchy with foo/baz/bat.
        var upCount = 0;
        var downSegs = [];
        // Figure out how many things in 'from' are shared with 'to'.
        for (i = 0; i < fromSegs.length; i++) {
            var seg = fromSegs[i];
            if (seg === toSegs[i]) {
                continue;
            }
            // The rest of 'from', including the current element, indicates how many
            // directories we need to go up.
            upCount = fromSegs.length - i;
            break;
        }
        // The rest of 'to' indicates where we need to change to. We place this
        // outside of the loop, as toSegs.length may be greater than fromSegs.length.
        downSegs = toSegs.slice(i);
        // Special case: If 'from' is '/'
        if (fromSegs.length === 1 && fromSegs[0] === '') {
            upCount = 0;
        }
        // upCount can't be greater than the number of fromSegs
        // (cd .. from / is still /)
        if (upCount > fromSegs.length) {
            upCount = fromSegs.length;
        }
        // Create the final string!
        var rv = '';
        for (i = 0; i < upCount; i++) {
            rv += '../';
        }
        rv += downSegs.join(path.sep);
        // Special case: Remove trailing '/'. Happens if it's all up and no down.
        if (rv.length > 1 && rv.charAt(rv.length - 1) === path.sep) {
            rv = rv.substr(0, rv.length - 1);
        }
        return rv;
    };
    /**
     * Return the directory name of a path. Similar to the Unix `dirname` command.
     *
     * Note that BrowserFS does not validate if the path is actually a valid
     * directory.
     * @example Usage example
     *   path.dirname('/foo/bar/baz/asdf/quux')
     *   // returns
     *   '/foo/bar/baz/asdf'
     * @param [String] p The path to get the directory name of.
     * @return [String]
     */
    path.dirname = function (p) {
        // We get rid of //, but we don't modify anything else (e.g. any extraneous .
        // and ../ are kept intact)
        p = path._removeDuplicateSeps(p);
        var absolute = p.charAt(0) === path.sep;
        var sections = p.split(path.sep);
        // Do 1 if it's /foo/bar, 2 if it's /foo/bar/
        if (sections.pop() === '' && sections.length > 0) {
            sections.pop();
        }
        // # of sections needs to be > 1 if absolute, since the first section is '' for '/'.
        // If not absolute, the first section is the first part of the path, and is OK
        // to return.
        if (sections.length > 1 || (sections.length === 1 && !absolute)) {
            return sections.join(path.sep);
        }
        else if (absolute) {
            return path.sep;
        }
        else {
            return '.';
        }
    };
    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * @example Usage example
     *   path.basename('/foo/bar/baz/asdf/quux.html')
     *   // returns
     *   'quux.html'
     *
     *   path.basename('/foo/bar/baz/asdf/quux.html', '.html')
     *   // returns
     *   'quux'
     * @param [String] p
     * @param [String?] ext
     * @return [String]
     */
    path.basename = function (p, ext) {
        if (ext === void 0) { ext = ""; }
        // Special case: Normalize will modify this to '.'
        if (p === '') {
            return p;
        }
        // Normalize the string first to remove any weirdness.
        p = path.normalize(p);
        // Get the last part of the string.
        var sections = p.split(path.sep);
        var lastPart = sections[sections.length - 1];
        // Special case: If it's empty, then we have a string like so: foo/
        // Meaning, 'foo' is guaranteed to be a directory.
        if (lastPart === '' && sections.length > 1) {
            return sections[sections.length - 2];
        }
        // Remove the extension, if need be.
        if (ext.length > 0) {
            var lastPartExt = lastPart.substr(lastPart.length - ext.length);
            if (lastPartExt === ext) {
                return lastPart.substr(0, lastPart.length - ext.length);
            }
        }
        return lastPart;
    };
    /**
     * Return the extension of the path, from the last '.' to end of string in the
     * last portion of the path. If there is no '.' in the last portion of the path
     * or the first character of it is '.', then it returns an empty string.
     * @example Usage example
     *   path.extname('index.html')
     *   // returns
     *   '.html'
     *
     *   path.extname('index.')
     *   // returns
     *   '.'
     *
     *   path.extname('index')
     *   // returns
     *   ''
     * @param [String] p
     * @return [String]
     */
    path.extname = function (p) {
        p = path.normalize(p);
        var sections = p.split(path.sep);
        p = sections.pop();
        // Special case: foo/file.ext/ should return '.ext'
        if (p === '' && sections.length > 0) {
            p = sections.pop();
        }
        if (p === '..') {
            return '';
        }
        var i = p.lastIndexOf('.');
        if (i === -1 || i === 0) {
            return '';
        }
        return p.substr(i);
    };
    /**
     * Checks if the given path is an absolute path.
     *
     * Despite not being documented, this is a tested part of Node's path API.
     * @param [String] p
     * @return [Boolean] True if the path appears to be an absolute path.
     */
    path.isAbsolute = function (p) {
        return p.length > 0 && p.charAt(0) === path.sep;
    };
    /**
     * Unknown. Undocumented.
     */
    path._makeLong = function (p) {
        return p;
    };
    /**
     * Returns an object from a path string.
     */
    path.parse = function (p) {
        var allParts = posixSplitPath(p);
        return {
            root: allParts[0],
            dir: allParts[0] + allParts[1].slice(0, -1),
            base: allParts[2],
            ext: allParts[3],
            name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
        };
    };
    path.format = function (pathObject) {
        if (pathObject === null || typeof pathObject !== 'object') {
            throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof pathObject);
        }
        var root = pathObject.root || '';
        if (typeof root !== 'string') {
            throw new TypeError("'pathObject.root' must be a string or undefined, not " +
                typeof pathObject.root);
        }
        var dir = pathObject.dir ? pathObject.dir + path.sep : '';
        var base = pathObject.base || '';
        return dir + base;
    };
    path._removeDuplicateSeps = function (p) {
        p = p.replace(this._replaceRegex, this.sep);
        return p;
    };
    // The platform-specific file separator. BrowserFS uses `/`.
    path.sep = '/';
    path._replaceRegex = new RegExp("//+", 'g');
    // The platform-specific path delimiter. BrowserFS uses `:`.
    path.delimiter = ':';
    path.posix = path;
    // XXX: Typing hack. We don't actually support win32.
    path.win32 = path;
    return path;
}());
var _ = path;
module.exports = path;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(24);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(6).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(14);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(10).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(1);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(25);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(26);
var destroyImpl = __webpack_require__(15);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(16).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(0);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(16).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(2)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6).EventEmitter;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(4).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(0);

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(1);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = __webpack_require__(4);
var path = __webpack_require__(12);

/**
 * Standard libc error codes. Add more to this enum and ErrorStrings as they are
 * needed.
 * @url http://www.gnu.org/software/libc/manual/html_node/Error-Codes.html
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["EPERM"] = 1] = "EPERM";
    ErrorCode[ErrorCode["ENOENT"] = 2] = "ENOENT";
    ErrorCode[ErrorCode["EIO"] = 5] = "EIO";
    ErrorCode[ErrorCode["EBADF"] = 9] = "EBADF";
    ErrorCode[ErrorCode["EACCES"] = 13] = "EACCES";
    ErrorCode[ErrorCode["EBUSY"] = 16] = "EBUSY";
    ErrorCode[ErrorCode["EEXIST"] = 17] = "EEXIST";
    ErrorCode[ErrorCode["ENOTDIR"] = 20] = "ENOTDIR";
    ErrorCode[ErrorCode["EISDIR"] = 21] = "EISDIR";
    ErrorCode[ErrorCode["EINVAL"] = 22] = "EINVAL";
    ErrorCode[ErrorCode["EFBIG"] = 27] = "EFBIG";
    ErrorCode[ErrorCode["ENOSPC"] = 28] = "ENOSPC";
    ErrorCode[ErrorCode["EROFS"] = 30] = "EROFS";
    ErrorCode[ErrorCode["ENOTEMPTY"] = 39] = "ENOTEMPTY";
    ErrorCode[ErrorCode["ENOTSUP"] = 95] = "ENOTSUP";
})(ErrorCode || (ErrorCode = {}));
/* tslint:disable:variable-name */
/**
 * Strings associated with each error code.
 * @hidden
 */
var ErrorStrings = {};
ErrorStrings[ErrorCode.EPERM] = 'Operation not permitted.';
ErrorStrings[ErrorCode.ENOENT] = 'No such file or directory.';
ErrorStrings[ErrorCode.EIO] = 'Input/output error.';
ErrorStrings[ErrorCode.EBADF] = 'Bad file descriptor.';
ErrorStrings[ErrorCode.EACCES] = 'Permission denied.';
ErrorStrings[ErrorCode.EBUSY] = 'Resource busy or locked.';
ErrorStrings[ErrorCode.EEXIST] = 'File exists.';
ErrorStrings[ErrorCode.ENOTDIR] = 'File is not a directory.';
ErrorStrings[ErrorCode.EISDIR] = 'File is a directory.';
ErrorStrings[ErrorCode.EINVAL] = 'Invalid argument.';
ErrorStrings[ErrorCode.EFBIG] = 'File is too big.';
ErrorStrings[ErrorCode.ENOSPC] = 'No space left on disk.';
ErrorStrings[ErrorCode.EROFS] = 'Cannot modify a read-only file system.';
ErrorStrings[ErrorCode.ENOTEMPTY] = 'Directory is not empty.';
ErrorStrings[ErrorCode.ENOTSUP] = 'Operation is not supported.';
/* tslint:enable:variable-name */
/**
 * Represents a BrowserFS error. Passed back to applications after a failed
 * call to the BrowserFS API.
 */
var ApiError = (function (Error) {
    function ApiError(type, message, path$$1) {
        if ( message === void 0 ) message = ErrorStrings[type];

        Error.call(this, message);
        // Unsupported.
        this.syscall = "";
        this.errno = type;
        this.code = ErrorCode[type];
        this.path = path$$1;
        this.stack = new Error().stack;
        this.message = "Error: " + (this.code) + ": " + message + (this.path ? (", '" + (this.path) + "'") : '');
    }

    if ( Error ) ApiError.__proto__ = Error;
    ApiError.prototype = Object.create( Error && Error.prototype );
    ApiError.prototype.constructor = ApiError;
    ApiError.fromJSON = function fromJSON (json) {
        var err = new ApiError(0);
        err.errno = json.errno;
        err.code = json.code;
        err.path = json.path;
        err.stack = json.stack;
        err.message = json.message;
        return err;
    };
    /**
     * Creates an ApiError object from a buffer.
     */
    ApiError.fromBuffer = function fromBuffer (buffer$$1, i) {
        if ( i === void 0 ) i = 0;

        return ApiError.fromJSON(JSON.parse(buffer$$1.toString('utf8', i + 4, i + 4 + buffer$$1.readUInt32LE(i))));
    };
    ApiError.FileError = function FileError (code, p) {
        return new ApiError(code, ErrorStrings[code], p);
    };
    ApiError.ENOENT = function ENOENT (path$$1) {
        return this.FileError(ErrorCode.ENOENT, path$$1);
    };
    ApiError.EEXIST = function EEXIST (path$$1) {
        return this.FileError(ErrorCode.EEXIST, path$$1);
    };
    ApiError.EISDIR = function EISDIR (path$$1) {
        return this.FileError(ErrorCode.EISDIR, path$$1);
    };
    ApiError.ENOTDIR = function ENOTDIR (path$$1) {
        return this.FileError(ErrorCode.ENOTDIR, path$$1);
    };
    ApiError.EPERM = function EPERM (path$$1) {
        return this.FileError(ErrorCode.EPERM, path$$1);
    };
    ApiError.ENOTEMPTY = function ENOTEMPTY (path$$1) {
        return this.FileError(ErrorCode.ENOTEMPTY, path$$1);
    };
    /**
     * @return A friendly error message.
     */
    ApiError.prototype.toString = function toString () {
        return this.message;
    };
    ApiError.prototype.toJSON = function toJSON () {
        return {
            errno: this.errno,
            code: this.code,
            path: this.path,
            stack: this.stack,
            message: this.message
        };
    };
    /**
     * Writes the API error into a buffer.
     */
    ApiError.prototype.writeToBuffer = function writeToBuffer (buffer$$1, i) {
        if ( buffer$$1 === void 0 ) buffer$$1 = Buffer.alloc(this.bufferSize());
        if ( i === void 0 ) i = 0;

        var bytesWritten = buffer$$1.write(JSON.stringify(this.toJSON()), i + 4);
        buffer$$1.writeUInt32LE(bytesWritten, i);
        return buffer$$1;
    };
    /**
     * The size of the API error in buffer-form in bytes.
     */
    ApiError.prototype.bufferSize = function bufferSize () {
        // 4 bytes for string length.
        return 4 + Buffer.byteLength(JSON.stringify(this.toJSON()));
    };

    return ApiError;
}(Error));


var api_error = Object.freeze({
	get ErrorCode () { return ErrorCode; },
	ErrorStrings: ErrorStrings,
	ApiError: ApiError
});

var ActionType;
(function (ActionType) {
    // Indicates that the code should not do anything.
    ActionType[ActionType["NOP"] = 0] = "NOP";
    // Indicates that the code should throw an exception.
    ActionType[ActionType["THROW_EXCEPTION"] = 1] = "THROW_EXCEPTION";
    // Indicates that the code should truncate the file, but only if it is a file.
    ActionType[ActionType["TRUNCATE_FILE"] = 2] = "TRUNCATE_FILE";
    // Indicates that the code should create the file.
    ActionType[ActionType["CREATE_FILE"] = 3] = "CREATE_FILE";
})(ActionType || (ActionType = {}));
/**
 * Represents one of the following file flags. A convenience object.
 *
 * * `'r'` - Open file for reading. An exception occurs if the file does not exist.
 * * `'r+'` - Open file for reading and writing. An exception occurs if the file does not exist.
 * * `'rs'` - Open file for reading in synchronous mode. Instructs the filesystem to not cache writes.
 * * `'rs+'` - Open file for reading and writing, and opens the file in synchronous mode.
 * * `'w'` - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 * * `'wx'` - Like 'w' but opens the file in exclusive mode.
 * * `'w+'` - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
 * * `'wx+'` - Like 'w+' but opens the file in exclusive mode.
 * * `'a'` - Open file for appending. The file is created if it does not exist.
 * * `'ax'` - Like 'a' but opens the file in exclusive mode.
 * * `'a+'` - Open file for reading and appending. The file is created if it does not exist.
 * * `'ax+'` - Like 'a+' but opens the file in exclusive mode.
 *
 * Exclusive mode ensures that the file path is newly created.
 */
var FileFlag = function FileFlag(flagStr) {
    this.flagStr = flagStr;
    if (FileFlag.validFlagStrs.indexOf(flagStr) < 0) {
        throw new ApiError(ErrorCode.EINVAL, "Invalid flag: " + flagStr);
    }
};
/**
 * Get an object representing the given file flag.
 * @param modeStr The string representing the flag
 * @return The FileFlag object representing the flag
 * @throw when the flag string is invalid
 */
FileFlag.getFileFlag = function getFileFlag (flagStr) {
    // Check cache first.
    if (FileFlag.flagCache.hasOwnProperty(flagStr)) {
        return FileFlag.flagCache[flagStr];
    }
    return FileFlag.flagCache[flagStr] = new FileFlag(flagStr);
};
/**
 * Get the underlying flag string for this flag.
 */
FileFlag.prototype.getFlagString = function getFlagString () {
    return this.flagStr;
};
/**
 * Returns true if the file is readable.
 */
FileFlag.prototype.isReadable = function isReadable () {
    return this.flagStr.indexOf('r') !== -1 || this.flagStr.indexOf('+') !== -1;
};
/**
 * Returns true if the file is writeable.
 */
FileFlag.prototype.isWriteable = function isWriteable () {
    return this.flagStr.indexOf('w') !== -1 || this.flagStr.indexOf('a') !== -1 || this.flagStr.indexOf('+') !== -1;
};
/**
 * Returns true if the file mode should truncate.
 */
FileFlag.prototype.isTruncating = function isTruncating () {
    return this.flagStr.indexOf('w') !== -1;
};
/**
 * Returns true if the file is appendable.
 */
FileFlag.prototype.isAppendable = function isAppendable () {
    return this.flagStr.indexOf('a') !== -1;
};
/**
 * Returns true if the file is open in synchronous mode.
 */
FileFlag.prototype.isSynchronous = function isSynchronous () {
    return this.flagStr.indexOf('s') !== -1;
};
/**
 * Returns true if the file is open in exclusive mode.
 */
FileFlag.prototype.isExclusive = function isExclusive () {
    return this.flagStr.indexOf('x') !== -1;
};
/**
 * Returns one of the static fields on this object that indicates the
 * appropriate response to the path existing.
 */
FileFlag.prototype.pathExistsAction = function pathExistsAction () {
    if (this.isExclusive()) {
        return ActionType.THROW_EXCEPTION;
    }
    else if (this.isTruncating()) {
        return ActionType.TRUNCATE_FILE;
    }
    else {
        return ActionType.NOP;
    }
};
/**
 * Returns one of the static fields on this object that indicates the
 * appropriate response to the path not existing.
 */
FileFlag.prototype.pathNotExistsAction = function pathNotExistsAction () {
    if ((this.isWriteable() || this.isAppendable()) && this.flagStr !== 'r+') {
        return ActionType.CREATE_FILE;
    }
    else {
        return ActionType.THROW_EXCEPTION;
    }
};
// Contains cached FileMode instances.
FileFlag.flagCache = {};
// Array of valid mode strings.
FileFlag.validFlagStrs = ['r', 'r+', 'rs', 'rs+', 'w', 'wx', 'w+', 'wx+', 'a', 'ax', 'a+', 'ax+'];

/**
 * Indicates the type of the given file. Applied to 'mode'.
 */
var FileType;
(function (FileType) {
    FileType[FileType["FILE"] = 32768] = "FILE";
    FileType[FileType["DIRECTORY"] = 16384] = "DIRECTORY";
    FileType[FileType["SYMLINK"] = 40960] = "SYMLINK";
})(FileType || (FileType = {}));
/**
 * Emulation of Node's `fs.Stats` object.
 *
 * Attribute descriptions are from `man 2 stat'
 * @see http://nodejs.org/api/fs.html#fs_class_fs_stats
 * @see http://man7.org/linux/man-pages/man2/stat.2.html
 */
var Stats = function Stats(itemType, size, mode, atime, mtime, ctime) {
    if ( atime === void 0 ) atime = new Date();
    if ( mtime === void 0 ) mtime = new Date();
    if ( ctime === void 0 ) ctime = new Date();

    this.size = size;
    this.atime = atime;
    this.mtime = mtime;
    this.ctime = ctime;
    /**
     * UNSUPPORTED ATTRIBUTES
     * I assume no one is going to need these details, although we could fake
     * appropriate values if need be.
     */
    // ID of device containing file
    this.dev = 0;
    // inode number
    this.ino = 0;
    // device ID (if special file)
    this.rdev = 0;
    // number of hard links
    this.nlink = 1;
    // blocksize for file system I/O
    this.blksize = 4096;
    // @todo Maybe support these? atm, it's a one-user filesystem.
    // user ID of owner
    this.uid = 0;
    // group ID of owner
    this.gid = 0;
    // time file was created (currently unsupported)
    this.birthtime = new Date(0);
    // XXX: Some file systems stash data on stats objects.
    this.fileData = null;
    if (!mode) {
        switch (itemType) {
            case FileType.FILE:
                this.mode = 0x1a4;
                break;
            case FileType.DIRECTORY:
            default:
                this.mode = 0x1ff;
        }
    }
    else {
        this.mode = mode;
    }
    // number of 512B blocks allocated
    this.blocks = Math.ceil(size / 512);
    // Check if mode also includes top-most bits, which indicate the file's
    // type.
    if (this.mode < 0x1000) {
        this.mode |= itemType;
    }
};
Stats.fromBuffer = function fromBuffer (buffer$$1) {
    var size = buffer$$1.readUInt32LE(0), mode = buffer$$1.readUInt32LE(4), atime = buffer$$1.readDoubleLE(8), mtime = buffer$$1.readDoubleLE(16), ctime = buffer$$1.readDoubleLE(24);
    return new Stats(mode & 0xF000, size, mode & 0xFFF, new Date(atime), new Date(mtime), new Date(ctime));
};
Stats.prototype.toBuffer = function toBuffer () {
    var buffer$$1 = Buffer.alloc(32);
    buffer$$1.writeUInt32LE(this.size, 0);
    buffer$$1.writeUInt32LE(this.mode, 4);
    buffer$$1.writeDoubleLE(this.atime.getTime(), 8);
    buffer$$1.writeDoubleLE(this.mtime.getTime(), 16);
    buffer$$1.writeDoubleLE(this.ctime.getTime(), 24);
    return buffer$$1;
};
/**
 * **Nonstandard**: Clone the stats object.
 * @return [BrowserFS.node.fs.Stats]
 */
Stats.prototype.clone = function clone () {
    return new Stats(this.mode & 0xF000, this.size, this.mode & 0xFFF, this.atime, this.mtime, this.ctime);
};
/**
 * @return [Boolean] True if this item is a file.
 */
Stats.prototype.isFile = function isFile () {
    return (this.mode & 0xF000) === FileType.FILE;
};
/**
 * @return [Boolean] True if this item is a directory.
 */
Stats.prototype.isDirectory = function isDirectory () {
    return (this.mode & 0xF000) === FileType.DIRECTORY;
};
/**
 * @return [Boolean] True if this item is a symbolic link (only valid through lstat)
 */
Stats.prototype.isSymbolicLink = function isSymbolicLink () {
    return (this.mode & 0xF000) === FileType.SYMLINK;
};
/**
 * Change the mode of the file. We use this helper function to prevent messing
 * up the type of the file, which is encoded in mode.
 */
Stats.prototype.chmod = function chmod (mode) {
    this.mode = (this.mode & 0xF000) | mode;
};
// We don't support the following types of files.
Stats.prototype.isSocket = function isSocket () {
    return false;
};
Stats.prototype.isBlockDevice = function isBlockDevice () {
    return false;
};
Stats.prototype.isCharacterDevice = function isCharacterDevice () {
    return false;
};
Stats.prototype.isFIFO = function isFIFO () {
    return false;
};

/**
 * Wraps a callback function. Used for unit testing. Defaults to a NOP.
 * @hidden
 */
var wrapCb = function (cb, numArgs) {
    return cb;
};
/**
 * @hidden
 */
function assertRoot(fs) {
    if (fs) {
        return fs;
    }
    throw new ApiError(ErrorCode.EIO, "Initialize BrowserFS with a file system using BrowserFS.initialize(filesystem)");
}
/**
 * @hidden
 */
function normalizeMode(mode, def) {
    switch (typeof mode) {
        case 'number':
            // (path, flag, mode, cb?)
            return mode;
        case 'string':
            // (path, flag, modeString, cb?)
            var trueMode = parseInt(mode, 8);
            if (!isNaN(trueMode)) {
                return trueMode;
            }
            // Invalid string.
            return def;
        default:
            return def;
    }
}
/**
 * @hidden
 */
function normalizeTime(time) {
    if (time instanceof Date) {
        return time;
    }
    else if (typeof time === 'number') {
        return new Date(time * 1000);
    }
    else {
        throw new ApiError(ErrorCode.EINVAL, "Invalid time.");
    }
}
/**
 * @hidden
 */
function normalizePath(p) {
    // Node doesn't allow null characters in paths.
    if (p.indexOf('\u0000') >= 0) {
        throw new ApiError(ErrorCode.EINVAL, 'Path must be a string without null bytes.');
    }
    else if (p === '') {
        throw new ApiError(ErrorCode.EINVAL, 'Path must not be empty.');
    }
    return path.resolve(p);
}
/**
 * @hidden
 */
function normalizeOptions(options, defEnc, defFlag, defMode) {
    switch (typeof options) {
        case 'object':
            return {
                encoding: typeof options['encoding'] !== 'undefined' ? options['encoding'] : defEnc,
                flag: typeof options['flag'] !== 'undefined' ? options['flag'] : defFlag,
                mode: normalizeMode(options['mode'], defMode)
            };
        case 'string':
            return {
                encoding: options,
                flag: defFlag,
                mode: defMode
            };
        default:
            return {
                encoding: defEnc,
                flag: defFlag,
                mode: defMode
            };
    }
}
/**
 * The default callback is a NOP.
 * @hidden
 * @private
 */
function nopCb() {
    // NOP.
}
/**
 * The node frontend to all filesystems.
 * This layer handles:
 *
 * * Sanity checking inputs.
 * * Normalizing paths.
 * * Resetting stack depth for asynchronous operations which may not go through
 *   the browser by wrapping all input callbacks using `setImmediate`.
 * * Performing the requested operation through the filesystem or the file
 *   descriptor, as appropriate.
 * * Handling optional arguments and setting default arguments.
 * @see http://nodejs.org/api/fs.html
 */
var FS = function FS() {
    /* tslint:enable:variable-name */
    this.F_OK = 0;
    this.R_OK = 4;
    this.W_OK = 2;
    this.X_OK = 1;
    this.root = null;
    this.fdMap = {};
    this.nextFd = 100;
};
FS.prototype.initialize = function initialize (rootFS) {
    if (!rootFS.constructor.isAvailable()) {
        throw new ApiError(ErrorCode.EINVAL, 'Tried to instantiate BrowserFS with an unavailable file system.');
    }
    return this.root = rootFS;
};
/**
 * converts Date or number to a fractional UNIX timestamp
 * Grabbed from NodeJS sources (lib/fs.js)
 */
FS.prototype._toUnixTimestamp = function _toUnixTimestamp (time) {
    if (typeof time === 'number') {
        return time;
    }
    else if (time instanceof Date) {
        return time.getTime() / 1000;
    }
    throw new Error("Cannot parse time: " + time);
};
/**
 * **NONSTANDARD**: Grab the FileSystem instance that backs this API.
 * @return [BrowserFS.FileSystem | null] Returns null if the file system has
 *   not been initialized.
 */
FS.prototype.getRootFS = function getRootFS () {
    if (this.root) {
        return this.root;
    }
    else {
        return null;
    }
};
// FILE OR DIRECTORY METHODS
/**
 * Asynchronous rename. No arguments other than a possible exception are given
 * to the completion callback.
 * @param oldPath
 * @param newPath
 * @param callback
 */
FS.prototype.rename = function rename (oldPath, newPath, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        assertRoot(this.root).rename(normalizePath(oldPath), normalizePath(newPath), newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous rename.
 * @param oldPath
 * @param newPath
 */
FS.prototype.renameSync = function renameSync (oldPath, newPath) {
    assertRoot(this.root).renameSync(normalizePath(oldPath), normalizePath(newPath));
};
/**
 * Test whether or not the given path exists by checking with the file system.
 * Then call the callback argument with either true or false.
 * @example Sample invocation
 *   fs.exists('/etc/passwd', function (exists) {
 * util.debug(exists ? "it's there" : "no passwd!");
 *   });
 * @param path
 * @param callback
 */
FS.prototype.exists = function exists (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        return assertRoot(this.root).exists(normalizePath(path$$1), newCb);
    }
    catch (e) {
        // Doesn't return an error. If something bad happens, we assume it just
        // doesn't exist.
        return newCb(false);
    }
};
/**
 * Test whether or not the given path exists by checking with the file system.
 * @param path
 * @return [boolean]
 */
FS.prototype.existsSync = function existsSync (path$$1) {
    try {
        return assertRoot(this.root).existsSync(normalizePath(path$$1));
    }
    catch (e) {
        // Doesn't return an error. If something bad happens, we assume it just
        // doesn't exist.
        return false;
    }
};
/**
 * Asynchronous `stat`.
 * @param path
 * @param callback
 */
FS.prototype.stat = function stat (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 2);
    try {
        return assertRoot(this.root).stat(normalizePath(path$$1), false, newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
/**
 * Synchronous `stat`.
 * @param path
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.statSync = function statSync (path$$1) {
    return assertRoot(this.root).statSync(normalizePath(path$$1), false);
};
/**
 * Asynchronous `lstat`.
 * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
 * then the link itself is stat-ed, not the file that it refers to.
 * @param path
 * @param callback
 */
FS.prototype.lstat = function lstat (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 2);
    try {
        return assertRoot(this.root).stat(normalizePath(path$$1), true, newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
/**
 * Synchronous `lstat`.
 * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
 * then the link itself is stat-ed, not the file that it refers to.
 * @param path
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.lstatSync = function lstatSync (path$$1) {
    return assertRoot(this.root).statSync(normalizePath(path$$1), true);
};
FS.prototype.truncate = function truncate (path$$1, arg2, cb) {
        if ( arg2 === void 0 ) arg2 = 0;
        if ( cb === void 0 ) cb = nopCb;

    var len = 0;
    if (typeof arg2 === 'function') {
        cb = arg2;
    }
    else if (typeof arg2 === 'number') {
        len = arg2;
    }
    var newCb = wrapCb(cb, 1);
    try {
        if (len < 0) {
            throw new ApiError(ErrorCode.EINVAL);
        }
        return assertRoot(this.root).truncate(normalizePath(path$$1), len, newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
/**
 * Synchronous `truncate`.
 * @param path
 * @param len
 */
FS.prototype.truncateSync = function truncateSync (path$$1, len) {
        if ( len === void 0 ) len = 0;

    if (len < 0) {
        throw new ApiError(ErrorCode.EINVAL);
    }
    return assertRoot(this.root).truncateSync(normalizePath(path$$1), len);
};
/**
 * Asynchronous `unlink`.
 * @param path
 * @param callback
 */
FS.prototype.unlink = function unlink (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        return assertRoot(this.root).unlink(normalizePath(path$$1), newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
/**
 * Synchronous `unlink`.
 * @param path
 */
FS.prototype.unlinkSync = function unlinkSync (path$$1) {
    return assertRoot(this.root).unlinkSync(normalizePath(path$$1));
};
FS.prototype.open = function open (path$$1, flag, arg2, cb) {
        var this$1 = this;
        if ( cb === void 0 ) cb = nopCb;

    var mode = normalizeMode(arg2, 0x1a4);
    cb = typeof arg2 === 'function' ? arg2 : cb;
    var newCb = wrapCb(cb, 2);
    try {
        assertRoot(this.root).open(normalizePath(path$$1), FileFlag.getFileFlag(flag), mode, function (e, file) {
            if (file) {
                newCb(e, this$1.getFdForFile(file));
            }
            else {
                newCb(e);
            }
        });
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous file open.
 * @see http://www.manpagez.com/man/2/open/
 * @param path
 * @param flags
 * @param mode defaults to `0644`
 * @return [BrowserFS.File]
 */
FS.prototype.openSync = function openSync (path$$1, flag, mode) {
        if ( mode === void 0 ) mode = 0x1a4;

    return this.getFdForFile(assertRoot(this.root).openSync(normalizePath(path$$1), FileFlag.getFileFlag(flag), normalizeMode(mode, 0x1a4)));
};
FS.prototype.readFile = function readFile (filename, arg2, cb) {
        if ( arg2 === void 0 ) arg2 = {};
        if ( cb === void 0 ) cb = nopCb;

    var options = normalizeOptions(arg2, null, 'r', null);
    cb = typeof arg2 === 'function' ? arg2 : cb;
    var newCb = wrapCb(cb, 2);
    try {
        var flag = FileFlag.getFileFlag(options['flag']);
        if (!flag.isReadable()) {
            return newCb(new ApiError(ErrorCode.EINVAL, 'Flag passed to readFile must allow for reading.'));
        }
        return assertRoot(this.root).readFile(normalizePath(filename), options.encoding, flag, newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
FS.prototype.readFileSync = function readFileSync (filename, arg2) {
        if ( arg2 === void 0 ) arg2 = {};

    var options = normalizeOptions(arg2, null, 'r', null);
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isReadable()) {
        throw new ApiError(ErrorCode.EINVAL, 'Flag passed to readFile must allow for reading.');
    }
    return assertRoot(this.root).readFileSync(normalizePath(filename), options.encoding, flag);
};
FS.prototype.writeFile = function writeFile (filename, data, arg3, cb) {
        if ( arg3 === void 0 ) arg3 = {};
        if ( cb === void 0 ) cb = nopCb;

    var options = normalizeOptions(arg3, 'utf8', 'w', 0x1a4);
    cb = typeof arg3 === 'function' ? arg3 : cb;
    var newCb = wrapCb(cb, 1);
    try {
        var flag = FileFlag.getFileFlag(options.flag);
        if (!flag.isWriteable()) {
            return newCb(new ApiError(ErrorCode.EINVAL, 'Flag passed to writeFile must allow for writing.'));
        }
        return assertRoot(this.root).writeFile(normalizePath(filename), data, options.encoding, flag, options.mode, newCb);
    }
    catch (e) {
        return newCb(e);
    }
};
FS.prototype.writeFileSync = function writeFileSync (filename, data, arg3) {
    var options = normalizeOptions(arg3, 'utf8', 'w', 0x1a4);
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isWriteable()) {
        throw new ApiError(ErrorCode.EINVAL, 'Flag passed to writeFile must allow for writing.');
    }
    return assertRoot(this.root).writeFileSync(normalizePath(filename), data, options.encoding, flag, options.mode);
};
FS.prototype.appendFile = function appendFile (filename, data, arg3, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var options = normalizeOptions(arg3, 'utf8', 'a', 0x1a4);
    cb = typeof arg3 === 'function' ? arg3 : cb;
    var newCb = wrapCb(cb, 1);
    try {
        var flag = FileFlag.getFileFlag(options.flag);
        if (!flag.isAppendable()) {
            return newCb(new ApiError(ErrorCode.EINVAL, 'Flag passed to appendFile must allow for appending.'));
        }
        assertRoot(this.root).appendFile(normalizePath(filename), data, options.encoding, flag, options.mode, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
FS.prototype.appendFileSync = function appendFileSync (filename, data, arg3) {
    var options = normalizeOptions(arg3, 'utf8', 'a', 0x1a4);
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isAppendable()) {
        throw new ApiError(ErrorCode.EINVAL, 'Flag passed to appendFile must allow for appending.');
    }
    return assertRoot(this.root).appendFileSync(normalizePath(filename), data, options.encoding, flag, options.mode);
};
// FILE DESCRIPTOR METHODS
/**
 * Asynchronous `fstat`.
 * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
 * specified by the file descriptor `fd`.
 * @param fd
 * @param callback
 */
FS.prototype.fstat = function fstat (fd, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 2);
    try {
        var file = this.fd2file(fd);
        file.stat(newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `fstat`.
 * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
 * specified by the file descriptor `fd`.
 * @param fd
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.fstatSync = function fstatSync (fd) {
    return this.fd2file(fd).statSync();
};
/**
 * Asynchronous close.
 * @param fd
 * @param callback
 */
FS.prototype.close = function close (fd, cb) {
        var this$1 = this;
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        this.fd2file(fd).close(function (e) {
            if (!e) {
                this$1.closeFd(fd);
            }
            newCb(e);
        });
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous close.
 * @param fd
 */
FS.prototype.closeSync = function closeSync (fd) {
    this.fd2file(fd).closeSync();
    this.closeFd(fd);
};
FS.prototype.ftruncate = function ftruncate (fd, arg2, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var length = typeof arg2 === 'number' ? arg2 : 0;
    cb = typeof arg2 === 'function' ? arg2 : cb;
    var newCb = wrapCb(cb, 1);
    try {
        var file = this.fd2file(fd);
        if (length < 0) {
            throw new ApiError(ErrorCode.EINVAL);
        }
        file.truncate(length, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous ftruncate.
 * @param fd
 * @param len
 */
FS.prototype.ftruncateSync = function ftruncateSync (fd, len) {
        if ( len === void 0 ) len = 0;

    var file = this.fd2file(fd);
    if (len < 0) {
        throw new ApiError(ErrorCode.EINVAL);
    }
    file.truncateSync(len);
};
/**
 * Asynchronous fsync.
 * @param fd
 * @param callback
 */
FS.prototype.fsync = function fsync (fd, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        this.fd2file(fd).sync(newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous fsync.
 * @param fd
 */
FS.prototype.fsyncSync = function fsyncSync (fd) {
    this.fd2file(fd).syncSync();
};
/**
 * Asynchronous fdatasync.
 * @param fd
 * @param callback
 */
FS.prototype.fdatasync = function fdatasync (fd, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        this.fd2file(fd).datasync(newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous fdatasync.
 * @param fd
 */
FS.prototype.fdatasyncSync = function fdatasyncSync (fd) {
    this.fd2file(fd).datasyncSync();
};
FS.prototype.write = function write (fd, arg2, arg3, arg4, arg5, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var buffer$$1, offset, length, position = null;
    if (typeof arg2 === 'string') {
        // Signature 1: (fd, string, [position?, [encoding?]], cb?)
        var encoding = 'utf8';
        switch (typeof arg3) {
            case 'function':
                // (fd, string, cb)
                cb = arg3;
                break;
            case 'number':
                // (fd, string, position, encoding?, cb?)
                position = arg3;
                encoding = typeof arg4 === 'string' ? arg4 : 'utf8';
                cb = typeof arg5 === 'function' ? arg5 : cb;
                break;
            default:
                // ...try to find the callback and get out of here!
                cb = typeof arg4 === 'function' ? arg4 : typeof arg5 === 'function' ? arg5 : cb;
                return cb(new ApiError(ErrorCode.EINVAL, 'Invalid arguments.'));
        }
        buffer$$1 = Buffer.from(arg2, encoding);
        offset = 0;
        length = buffer$$1.length;
    }
    else {
        // Signature 2: (fd, buffer, offset, length, position?, cb?)
        buffer$$1 = arg2;
        offset = arg3;
        length = arg4;
        position = typeof arg5 === 'number' ? arg5 : null;
        cb = typeof arg5 === 'function' ? arg5 : cb;
    }
    var newCb = wrapCb(cb, 3);
    try {
        var file = this.fd2file(fd);
        if (position === undefined || position === null) {
            position = file.getPos();
        }
        file.write(buffer$$1, offset, length, position, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
FS.prototype.writeSync = function writeSync (fd, arg2, arg3, arg4, arg5) {
    var buffer$$1, offset = 0, length, position;
    if (typeof arg2 === 'string') {
        // Signature 1: (fd, string, [position?, [encoding?]])
        position = typeof arg3 === 'number' ? arg3 : null;
        var encoding = typeof arg4 === 'string' ? arg4 : 'utf8';
        offset = 0;
        buffer$$1 = Buffer.from(arg2, encoding);
        length = buffer$$1.length;
    }
    else {
        // Signature 2: (fd, buffer, offset, length, position?)
        buffer$$1 = arg2;
        offset = arg3;
        length = arg4;
        position = typeof arg5 === 'number' ? arg5 : null;
    }
    var file = this.fd2file(fd);
    if (position === undefined || position === null) {
        position = file.getPos();
    }
    return file.writeSync(buffer$$1, offset, length, position);
};
FS.prototype.read = function read (fd, arg2, arg3, arg4, arg5, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var position, offset, length, buffer$$1, newCb;
    if (typeof arg2 === 'number') {
        // legacy interface
        // (fd, length, position, encoding, callback)
        length = arg2;
        position = arg3;
        var encoding = arg4;
        cb = typeof arg5 === 'function' ? arg5 : cb;
        offset = 0;
        buffer$$1 = Buffer.alloc(length);
        // XXX: Inefficient.
        // Wrap the cb so we shelter upper layers of the API from these
        // shenanigans.
        newCb = wrapCb(function (err, bytesRead, buf) {
            if (err) {
                return cb(err);
            }
            cb(err, buf.toString(encoding), bytesRead);
        }, 3);
    }
    else {
        buffer$$1 = arg2;
        offset = arg3;
        length = arg4;
        position = arg5;
        newCb = wrapCb(cb, 3);
    }
    try {
        var file = this.fd2file(fd);
        if (position === undefined || position === null) {
            position = file.getPos();
        }
        file.read(buffer$$1, offset, length, position, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
FS.prototype.readSync = function readSync (fd, arg2, arg3, arg4, arg5) {
    var shenanigans = false;
    var buffer$$1, offset, length, position, encoding = 'utf8';
    if (typeof arg2 === 'number') {
        length = arg2;
        position = arg3;
        encoding = arg4;
        offset = 0;
        buffer$$1 = Buffer.alloc(length);
        shenanigans = true;
    }
    else {
        buffer$$1 = arg2;
        offset = arg3;
        length = arg4;
        position = arg5;
    }
    var file = this.fd2file(fd);
    if (position === undefined || position === null) {
        position = file.getPos();
    }
    var rv = file.readSync(buffer$$1, offset, length, position);
    if (!shenanigans) {
        return rv;
    }
    else {
        return [buffer$$1.toString(encoding), rv];
    }
};
/**
 * Asynchronous `fchown`.
 * @param fd
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.fchown = function fchown (fd, uid, gid, callback) {
        if ( callback === void 0 ) callback = nopCb;

    var newCb = wrapCb(callback, 1);
    try {
        this.fd2file(fd).chown(uid, gid, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `fchown`.
 * @param fd
 * @param uid
 * @param gid
 */
FS.prototype.fchownSync = function fchownSync (fd, uid, gid) {
    this.fd2file(fd).chownSync(uid, gid);
};
/**
 * Asynchronous `fchmod`.
 * @param fd
 * @param mode
 * @param callback
 */
FS.prototype.fchmod = function fchmod (fd, mode, cb) {
    var newCb = wrapCb(cb, 1);
    try {
        var numMode = typeof mode === 'string' ? parseInt(mode, 8) : mode;
        this.fd2file(fd).chmod(numMode, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `fchmod`.
 * @param fd
 * @param mode
 */
FS.prototype.fchmodSync = function fchmodSync (fd, mode) {
    var numMode = typeof mode === 'string' ? parseInt(mode, 8) : mode;
    this.fd2file(fd).chmodSync(numMode);
};
/**
 * Change the file timestamps of a file referenced by the supplied file
 * descriptor.
 * @param fd
 * @param atime
 * @param mtime
 * @param callback
 */
FS.prototype.futimes = function futimes (fd, atime, mtime, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        var file = this.fd2file(fd);
        if (typeof atime === 'number') {
            atime = new Date(atime * 1000);
        }
        if (typeof mtime === 'number') {
            mtime = new Date(mtime * 1000);
        }
        file.utimes(atime, mtime, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Change the file timestamps of a file referenced by the supplied file
 * descriptor.
 * @param fd
 * @param atime
 * @param mtime
 */
FS.prototype.futimesSync = function futimesSync (fd, atime, mtime) {
    this.fd2file(fd).utimesSync(normalizeTime(atime), normalizeTime(mtime));
};
// DIRECTORY-ONLY METHODS
/**
 * Asynchronous `rmdir`.
 * @param path
 * @param callback
 */
FS.prototype.rmdir = function rmdir (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).rmdir(path$$1, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `rmdir`.
 * @param path
 */
FS.prototype.rmdirSync = function rmdirSync (path$$1) {
    path$$1 = normalizePath(path$$1);
    return assertRoot(this.root).rmdirSync(path$$1);
};
/**
 * Asynchronous `mkdir`.
 * @param path
 * @param mode defaults to `0777`
 * @param callback
 */
FS.prototype.mkdir = function mkdir (path$$1, mode, cb) {
        if ( cb === void 0 ) cb = nopCb;

    if (typeof mode === 'function') {
        cb = mode;
        mode = 0x1ff;
    }
    var newCb = wrapCb(cb, 1);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).mkdir(path$$1, mode, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `mkdir`.
 * @param path
 * @param mode defaults to `0777`
 */
FS.prototype.mkdirSync = function mkdirSync (path$$1, mode) {
    assertRoot(this.root).mkdirSync(normalizePath(path$$1), normalizeMode(mode, 0x1ff));
};
/**
 * Asynchronous `readdir`. Reads the contents of a directory.
 * The callback gets two arguments `(err, files)` where `files` is an array of
 * the names of the files in the directory excluding `'.'` and `'..'`.
 * @param path
 * @param callback
 */
FS.prototype.readdir = function readdir (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 2);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).readdir(path$$1, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `readdir`. Reads the contents of a directory.
 * @param path
 * @return [String[]]
 */
FS.prototype.readdirSync = function readdirSync (path$$1) {
    path$$1 = normalizePath(path$$1);
    return assertRoot(this.root).readdirSync(path$$1);
};
// SYMLINK METHODS
/**
 * Asynchronous `link`.
 * @param srcpath
 * @param dstpath
 * @param callback
 */
FS.prototype.link = function link (srcpath, dstpath, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        srcpath = normalizePath(srcpath);
        dstpath = normalizePath(dstpath);
        assertRoot(this.root).link(srcpath, dstpath, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `link`.
 * @param srcpath
 * @param dstpath
 */
FS.prototype.linkSync = function linkSync (srcpath, dstpath) {
    srcpath = normalizePath(srcpath);
    dstpath = normalizePath(dstpath);
    return assertRoot(this.root).linkSync(srcpath, dstpath);
};
FS.prototype.symlink = function symlink (srcpath, dstpath, arg3, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var type = typeof arg3 === 'string' ? arg3 : 'file';
    cb = typeof arg3 === 'function' ? arg3 : cb;
    var newCb = wrapCb(cb, 1);
    try {
        if (type !== 'file' && type !== 'dir') {
            return newCb(new ApiError(ErrorCode.EINVAL, "Invalid type: " + type));
        }
        srcpath = normalizePath(srcpath);
        dstpath = normalizePath(dstpath);
        assertRoot(this.root).symlink(srcpath, dstpath, type, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `symlink`.
 * @param srcpath
 * @param dstpath
 * @param type can be either `'dir'` or `'file'` (default is `'file'`)
 */
FS.prototype.symlinkSync = function symlinkSync (srcpath, dstpath, type) {
    if (!type) {
        type = 'file';
    }
    else if (type !== 'file' && type !== 'dir') {
        throw new ApiError(ErrorCode.EINVAL, "Invalid type: " + type);
    }
    srcpath = normalizePath(srcpath);
    dstpath = normalizePath(dstpath);
    return assertRoot(this.root).symlinkSync(srcpath, dstpath, type);
};
/**
 * Asynchronous readlink.
 * @param path
 * @param callback
 */
FS.prototype.readlink = function readlink (path$$1, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 2);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).readlink(path$$1, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous readlink.
 * @param path
 * @return [String]
 */
FS.prototype.readlinkSync = function readlinkSync (path$$1) {
    path$$1 = normalizePath(path$$1);
    return assertRoot(this.root).readlinkSync(path$$1);
};
// PROPERTY OPERATIONS
/**
 * Asynchronous `chown`.
 * @param path
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.chown = function chown (path$$1, uid, gid, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).chown(path$$1, false, uid, gid, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `chown`.
 * @param path
 * @param uid
 * @param gid
 */
FS.prototype.chownSync = function chownSync (path$$1, uid, gid) {
    path$$1 = normalizePath(path$$1);
    assertRoot(this.root).chownSync(path$$1, false, uid, gid);
};
/**
 * Asynchronous `lchown`.
 * @param path
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.lchown = function lchown (path$$1, uid, gid, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).chown(path$$1, true, uid, gid, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `lchown`.
 * @param path
 * @param uid
 * @param gid
 */
FS.prototype.lchownSync = function lchownSync (path$$1, uid, gid) {
    path$$1 = normalizePath(path$$1);
    assertRoot(this.root).chownSync(path$$1, true, uid, gid);
};
/**
 * Asynchronous `chmod`.
 * @param path
 * @param mode
 * @param callback
 */
FS.prototype.chmod = function chmod (path$$1, mode, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        var numMode = normalizeMode(mode, -1);
        if (numMode < 0) {
            throw new ApiError(ErrorCode.EINVAL, "Invalid mode.");
        }
        assertRoot(this.root).chmod(normalizePath(path$$1), false, numMode, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `chmod`.
 * @param path
 * @param mode
 */
FS.prototype.chmodSync = function chmodSync (path$$1, mode) {
    var numMode = normalizeMode(mode, -1);
    if (numMode < 0) {
        throw new ApiError(ErrorCode.EINVAL, "Invalid mode.");
    }
    path$$1 = normalizePath(path$$1);
    assertRoot(this.root).chmodSync(path$$1, false, numMode);
};
/**
 * Asynchronous `lchmod`.
 * @param path
 * @param mode
 * @param callback
 */
FS.prototype.lchmod = function lchmod (path$$1, mode, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        var numMode = normalizeMode(mode, -1);
        if (numMode < 0) {
            throw new ApiError(ErrorCode.EINVAL, "Invalid mode.");
        }
        assertRoot(this.root).chmod(normalizePath(path$$1), true, numMode, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `lchmod`.
 * @param path
 * @param mode
 */
FS.prototype.lchmodSync = function lchmodSync (path$$1, mode) {
    var numMode = normalizeMode(mode, -1);
    if (numMode < 1) {
        throw new ApiError(ErrorCode.EINVAL, "Invalid mode.");
    }
    assertRoot(this.root).chmodSync(normalizePath(path$$1), true, numMode);
};
/**
 * Change file timestamps of the file referenced by the supplied path.
 * @param path
 * @param atime
 * @param mtime
 * @param callback
 */
FS.prototype.utimes = function utimes (path$$1, atime, mtime, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var newCb = wrapCb(cb, 1);
    try {
        assertRoot(this.root).utimes(normalizePath(path$$1), normalizeTime(atime), normalizeTime(mtime), newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Change file timestamps of the file referenced by the supplied path.
 * @param path
 * @param atime
 * @param mtime
 */
FS.prototype.utimesSync = function utimesSync (path$$1, atime, mtime) {
    assertRoot(this.root).utimesSync(normalizePath(path$$1), normalizeTime(atime), normalizeTime(mtime));
};
FS.prototype.realpath = function realpath (path$$1, arg2, cb) {
        if ( cb === void 0 ) cb = nopCb;

    var cache = typeof (arg2) === 'object' ? arg2 : {};
    cb = typeof (arg2) === 'function' ? arg2 : nopCb;
    var newCb = wrapCb(cb, 2);
    try {
        path$$1 = normalizePath(path$$1);
        assertRoot(this.root).realpath(path$$1, cache, newCb);
    }
    catch (e) {
        newCb(e);
    }
};
/**
 * Synchronous `realpath`.
 * @param path
 * @param cache An object literal of mapped paths that can be used to
 *   force a specific path resolution or avoid additional `fs.stat` calls for
 *   known real paths.
 * @return [String]
 */
FS.prototype.realpathSync = function realpathSync (path$$1, cache) {
        if ( cache === void 0 ) cache = {};

    path$$1 = normalizePath(path$$1);
    return assertRoot(this.root).realpathSync(path$$1, cache);
};
FS.prototype.watchFile = function watchFile (filename, arg2, listener) {
        if ( listener === void 0 ) listener = nopCb;

    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.unwatchFile = function unwatchFile (filename, listener) {
        if ( listener === void 0 ) listener = nopCb;

    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.watch = function watch (filename, arg2, listener) {
        if ( listener === void 0 ) listener = nopCb;

    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.access = function access (path$$1, arg2, cb) {
        if ( cb === void 0 ) cb = nopCb;

    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.accessSync = function accessSync (path$$1, mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.createReadStream = function createReadStream (path$$1, options) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.createWriteStream = function createWriteStream (path$$1, options) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * For unit testing. Passes all incoming callbacks to cbWrapper for wrapping.
 */
FS.prototype.wrapCallbacks = function wrapCallbacks (cbWrapper) {
    wrapCb = cbWrapper;
};
FS.prototype.getFdForFile = function getFdForFile (file) {
    var fd = this.nextFd++;
    this.fdMap[fd] = file;
    return fd;
};
FS.prototype.fd2file = function fd2file (fd) {
    var rv = this.fdMap[fd];
    if (rv) {
        return rv;
    }
    else {
        throw new ApiError(ErrorCode.EBADF, 'Invalid file descriptor.');
    }
};
FS.prototype.closeFd = function closeFd (fd) {
    delete this.fdMap[fd];
};

/* tslint:disable:variable-name */
// Exported fs.Stats.
FS.Stats = Stats;

// Manually export the individual public functions of fs.
// Required because some code will invoke functions off of the module.
// e.g.:
// let writeFile = fs.writeFile;
// writeFile(...)
/**
 * @hidden
 */
var fs = new FS();
/**
 * @hidden
 */
var _fsMock = {};
/**
 * @hidden
 */
var fsProto = FS.prototype;
Object.keys(fsProto).forEach(function (key) {
    if (typeof fs[key] === 'function') {
        _fsMock[key] = function () {
            return fs[key].apply(fs, arguments);
        };
    }
    else {
        _fsMock[key] = fs[key];
    }
});
_fsMock['changeFSModule'] = function (newFs) {
    fs = newFs;
};
_fsMock['getFSModule'] = function () {
    return fs;
};
_fsMock['FS'] = FS;

/*
 * Levenshtein distance, from the `js-levenshtein` NPM module.
 * Copied here to avoid complexity of adding another CommonJS module dependency.
 */
function _min(d0, d1, d2, bx, ay) {
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
}
/**
 * Calculates levenshtein distance.
 * @param a
 * @param b
 */
function levenshtein(a, b) {
    if (a === b) {
        return 0;
    }
    if (a.length > b.length) {
        var tmp = a;
        a = b;
        b = tmp;
    }
    var la = a.length;
    var lb = b.length;
    while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
        la--;
        lb--;
    }
    var offset = 0;
    while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
        offset++;
    }
    la -= offset;
    lb -= offset;
    if (la === 0 || lb === 1) {
        return lb;
    }
    var vector = new Array(la << 1);
    for (var y = 0; y < la;) {
        vector[la + y] = a.charCodeAt(offset + y);
        vector[y] = ++y;
    }
    var x;
    var d0;
    var d1;
    var d2;
    var d3;
    for (x = 0; (x + 3) < lb;) {
        var bx0 = b.charCodeAt(offset + (d0 = x));
        var bx1 = b.charCodeAt(offset + (d1 = x + 1));
        var bx2 = b.charCodeAt(offset + (d2 = x + 2));
        var bx3 = b.charCodeAt(offset + (d3 = x + 3));
        var dd$1 = (x += 4);
        for (var y$1 = 0; y$1 < la;) {
            var ay = vector[la + y$1];
            var dy = vector[y$1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd$1 = _min(d2, d3, dd$1, bx3, ay);
            vector[y$1++] = dd$1;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
        }
    }
    var dd = 0;
    for (; x < lb;) {
        var bx0$1 = b.charCodeAt(offset + (d0 = x));
        dd = ++x;
        for (var y$2 = 0; y$2 < la; y$2++) {
            var dy$1 = vector[y$2];
            vector[y$2] = dd = dy$1 < d0 || dd < d0
                ? dy$1 > dd ? dd + 1 : dy$1 + 1
                : bx0$1 === vector[la + y$2]
                    ? d0
                    : d0 + 1;
            d0 = dy$1;
        }
    }
    return dd;
}

function deprecationMessage(print, fsName, opts) {
    if (print) {
        // tslint:disable-next-line:no-console
        console.warn(("[" + fsName + "] Direct file system constructor usage is deprecated for this file system, and will be removed in the next major version. Please use the '" + fsName + ".Create(" + (JSON.stringify(opts)) + ", callback)' method instead. See https://github.com/jvilk/BrowserFS/issues/176 for more details."));
        // tslint:enable-next-line:no-console
    }
}
/**
 * Checks for any IE version, including IE11 which removed MSIE from the
 * userAgent string.
 * @hidden
 */
var isIE = typeof navigator !== "undefined" && !!(/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || navigator.userAgent.indexOf('Trident') !== -1);
/**
 * Check if we're in a web worker.
 * @hidden
 */
var isWebWorker = typeof window === "undefined";
/**
 * Throws an exception. Called on code paths that should be impossible.
 * @hidden
 */
function fail() {
    throw new Error("BFS has reached an impossible code path; please file a bug.");
}
/**
 * Synchronous recursive makedir.
 * @hidden
 */
function mkdirpSync(p, mode, fs) {
    if (!fs.existsSync(p)) {
        mkdirpSync(path.dirname(p), mode, fs);
        fs.mkdirSync(p, mode);
    }
}
/**
 * Converts a buffer into an array buffer. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 * @hidden
 */
function buffer2ArrayBuffer(buff) {
    var u8 = buffer2Uint8array(buff), u8offset = u8.byteOffset, u8Len = u8.byteLength;
    if (u8offset === 0 && u8Len === u8.buffer.byteLength) {
        return u8.buffer;
    }
    else {
        return u8.buffer.slice(u8offset, u8offset + u8Len);
    }
}
/**
 * Converts a buffer into a Uint8Array. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 * @hidden
 */
function buffer2Uint8array(buff) {
    if (buff instanceof Uint8Array) {
        // BFS & Node v4.0 buffers *are* Uint8Arrays.
        return buff;
    }
    else {
        // Uint8Arrays can be constructed from arrayish numbers.
        // At this point, we assume this isn't a BFS array.
        return new Uint8Array(buff);
    }
}
/**
 * Converts the given arrayish object into a Buffer. Attempts to
 * be zero-copy.
 * @hidden
 */
function arrayish2Buffer(arr) {
    if (arr instanceof Buffer) {
        return arr;
    }
    else if (arr instanceof Uint8Array) {
        return uint8Array2Buffer(arr);
    }
    else {
        return Buffer.from(arr);
    }
}
/**
 * Converts the given Uint8Array into a Buffer. Attempts to be zero-copy.
 * @hidden
 */
function uint8Array2Buffer(u8) {
    if (u8 instanceof Buffer) {
        return u8;
    }
    else if (u8.byteOffset === 0 && u8.byteLength === u8.buffer.byteLength) {
        return arrayBuffer2Buffer(u8.buffer);
    }
    else {
        return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
    }
}
/**
 * Converts the given array buffer into a Buffer. Attempts to be
 * zero-copy.
 * @hidden
 */
function arrayBuffer2Buffer(ab) {
    return Buffer.from(ab);
}
/**
 * Copies a slice of the given buffer
 * @hidden
 */
function copyingSlice(buff, start, end) {
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = buff.length;

    if (start < 0 || end < 0 || end > buff.length || start > end) {
        throw new TypeError(("Invalid slice bounds on buffer of length " + (buff.length) + ": [" + start + ", " + end + "]"));
    }
    if (buff.length === 0) {
        // Avoid s0 corner case in ArrayBuffer case.
        return emptyBuffer();
    }
    else {
        var u8 = buffer2Uint8array(buff), s0 = buff[0], newS0 = (s0 + 1) % 0xFF;
        buff[0] = newS0;
        if (u8[0] === newS0) {
            // Same memory. Revert & copy.
            u8[0] = s0;
            return uint8Array2Buffer(u8.slice(start, end));
        }
        else {
            // Revert.
            buff[0] = s0;
            return uint8Array2Buffer(u8.subarray(start, end));
        }
    }
}
/**
 * @hidden
 */
var emptyBuff = null;
/**
 * Returns an empty buffer.
 * @hidden
 */
function emptyBuffer() {
    if (emptyBuff) {
        return emptyBuff;
    }
    return emptyBuff = Buffer.alloc(0);
}
/**
 * Option validator for a Buffer file system option.
 * @hidden
 */
function bufferValidator(v, cb) {
    if (Buffer.isBuffer(v)) {
        cb();
    }
    else {
        cb(new ApiError(ErrorCode.EINVAL, "option must be a Buffer."));
    }
}
/**
 * Checks that the given options object is valid for the file system options.
 * @hidden
 */
function checkOptions(fsType, opts, cb) {
    var optsInfo = fsType.Options;
    var fsName = fsType.Name;
    var pendingValidators = 0;
    var callbackCalled = false;
    var loopEnded = false;
    function validatorCallback(e) {
        if (!callbackCalled) {
            if (e) {
                callbackCalled = true;
                cb(e);
            }
            pendingValidators--;
            if (pendingValidators === 0 && loopEnded) {
                cb();
            }
        }
    }
    // Check for required options.
    var loop = function ( optName ) {
        if (optsInfo.hasOwnProperty(optName)) {
            var opt = optsInfo[optName];
            var providedValue = opts[optName];
            if (providedValue === undefined || providedValue === null) {
                if (!opt.optional) {
                    // Required option, not provided.
                    // Any incorrect options provided? Which ones are close to the provided one?
                    // (edit distance 5 === close)
                    var incorrectOptions = Object.keys(opts).filter(function (o) { return !(o in optsInfo); }).map(function (a) {
                        return { str: a, distance: levenshtein(optName, a) };
                    }).filter(function (o) { return o.distance < 5; }).sort(function (a, b) { return a.distance - b.distance; });
                    // Validators may be synchronous.
                    if (callbackCalled) {
                        return {};
                    }
                    callbackCalled = true;
                    return { v: cb(new ApiError(ErrorCode.EINVAL, ("[" + fsName + "] Required option '" + optName + "' not provided." + (incorrectOptions.length > 0 ? (" You provided unrecognized option '" + (incorrectOptions[0].str) + "'; perhaps you meant to type '" + optName + "'.") : '') + "\nOption description: " + (opt.description)))) };
                }
                // Else: Optional option, not provided. That is OK.
            }
            else {
                // Option provided! Check type.
                var typeMatches = false;
                if (Array.isArray(opt.type)) {
                    typeMatches = opt.type.indexOf(typeof (providedValue)) !== -1;
                }
                else {
                    typeMatches = typeof (providedValue) === opt.type;
                }
                if (!typeMatches) {
                    // Validators may be synchronous.
                    if (callbackCalled) {
                        return {};
                    }
                    callbackCalled = true;
                    return { v: cb(new ApiError(ErrorCode.EINVAL, ("[" + fsName + "] Value provided for option " + optName + " is not the proper type. Expected " + (Array.isArray(opt.type) ? ("one of {" + (opt.type.join(", ")) + "}") : opt.type) + ", but received " + (typeof (providedValue)) + "\nOption description: " + (opt.description)))) };
                }
                else if (opt.validator) {
                    pendingValidators++;
                    opt.validator(providedValue, validatorCallback);
                }
                // Otherwise: All good!
            }
        }
    };

    for (var optName in optsInfo) {
        var returned = loop( optName );

        if ( returned ) return returned.v;
    }
    loopEnded = true;
    if (pendingValidators === 0 && !callbackCalled) {
        cb();
    }
}


var BFSUtils = Object.freeze({
	deprecationMessage: deprecationMessage,
	isIE: isIE,
	isWebWorker: isWebWorker,
	fail: fail,
	mkdirpSync: mkdirpSync,
	buffer2ArrayBuffer: buffer2ArrayBuffer,
	buffer2Uint8array: buffer2Uint8array,
	arrayish2Buffer: arrayish2Buffer,
	uint8Array2Buffer: uint8Array2Buffer,
	arrayBuffer2Buffer: arrayBuffer2Buffer,
	copyingSlice: copyingSlice,
	emptyBuffer: emptyBuffer,
	bufferValidator: bufferValidator,
	checkOptions: checkOptions
});

var BFSEmscriptenStreamOps = function BFSEmscriptenStreamOps(fs) {
    this.fs = fs;
    this.nodefs = fs.getNodeFS();
    this.FS = fs.getFS();
    this.PATH = fs.getPATH();
    this.ERRNO_CODES = fs.getERRNO_CODES();
};
BFSEmscriptenStreamOps.prototype.open = function open (stream) {
    var path$$1 = this.fs.realPath(stream.node);
    var FS = this.FS;
    try {
        if (FS.isFile(stream.node.mode)) {
            stream.nfd = this.nodefs.openSync(path$$1, this.fs.flagsToPermissionString(stream.flags));
        }
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenStreamOps.prototype.close = function close (stream) {
    var FS = this.FS;
    try {
        if (FS.isFile(stream.node.mode) && stream.nfd) {
            this.nodefs.closeSync(stream.nfd);
        }
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenStreamOps.prototype.read = function read (stream, buffer$$1, offset, length, position) {
    // Avoid copying overhead by reading directly into buffer.
    try {
        return this.nodefs.readSync(stream.nfd, uint8Array2Buffer(buffer$$1), offset, length, position);
    }
    catch (e) {
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenStreamOps.prototype.write = function write (stream, buffer$$1, offset, length, position) {
    // Avoid copying overhead.
    try {
        return this.nodefs.writeSync(stream.nfd, uint8Array2Buffer(buffer$$1), offset, length, position);
    }
    catch (e) {
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenStreamOps.prototype.llseek = function llseek (stream, offset, whence) {
    var position = offset;
    if (whence === 1) {
        position += stream.position;
    }
    else if (whence === 2) {
        if (this.FS.isFile(stream.node.mode)) {
            try {
                var stat = this.nodefs.fstatSync(stream.nfd);
                position += stat.size;
            }
            catch (e) {
                throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
            }
        }
    }
    if (position < 0) {
        throw new this.FS.ErrnoError(this.ERRNO_CODES.EINVAL);
    }
    stream.position = position;
    return position;
};
var BFSEmscriptenNodeOps = function BFSEmscriptenNodeOps(fs) {
    this.fs = fs;
    this.nodefs = fs.getNodeFS();
    this.FS = fs.getFS();
    this.PATH = fs.getPATH();
    this.ERRNO_CODES = fs.getERRNO_CODES();
};
BFSEmscriptenNodeOps.prototype.getattr = function getattr (node) {
    var path$$1 = this.fs.realPath(node);
    var stat;
    try {
        stat = this.nodefs.lstatSync(path$$1);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
    return {
        dev: stat.dev,
        ino: stat.ino,
        mode: stat.mode,
        nlink: stat.nlink,
        uid: stat.uid,
        gid: stat.gid,
        rdev: stat.rdev,
        size: stat.size,
        atime: stat.atime,
        mtime: stat.mtime,
        ctime: stat.ctime,
        blksize: stat.blksize,
        blocks: stat.blocks
    };
};
BFSEmscriptenNodeOps.prototype.setattr = function setattr (node, attr) {
    var path$$1 = this.fs.realPath(node);
    try {
        if (attr.mode !== undefined) {
            this.nodefs.chmodSync(path$$1, attr.mode);
            // update the common node structure mode as well
            node.mode = attr.mode;
        }
        if (attr.timestamp !== undefined) {
            var date = new Date(attr.timestamp);
            this.nodefs.utimesSync(path$$1, date, date);
        }
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        // Ignore not supported errors. Emscripten does utimesSync when it
        // writes files, but never really requires the value to be set.
        if (e.code !== "ENOTSUP") {
            throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
        }
    }
    if (attr.size !== undefined) {
        try {
            this.nodefs.truncateSync(path$$1, attr.size);
        }
        catch (e) {
            if (!e.code) {
                throw e;
            }
            throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
        }
    }
};
BFSEmscriptenNodeOps.prototype.lookup = function lookup (parent, name) {
    var path$$1 = this.PATH.join2(this.fs.realPath(parent), name);
    var mode = this.fs.getMode(path$$1);
    return this.fs.createNode(parent, name, mode);
};
BFSEmscriptenNodeOps.prototype.mknod = function mknod (parent, name, mode, dev) {
    var node = this.fs.createNode(parent, name, mode, dev);
    // create the backing node for this in the fs root as well
    var path$$1 = this.fs.realPath(node);
    try {
        if (this.FS.isDir(node.mode)) {
            this.nodefs.mkdirSync(path$$1, node.mode);
        }
        else {
            this.nodefs.writeFileSync(path$$1, '', { mode: node.mode });
        }
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
    return node;
};
BFSEmscriptenNodeOps.prototype.rename = function rename (oldNode, newDir, newName) {
    var oldPath = this.fs.realPath(oldNode);
    var newPath = this.PATH.join2(this.fs.realPath(newDir), newName);
    try {
        this.nodefs.renameSync(oldPath, newPath);
        // This logic is missing from the original NodeFS,
        // causing Emscripten's filesystem to think that the old file still exists.
        oldNode.name = newName;
        oldNode.parent = newDir;
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenNodeOps.prototype.unlink = function unlink (parent, name) {
    var path$$1 = this.PATH.join2(this.fs.realPath(parent), name);
    try {
        this.nodefs.unlinkSync(path$$1);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenNodeOps.prototype.rmdir = function rmdir (parent, name) {
    var path$$1 = this.PATH.join2(this.fs.realPath(parent), name);
    try {
        this.nodefs.rmdirSync(path$$1);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenNodeOps.prototype.readdir = function readdir (node) {
    var path$$1 = this.fs.realPath(node);
    try {
        // Node does not list . and .. in directory listings,
        // but Emscripten expects it.
        var contents = this.nodefs.readdirSync(path$$1);
        contents.push('.', '..');
        return contents;
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenNodeOps.prototype.symlink = function symlink (parent, newName, oldPath) {
    var newPath = this.PATH.join2(this.fs.realPath(parent), newName);
    try {
        this.nodefs.symlinkSync(oldPath, newPath);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
BFSEmscriptenNodeOps.prototype.readlink = function readlink (node) {
    var path$$1 = this.fs.realPath(node);
    try {
        return this.nodefs.readlinkSync(path$$1);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
};
var BFSEmscriptenFS = function BFSEmscriptenFS(_FS, _PATH, _ERRNO_CODES, nodefs) {
    if ( _FS === void 0 ) _FS = self['FS'];
    if ( _PATH === void 0 ) _PATH = self['PATH'];
    if ( _ERRNO_CODES === void 0 ) _ERRNO_CODES = self['ERRNO_CODES'];
    if ( nodefs === void 0 ) nodefs = _fsMock;

    // This maps the integer permission modes from http://linux.die.net/man/3/open
    // to node.js-specific file open permission strings at http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
    this.flagsToPermissionStringMap = {
        0 /*O_RDONLY*/: 'r',
        1 /*O_WRONLY*/: 'r+',
        2 /*O_RDWR*/: 'r+',
        64 /*O_CREAT*/: 'r',
        65 /*O_WRONLY|O_CREAT*/: 'r+',
        66 /*O_RDWR|O_CREAT*/: 'r+',
        129 /*O_WRONLY|O_EXCL*/: 'rx+',
        193 /*O_WRONLY|O_CREAT|O_EXCL*/: 'rx+',
        514 /*O_RDWR|O_TRUNC*/: 'w+',
        577 /*O_WRONLY|O_CREAT|O_TRUNC*/: 'w',
        578 /*O_CREAT|O_RDWR|O_TRUNC*/: 'w+',
        705 /*O_WRONLY|O_CREAT|O_EXCL|O_TRUNC*/: 'wx',
        706 /*O_RDWR|O_CREAT|O_EXCL|O_TRUNC*/: 'wx+',
        1024 /*O_APPEND*/: 'a',
        1025 /*O_WRONLY|O_APPEND*/: 'a',
        1026 /*O_RDWR|O_APPEND*/: 'a+',
        1089 /*O_WRONLY|O_CREAT|O_APPEND*/: 'a',
        1090 /*O_RDWR|O_CREAT|O_APPEND*/: 'a+',
        1153 /*O_WRONLY|O_EXCL|O_APPEND*/: 'ax',
        1154 /*O_RDWR|O_EXCL|O_APPEND*/: 'ax+',
        1217 /*O_WRONLY|O_CREAT|O_EXCL|O_APPEND*/: 'ax',
        1218 /*O_RDWR|O_CREAT|O_EXCL|O_APPEND*/: 'ax+',
        4096 /*O_RDONLY|O_DSYNC*/: 'rs',
        4098 /*O_RDWR|O_DSYNC*/: 'rs+'
    };
    this.nodefs = nodefs;
    this.FS = _FS;
    this.PATH = _PATH;
    this.ERRNO_CODES = _ERRNO_CODES;
    this.node_ops = new BFSEmscriptenNodeOps(this);
    this.stream_ops = new BFSEmscriptenStreamOps(this);
};
BFSEmscriptenFS.prototype.mount = function mount (m) {
    return this.createNode(null, '/', this.getMode(m.opts.root), 0);
};
BFSEmscriptenFS.prototype.createNode = function createNode (parent, name, mode, dev) {
    var FS = this.FS;
    if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
        throw new FS.ErrnoError(this.ERRNO_CODES.EINVAL);
    }
    var node = FS.createNode(parent, name, mode);
    node.node_ops = this.node_ops;
    node.stream_ops = this.stream_ops;
    return node;
};
BFSEmscriptenFS.prototype.getMode = function getMode (path$$1) {
    var stat;
    try {
        stat = this.nodefs.lstatSync(path$$1);
    }
    catch (e) {
        if (!e.code) {
            throw e;
        }
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
    return stat.mode;
};
BFSEmscriptenFS.prototype.realPath = function realPath (node) {
    var parts = [];
    while (node.parent !== node) {
        parts.push(node.name);
        node = node.parent;
    }
    parts.push(node.mount.opts.root);
    parts.reverse();
    return this.PATH.join.apply(null, parts);
};
BFSEmscriptenFS.prototype.flagsToPermissionString = function flagsToPermissionString (flags) {
    var parsedFlags = (typeof flags === "string") ? parseInt(flags, 10) : flags;
    parsedFlags &= 0x1FFF;
    if (parsedFlags in this.flagsToPermissionStringMap) {
        return this.flagsToPermissionStringMap[parsedFlags];
    }
    else {
        return flags;
    }
};
BFSEmscriptenFS.prototype.getNodeFS = function getNodeFS () {
    return this.nodefs;
};
BFSEmscriptenFS.prototype.getFS = function getFS () {
    return this.FS;
};
BFSEmscriptenFS.prototype.getPATH = function getPATH () {
    return this.PATH;
};
BFSEmscriptenFS.prototype.getERRNO_CODES = function getERRNO_CODES () {
    return this.ERRNO_CODES;
};

/**
 * Basic filesystem class. Most filesystems should extend this class, as it
 * provides default implementations for a handful of methods.
 */
var BaseFileSystem = function BaseFileSystem () {};

BaseFileSystem.prototype.supportsLinks = function supportsLinks () {
    return false;
};
BaseFileSystem.prototype.diskSpace = function diskSpace (p, cb) {
    cb(0, 0);
};
/**
 * Opens the file at path p with the given flag. The file must exist.
 * @param p The path to open.
 * @param flag The flag to use when opening the file.
 */
BaseFileSystem.prototype.openFile = function openFile (p, flag, cb) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Create the file at path p with the given mode. Then, open it with the given
 * flag.
 */
BaseFileSystem.prototype.createFile = function createFile (p, flag, mode, cb) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.open = function open (p, flag, mode, cb) {
        var this$1 = this;

    var mustBeFile = function (e, stats) {
        if (e) {
            // File does not exist.
            switch (flag.pathNotExistsAction()) {
                case ActionType.CREATE_FILE:
                    // Ensure parent exists.
                    return this$1.stat(path.dirname(p), false, function (e, parentStats) {
                        if (e) {
                            cb(e);
                        }
                        else if (parentStats && !parentStats.isDirectory()) {
                            cb(ApiError.ENOTDIR(path.dirname(p)));
                        }
                        else {
                            this$1.createFile(p, flag, mode, cb);
                        }
                    });
                case ActionType.THROW_EXCEPTION:
                    return cb(ApiError.ENOENT(p));
                default:
                    return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.'));
            }
        }
        else {
            // File exists.
            if (stats && stats.isDirectory()) {
                return cb(ApiError.EISDIR(p));
            }
            switch (flag.pathExistsAction()) {
                case ActionType.THROW_EXCEPTION:
                    return cb(ApiError.EEXIST(p));
                case ActionType.TRUNCATE_FILE:
                    // NOTE: In a previous implementation, we deleted the file and
                    // re-created it. However, this created a race condition if another
                    // asynchronous request was trying to read the file, as the file
                    // would not exist for a small period of time.
                    return this$1.openFile(p, flag, function (e, fd) {
                        if (e) {
                            cb(e);
                        }
                        else if (fd) {
                            fd.truncate(0, function () {
                                fd.sync(function () {
                                    cb(null, fd);
                                });
                            });
                        }
                        else {
                            fail();
                        }
                    });
                case ActionType.NOP:
                    return this$1.openFile(p, flag, cb);
                default:
                    return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.'));
            }
        }
    };
    this.stat(p, false, mustBeFile);
};
BaseFileSystem.prototype.rename = function rename (oldPath, newPath, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.renameSync = function renameSync (oldPath, newPath) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.stat = function stat (p, isLstat, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.statSync = function statSync (p, isLstat) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Opens the file at path p with the given flag. The file must exist.
 * @param p The path to open.
 * @param flag The flag to use when opening the file.
 * @return A File object corresponding to the opened file.
 */
BaseFileSystem.prototype.openFileSync = function openFileSync (p, flag, mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Create the file at path p with the given mode. Then, open it with the given
 * flag.
 */
BaseFileSystem.prototype.createFileSync = function createFileSync (p, flag, mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.openSync = function openSync (p, flag, mode) {
    // Check if the path exists, and is a file.
    var stats;
    try {
        stats = this.statSync(p, false);
    }
    catch (e) {
        // File does not exist.
        switch (flag.pathNotExistsAction()) {
            case ActionType.CREATE_FILE:
                // Ensure parent exists.
                var parentStats = this.statSync(path.dirname(p), false);
                if (!parentStats.isDirectory()) {
                    throw ApiError.ENOTDIR(path.dirname(p));
                }
                return this.createFileSync(p, flag, mode);
            case ActionType.THROW_EXCEPTION:
                throw ApiError.ENOENT(p);
            default:
                throw new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.');
        }
    }
    // File exists.
    if (stats.isDirectory()) {
        throw ApiError.EISDIR(p);
    }
    switch (flag.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
            throw ApiError.EEXIST(p);
        case ActionType.TRUNCATE_FILE:
            // Delete file.
            this.unlinkSync(p);
            // Create file. Use the same mode as the old file.
            // Node itself modifies the ctime when this occurs, so this action
            // will preserve that behavior if the underlying file system
            // supports those properties.
            return this.createFileSync(p, flag, stats.mode);
        case ActionType.NOP:
            return this.openFileSync(p, flag, mode);
        default:
            throw new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.');
    }
};
BaseFileSystem.prototype.unlink = function unlink (p, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.unlinkSync = function unlinkSync (p) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.rmdir = function rmdir (p, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.rmdirSync = function rmdirSync (p) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.mkdir = function mkdir (p, mode, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.mkdirSync = function mkdirSync (p, mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.readdir = function readdir (p, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.readdirSync = function readdirSync (p) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.exists = function exists (p, cb) {
    this.stat(p, null, function (err) {
        cb(!err);
    });
};
BaseFileSystem.prototype.existsSync = function existsSync (p) {
    try {
        this.statSync(p, true);
        return true;
    }
    catch (e) {
        return false;
    }
};
BaseFileSystem.prototype.realpath = function realpath (p, cache, cb) {
    if (this.supportsLinks()) {
        // The path could contain symlinks. Split up the path,
        // resolve any symlinks, return the resolved string.
        var splitPath = p.split(path.sep);
        // TODO: Simpler to just pass through file, find sep and such.
        for (var i = 0; i < splitPath.length; i++) {
            var addPaths = splitPath.slice(0, i + 1);
            splitPath[i] = path.join.apply(null, addPaths);
        }
    }
    else {
        // No symlinks. We just need to verify that it exists.
        this.exists(p, function (doesExist) {
            if (doesExist) {
                cb(null, p);
            }
            else {
                cb(ApiError.ENOENT(p));
            }
        });
    }
};
BaseFileSystem.prototype.realpathSync = function realpathSync (p, cache) {
    if (this.supportsLinks()) {
        // The path could contain symlinks. Split up the path,
        // resolve any symlinks, return the resolved string.
        var splitPath = p.split(path.sep);
        // TODO: Simpler to just pass through file, find sep and such.
        for (var i = 0; i < splitPath.length; i++) {
            var addPaths = splitPath.slice(0, i + 1);
            splitPath[i] = path.join.apply(path, addPaths);
        }
        return splitPath.join(path.sep);
    }
    else {
        // No symlinks. We just need to verify that it exists.
        if (this.existsSync(p)) {
            return p;
        }
        else {
            throw ApiError.ENOENT(p);
        }
    }
};
BaseFileSystem.prototype.truncate = function truncate (p, len, cb) {
    this.open(p, FileFlag.getFileFlag('r+'), 0x1a4, (function (er, fd) {
        if (er) {
            return cb(er);
        }
        fd.truncate(len, (function (er) {
            fd.close((function (er2) {
                cb(er || er2);
            }));
        }));
    }));
};
BaseFileSystem.prototype.truncateSync = function truncateSync (p, len) {
    var fd = this.openSync(p, FileFlag.getFileFlag('r+'), 0x1a4);
    // Need to safely close FD, regardless of whether or not truncate succeeds.
    try {
        fd.truncateSync(len);
    }
    catch (e) {
        throw e;
    }
    finally {
        fd.closeSync();
    }
};
BaseFileSystem.prototype.readFile = function readFile (fname, encoding, flag, cb) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
        if (err) {
            return cb(err);
        }
        cb = function (err, arg) {
            fd.close(function (err2) {
                if (!err) {
                    err = err2;
                }
                return oldCb(err, arg);
            });
        };
        fd.stat(function (err, stat) {
            if (err) {
                return cb(err);
            }
            // Allocate buffer.
            var buf = Buffer.alloc(stat.size);
            fd.read(buf, 0, stat.size, 0, function (err) {
                if (err) {
                    return cb(err);
                }
                else if (encoding === null) {
                    return cb(err, buf);
                }
                try {
                    cb(null, buf.toString(encoding));
                }
                catch (e) {
                    cb(e);
                }
            });
        });
    });
};
BaseFileSystem.prototype.readFileSync = function readFileSync (fname, encoding, flag) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
        var stat = fd.statSync();
        // Allocate buffer.
        var buf = Buffer.alloc(stat.size);
        fd.readSync(buf, 0, stat.size, 0);
        fd.closeSync();
        if (encoding === null) {
            return buf;
        }
        return buf.toString(encoding);
    }
    finally {
        fd.closeSync();
    }
};
BaseFileSystem.prototype.writeFile = function writeFile (fname, data, encoding, flag, mode, cb) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
        if (err) {
            return cb(err);
        }
        cb = function (err) {
            fd.close(function (err2) {
                oldCb(err ? err : err2);
            });
        };
        try {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
        }
        catch (e) {
            return cb(e);
        }
        // Write into file.
        fd.write(data, 0, data.length, 0, cb);
    });
};
BaseFileSystem.prototype.writeFileSync = function writeFileSync (fname, data, encoding, flag, mode) {
    // Get file.
    var fd = this.openSync(fname, flag, mode);
    try {
        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        // Write into file.
        fd.writeSync(data, 0, data.length, 0);
    }
    finally {
        fd.closeSync();
    }
};
BaseFileSystem.prototype.appendFile = function appendFile (fname, data, encoding, flag, mode, cb) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    this.open(fname, flag, mode, function (err, fd) {
        if (err) {
            return cb(err);
        }
        cb = function (err) {
            fd.close(function (err2) {
                oldCb(err ? err : err2);
            });
        };
        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        fd.write(data, 0, data.length, null, cb);
    });
};
BaseFileSystem.prototype.appendFileSync = function appendFileSync (fname, data, encoding, flag, mode) {
    var fd = this.openSync(fname, flag, mode);
    try {
        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        fd.writeSync(data, 0, data.length, null);
    }
    finally {
        fd.closeSync();
    }
};
BaseFileSystem.prototype.chmod = function chmod (p, isLchmod, mode, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.chmodSync = function chmodSync (p, isLchmod, mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.chown = function chown (p, isLchown, uid, gid, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.chownSync = function chownSync (p, isLchown, uid, gid) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.utimes = function utimes (p, atime, mtime, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.utimesSync = function utimesSync (p, atime, mtime) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.link = function link (srcpath, dstpath, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.linkSync = function linkSync (srcpath, dstpath) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.symlink = function symlink (srcpath, dstpath, type, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.symlinkSync = function symlinkSync (srcpath, dstpath, type) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.readlink = function readlink (p, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.readlinkSync = function readlinkSync (p) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Implements the asynchronous API in terms of the synchronous API.
 * @class SynchronousFileSystem
 */
var SynchronousFileSystem = (function (BaseFileSystem) {
    function SynchronousFileSystem () {
        BaseFileSystem.apply(this, arguments);
    }

    if ( BaseFileSystem ) SynchronousFileSystem.__proto__ = BaseFileSystem;
    SynchronousFileSystem.prototype = Object.create( BaseFileSystem && BaseFileSystem.prototype );
    SynchronousFileSystem.prototype.constructor = SynchronousFileSystem;

    SynchronousFileSystem.prototype.supportsSynch = function supportsSynch () {
        return true;
    };
    SynchronousFileSystem.prototype.rename = function rename (oldPath, newPath, cb) {
        try {
            this.renameSync(oldPath, newPath);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.stat = function stat (p, isLstat, cb) {
        try {
            cb(null, this.statSync(p, isLstat));
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.open = function open (p, flags, mode, cb) {
        try {
            cb(null, this.openSync(p, flags, mode));
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.unlink = function unlink (p, cb) {
        try {
            this.unlinkSync(p);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.rmdir = function rmdir (p, cb) {
        try {
            this.rmdirSync(p);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.mkdir = function mkdir (p, mode, cb) {
        try {
            this.mkdirSync(p, mode);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.readdir = function readdir (p, cb) {
        try {
            cb(null, this.readdirSync(p));
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.chmod = function chmod (p, isLchmod, mode, cb) {
        try {
            this.chmodSync(p, isLchmod, mode);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.chown = function chown (p, isLchown, uid, gid, cb) {
        try {
            this.chownSync(p, isLchown, uid, gid);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.utimes = function utimes (p, atime, mtime, cb) {
        try {
            this.utimesSync(p, atime, mtime);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.link = function link (srcpath, dstpath, cb) {
        try {
            this.linkSync(srcpath, dstpath);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.symlink = function symlink (srcpath, dstpath, type, cb) {
        try {
            this.symlinkSync(srcpath, dstpath, type);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    SynchronousFileSystem.prototype.readlink = function readlink (p, cb) {
        try {
            cb(null, this.readlinkSync(p));
        }
        catch (e) {
            cb(e);
        }
    };

    return SynchronousFileSystem;
}(BaseFileSystem));

/**
 * Base class that contains shared implementations of functions for the file
 * object.
 */
var BaseFile = function BaseFile () {};

BaseFile.prototype.sync = function sync (cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.syncSync = function syncSync () {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.datasync = function datasync (cb) {
    this.sync(cb);
};
BaseFile.prototype.datasyncSync = function datasyncSync () {
    return this.syncSync();
};
BaseFile.prototype.chown = function chown (uid, gid, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.chownSync = function chownSync (uid, gid) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.chmod = function chmod (mode, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.chmodSync = function chmodSync (mode) {
    throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.utimes = function utimes (atime, mtime, cb) {
    cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.utimesSync = function utimesSync (atime, mtime) {
    throw new ApiError(ErrorCode.ENOTSUP);
};

/**
 * An implementation of the File interface that operates on a file that is
 * completely in-memory. PreloadFiles are backed by a Buffer.
 *
 * This is also an abstract class, as it lacks an implementation of 'sync' and
 * 'close'. Each filesystem that wishes to use this file representation must
 * extend this class and implement those two methods.
 * @todo 'close' lever that disables functionality once closed.
 */
var PreloadFile = (function (BaseFile$$1) {
    function PreloadFile(_fs, _path, _flag, _stat, contents) {
        BaseFile$$1.call(this);
        this._pos = 0;
        this._dirty = false;
        this._fs = _fs;
        this._path = _path;
        this._flag = _flag;
        this._stat = _stat;
        this._buffer = contents ? contents : emptyBuffer();
        // Note: This invariant is *not* maintained once the file starts getting
        // modified.
        // Note: Only actually matters if file is readable, as writeable modes may
        // truncate/append to file.
        if (this._stat.size !== this._buffer.length && this._flag.isReadable()) {
            throw new Error(("Invalid buffer: Buffer is " + (this._buffer.length) + " long, yet Stats object specifies that file is " + (this._stat.size) + " long."));
        }
    }

    if ( BaseFile$$1 ) PreloadFile.__proto__ = BaseFile$$1;
    PreloadFile.prototype = Object.create( BaseFile$$1 && BaseFile$$1.prototype );
    PreloadFile.prototype.constructor = PreloadFile;
    /**
     * NONSTANDARD: Get the underlying buffer for this file. !!DO NOT MUTATE!! Will mess up dirty tracking.
     */
    PreloadFile.prototype.getBuffer = function getBuffer () {
        return this._buffer;
    };
    /**
     * NONSTANDARD: Get underlying stats for this file. !!DO NOT MUTATE!!
     */
    PreloadFile.prototype.getStats = function getStats () {
        return this._stat;
    };
    PreloadFile.prototype.getFlag = function getFlag () {
        return this._flag;
    };
    /**
     * Get the path to this file.
     * @return [String] The path to the file.
     */
    PreloadFile.prototype.getPath = function getPath () {
        return this._path;
    };
    /**
     * Get the current file position.
     *
     * We emulate the following bug mentioned in the Node documentation:
     * > On Linux, positional writes don't work when the file is opened in append
     *   mode. The kernel ignores the position argument and always appends the data
     *   to the end of the file.
     * @return [Number] The current file position.
     */
    PreloadFile.prototype.getPos = function getPos () {
        if (this._flag.isAppendable()) {
            return this._stat.size;
        }
        return this._pos;
    };
    /**
     * Advance the current file position by the indicated number of positions.
     * @param [Number] delta
     */
    PreloadFile.prototype.advancePos = function advancePos (delta) {
        return this._pos += delta;
    };
    /**
     * Set the file position.
     * @param [Number] newPos
     */
    PreloadFile.prototype.setPos = function setPos (newPos) {
        return this._pos = newPos;
    };
    /**
     * **Core**: Asynchronous sync. Must be implemented by subclasses of this
     * class.
     * @param [Function(BrowserFS.ApiError)] cb
     */
    PreloadFile.prototype.sync = function sync (cb) {
        try {
            this.syncSync();
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * **Core**: Synchronous sync.
     */
    PreloadFile.prototype.syncSync = function syncSync () {
        throw new ApiError(ErrorCode.ENOTSUP);
    };
    /**
     * **Core**: Asynchronous close. Must be implemented by subclasses of this
     * class.
     * @param [Function(BrowserFS.ApiError)] cb
     */
    PreloadFile.prototype.close = function close (cb) {
        try {
            this.closeSync();
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * **Core**: Synchronous close.
     */
    PreloadFile.prototype.closeSync = function closeSync () {
        throw new ApiError(ErrorCode.ENOTSUP);
    };
    /**
     * Asynchronous `stat`.
     * @param [Function(BrowserFS.ApiError, BrowserFS.node.fs.Stats)] cb
     */
    PreloadFile.prototype.stat = function stat (cb) {
        try {
            cb(null, this._stat.clone());
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * Synchronous `stat`.
     */
    PreloadFile.prototype.statSync = function statSync () {
        return this._stat.clone();
    };
    /**
     * Asynchronous truncate.
     * @param [Number] len
     * @param [Function(BrowserFS.ApiError)] cb
     */
    PreloadFile.prototype.truncate = function truncate (len, cb) {
        try {
            this.truncateSync(len);
            if (this._flag.isSynchronous() && !_fsMock.getRootFS().supportsSynch()) {
                this.sync(cb);
            }
            cb();
        }
        catch (e) {
            return cb(e);
        }
    };
    /**
     * Synchronous truncate.
     * @param [Number] len
     */
    PreloadFile.prototype.truncateSync = function truncateSync (len) {
        this._dirty = true;
        if (!this._flag.isWriteable()) {
            throw new ApiError(ErrorCode.EPERM, 'File not opened with a writeable mode.');
        }
        this._stat.mtime = new Date();
        if (len > this._buffer.length) {
            var buf = Buffer.alloc(len - this._buffer.length, 0);
            // Write will set @_stat.size for us.
            this.writeSync(buf, 0, buf.length, this._buffer.length);
            if (this._flag.isSynchronous() && _fsMock.getRootFS().supportsSynch()) {
                this.syncSync();
            }
            return;
        }
        this._stat.size = len;
        // Truncate buffer to 'len'.
        var newBuff = Buffer.alloc(len);
        this._buffer.copy(newBuff, 0, 0, len);
        this._buffer = newBuff;
        if (this._flag.isSynchronous() && _fsMock.getRootFS().supportsSynch()) {
            this.syncSync();
        }
    };
    /**
     * Write buffer to the file.
     * Note that it is unsafe to use fs.write multiple times on the same file
     * without waiting for the callback.
     * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
     *  the file.
     * @param [Number] offset Offset in the buffer to start reading data from.
     * @param [Number] length The amount of bytes to write to the file.
     * @param [Number] position Offset from the beginning of the file where this
     *   data should be written. If position is null, the data will be written at
     *   the current position.
     * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)]
     *   cb The number specifies the number of bytes written into the file.
     */
    PreloadFile.prototype.write = function write (buffer$$1, offset, length, position, cb) {
        try {
            cb(null, this.writeSync(buffer$$1, offset, length, position), buffer$$1);
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * Write buffer to the file.
     * Note that it is unsafe to use fs.writeSync multiple times on the same file
     * without waiting for the callback.
     * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
     *  the file.
     * @param [Number] offset Offset in the buffer to start reading data from.
     * @param [Number] length The amount of bytes to write to the file.
     * @param [Number] position Offset from the beginning of the file where this
     *   data should be written. If position is null, the data will be written at
     *   the current position.
     * @return [Number]
     */
    PreloadFile.prototype.writeSync = function writeSync (buffer$$1, offset, length, position) {
        this._dirty = true;
        if (position === undefined || position === null) {
            position = this.getPos();
        }
        if (!this._flag.isWriteable()) {
            throw new ApiError(ErrorCode.EPERM, 'File not opened with a writeable mode.');
        }
        var endFp = position + length;
        if (endFp > this._stat.size) {
            this._stat.size = endFp;
            if (endFp > this._buffer.length) {
                // Extend the buffer!
                var newBuff = Buffer.alloc(endFp);
                this._buffer.copy(newBuff);
                this._buffer = newBuff;
            }
        }
        var len = buffer$$1.copy(this._buffer, position, offset, offset + length);
        this._stat.mtime = new Date();
        if (this._flag.isSynchronous()) {
            this.syncSync();
            return len;
        }
        this.setPos(position + len);
        return len;
    };
    /**
     * Read data from the file.
     * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
     *   written to.
     * @param [Number] offset The offset within the buffer where writing will
     *   start.
     * @param [Number] length An integer specifying the number of bytes to read.
     * @param [Number] position An integer specifying where to begin reading from
     *   in the file. If position is null, data will be read from the current file
     *   position.
     * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)] cb The
     *   number is the number of bytes read
     */
    PreloadFile.prototype.read = function read (buffer$$1, offset, length, position, cb) {
        try {
            cb(null, this.readSync(buffer$$1, offset, length, position), buffer$$1);
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * Read data from the file.
     * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
     *   written to.
     * @param [Number] offset The offset within the buffer where writing will
     *   start.
     * @param [Number] length An integer specifying the number of bytes to read.
     * @param [Number] position An integer specifying where to begin reading from
     *   in the file. If position is null, data will be read from the current file
     *   position.
     * @return [Number]
     */
    PreloadFile.prototype.readSync = function readSync (buffer$$1, offset, length, position) {
        if (!this._flag.isReadable()) {
            throw new ApiError(ErrorCode.EPERM, 'File not opened with a readable mode.');
        }
        if (position === undefined || position === null) {
            position = this.getPos();
        }
        var endRead = position + length;
        if (endRead > this._stat.size) {
            length = this._stat.size - position;
        }
        var rv = this._buffer.copy(buffer$$1, offset, position, position + length);
        this._stat.atime = new Date();
        this._pos = position + length;
        return rv;
    };
    /**
     * Asynchronous `fchmod`.
     * @param [Number|String] mode
     * @param [Function(BrowserFS.ApiError)] cb
     */
    PreloadFile.prototype.chmod = function chmod (mode, cb) {
        try {
            this.chmodSync(mode);
            cb();
        }
        catch (e) {
            cb(e);
        }
    };
    /**
     * Asynchronous `fchmod`.
     * @param [Number] mode
     */
    PreloadFile.prototype.chmodSync = function chmodSync (mode) {
        if (!this._fs.supportsProps()) {
            throw new ApiError(ErrorCode.ENOTSUP);
        }
        this._dirty = true;
        this._stat.chmod(mode);
        this.syncSync();
    };
    PreloadFile.prototype.isDirty = function isDirty () {
        return this._dirty;
    };
    /**
     * Resets the dirty bit. Should only be called after a sync has completed successfully.
     */
    PreloadFile.prototype.resetDirty = function resetDirty () {
        this._dirty = false;
    };

    return PreloadFile;
}(BaseFile));

/**
 * File class for the InMemory and XHR file systems.
 * Doesn't sync to anything, so it works nicely for memory-only files.
 */

/**
 * We define our own file to interpose on syncSync() for mirroring purposes.
 */
var MirrorFile = (function (PreloadFile$$1) {
    function MirrorFile(fs, path$$1, flag, stat, data) {
        PreloadFile$$1.call(this, fs, path$$1, flag, stat, data);
    }

    if ( PreloadFile$$1 ) MirrorFile.__proto__ = PreloadFile$$1;
    MirrorFile.prototype = Object.create( PreloadFile$$1 && PreloadFile$$1.prototype );
    MirrorFile.prototype.constructor = MirrorFile;
    MirrorFile.prototype.syncSync = function syncSync () {
        if (this.isDirty()) {
            this._fs._syncSync(this);
            this.resetDirty();
        }
    };
    MirrorFile.prototype.closeSync = function closeSync () {
        this.syncSync();
    };

    return MirrorFile;
}(PreloadFile));
/**
 * AsyncMirrorFS mirrors a synchronous filesystem into an asynchronous filesystem
 * by:
 *
 * * Performing operations over the in-memory copy, while asynchronously pipelining them
 *   to the backing store.
 * * During application loading, the contents of the async file system can be reloaded into
 *   the synchronous store, if desired.
 *
 * The two stores will be kept in sync. The most common use-case is to pair a synchronous
 * in-memory filesystem with an asynchronous backing store.
 *
 * Example: Mirroring an IndexedDB file system to an in memory file system. Now, you can use
 * IndexedDB synchronously.
 *
 * ```javascript
 * BrowserFS.configure({
 *   fs: "AsyncMirror",
 *   options: {
 *     sync: { fs: "InMemory" },
 *     async: { fs: "IndexedDB" }
 *   }
 * }, function(e) {
 *   // BrowserFS is initialized and ready-to-use!
 * });
 * ```
 *
 * Or, alternatively:
 *
 * ```javascript
 * BrowserFS.FileSystem.IndexedDB.Create(function(e, idbfs) {
 *   BrowserFS.FileSystem.InMemory.Create(function(e, inMemory) {
 *     BrowserFS.FileSystem.AsyncMirror({
 *       sync: inMemory, async: idbfs
 *     }, function(e, mirrored) {
 *       BrowserFS.initialize(mirrored);
 *     });
 *   });
 * });
 * ```
 */
var AsyncMirror = (function (SynchronousFileSystem$$1) {
    function AsyncMirror(sync, async) {
        SynchronousFileSystem$$1.call(this);
        /**
         * Queue of pending asynchronous operations.
         */
        this._queue = [];
        this._queueRunning = false;
        this._isInitialized = false;
        this._initializeCallbacks = [];
        this._sync = sync;
        this._async = async;
    }

    if ( SynchronousFileSystem$$1 ) AsyncMirror.__proto__ = SynchronousFileSystem$$1;
    AsyncMirror.prototype = Object.create( SynchronousFileSystem$$1 && SynchronousFileSystem$$1.prototype );
    AsyncMirror.prototype.constructor = AsyncMirror;
    /**
     * Constructs and initializes an AsyncMirror file system with the given options.
     */
    AsyncMirror.Create = function Create (opts, cb) {
        try {
            var fs = new AsyncMirror(opts.sync, opts.async);
            fs._initialize(function (e) {
                if (e) {
                    cb(e);
                }
                else {
                    cb(null, fs);
                }
            });
        }
        catch (e) {
            cb(e);
        }
    };
    AsyncMirror.isAvailable = function isAvailable () {
        return true;
    };
    AsyncMirror.prototype.getName = function getName () {
        return AsyncMirror.Name;
    };
    AsyncMirror.prototype._syncSync = function _syncSync (fd) {
        this._sync.writeFileSync(fd.getPath(), fd.getBuffer(), null, FileFlag.getFileFlag('w'), fd.getStats().mode);
        this.enqueueOp({
            apiMethod: 'writeFile',
            arguments: [fd.getPath(), fd.getBuffer(), null, fd.getFlag(), fd.getStats().mode]
        });
    };
    AsyncMirror.prototype.isReadOnly = function isReadOnly () { return false; };
    AsyncMirror.prototype.supportsSynch = function supportsSynch () { return true; };
    AsyncMirror.prototype.supportsLinks = function supportsLinks () { return false; };
    AsyncMirror.prototype.supportsProps = function supportsProps () { return this._sync.supportsProps() && this._async.supportsProps(); };
    AsyncMirror.prototype.renameSync = function renameSync (oldPath, newPath) {
        this._sync.renameSync(oldPath, newPath);
        this.enqueueOp({
            apiMethod: 'rename',
            arguments: [oldPath, newPath]
        });
    };
    AsyncMirror.prototype.statSync = function statSync (p, isLstat) {
        return this._sync.statSync(p, isLstat);
    };
    AsyncMirror.prototype.openSync = function openSync (p, flag, mode) {
        // Sanity check: Is this open/close permitted?
        var fd = this._sync.openSync(p, flag, mode);
        fd.closeSync();
        return new MirrorFile(this, p, flag, this._sync.statSync(p, false), this._sync.readFileSync(p, null, FileFlag.getFileFlag('r')));
    };
    AsyncMirror.prototype.unlinkSync = function unlinkSync (p) {
        this._sync.unlinkSync(p);
        this.enqueueOp({
            apiMethod: 'unlink',
            arguments: [p]
        });
    };
    AsyncMirror.prototype.rmdirSync = function rmdirSync (p) {
        this._sync.rmdirSync(p);
        this.enqueueOp({
            apiMethod: 'rmdir',
            arguments: [p]
        });
    };
    AsyncMirror.prototype.mkdirSync = function mkdirSync (p, mode) {
        this._sync.mkdirSync(p, mode);
        this.enqueueOp({
            apiMethod: 'mkdir',
            arguments: [p, mode]
        });
    };
    AsyncMirror.prototype.readdirSync = function readdirSync (p) {
        return this._sync.readdirSync(p);
    };
    AsyncMirror.prototype.existsSync = function existsSync (p) {
        return this._sync.existsSync(p);
    };
    AsyncMirror.prototype.chmodSync = function chmodSync (p, isLchmod, mode) {
        this._sync.chmodSync(p, isLchmod, mode);
        this.enqueueOp({
            apiMethod: 'chmod',
            arguments: [p, isLchmod, mode]
        });
    };
    AsyncMirror.prototype.chownSync = function chownSync (p, isLchown, uid, gid) {
        this._sync.chownSync(p, isLchown, uid, gid);
        this.enqueueOp({
            apiMethod: 'chown',
            arguments: [p, isLchown, uid, gid]
        });
    };
    AsyncMirror.prototype.utimesSync = function utimesSync (p, atime, mtime) {
        this._sync.utimesSync(p, atime, mtime);
        this.enqueueOp({
            apiMethod: 'utimes',
            arguments: [p, atime, mtime]
        });
    };
    /**
     * Called once to load up files from async storage into sync storage.
     */
    AsyncMirror.prototype._initialize = function _initialize (userCb) {
        var this$1 = this;

        var callbacks = this._initializeCallbacks;
        var end = function (e) {
            this$1._isInitialized = !e;
            this$1._initializeCallbacks = [];
            callbacks.forEach(function (cb) { return cb(e); });
        };
        if (!this._isInitialized) {
            // First call triggers initialization, the rest wait.
            if (callbacks.push(userCb) === 1) {
                var copyDirectory = function (p, mode, cb) {
                    if (p !== '/') {
                        this$1._sync.mkdirSync(p, mode);
                    }
                    this$1._async.readdir(p, function (err, files) {
                        var i = 0;
                        // NOTE: This function must not be in a lexically nested statement,
                        // such as an if or while statement. Safari refuses to run the
                        // script since it is undefined behavior.
                        function copyNextFile(err) {
                            if (err) {
                                cb(err);
                            }
                            else if (i < files.length) {
                                copyItem(path.join(p, files[i]), copyNextFile);
                                i++;
                            }
                            else {
                                cb();
                            }
                        }
                        if (err) {
                            cb(err);
                        }
                        else {
                            copyNextFile();
                        }
                    });
                }, copyFile = function (p, mode, cb) {
                    this$1._async.readFile(p, null, FileFlag.getFileFlag('r'), function (err, data) {
                        if (err) {
                            cb(err);
                        }
                        else {
                            try {
                                this$1._sync.writeFileSync(p, data, null, FileFlag.getFileFlag('w'), mode);
                            }
                            catch (e) {
                                err = e;
                            }
                            finally {
                                cb(err);
                            }
                        }
                    });
                }, copyItem = function (p, cb) {
                    this$1._async.stat(p, false, function (err, stats) {
                        if (err) {
                            cb(err);
                        }
                        else if (stats.isDirectory()) {
                            copyDirectory(p, stats.mode, cb);
                        }
                        else {
                            copyFile(p, stats.mode, cb);
                        }
                    });
                };
                copyDirectory('/', 0, end);
            }
        }
        else {
            userCb();
        }
    };
    AsyncMirror.prototype.enqueueOp = function enqueueOp (op) {
        var this$1 = this;

        this._queue.push(op);
        if (!this._queueRunning) {
            this._queueRunning = true;
            var doNextOp = function (err) {
                if (err) {
                    throw new Error(("WARNING: File system has desynchronized. Received following error: " + err + "\n$"));
                }
                if (this$1._queue.length > 0) {
                    var op = this$1._queue.shift(), args = op.arguments;
                    args.push(doNextOp);
                    this$1._async[op.apiMethod].apply(this$1._async, args);
                }
                else {
                    this$1._queueRunning = false;
                }
            };
            doNextOp();
        }
    };

    return AsyncMirror;
}(SynchronousFileSystem));

AsyncMirror.Name = "AsyncMirror";
AsyncMirror.Options = {
    sync: {
        type: "object",
        description: "The synchronous file system to mirror the asynchronous file system to.",
        validator: function (v, cb) {
            if (v && typeof (v['supportsSynch']) === "function" && v.supportsSynch()) {
                cb();
            }
            else {
                cb(new ApiError(ErrorCode.EINVAL, "'sync' option must be a file system that supports synchronous operations"));
            }
        }
    },
    async: {
        type: "object",
        description: "The asynchronous file system to mirror."
    }
};

/**
 * Generic inode definition that can easily be serialized.
 */
var Inode = function Inode(id, size, mode, atime, mtime, ctime) {
    this.id = id;
    this.size = size;
    this.mode = mode;
    this.atime = atime;
    this.mtime = mtime;
    this.ctime = ctime;
};
/**
 * Converts the buffer into an Inode.
 */
Inode.fromBuffer = function fromBuffer (buffer$$1) {
    if (buffer$$1 === undefined) {
        throw new Error("NO");
    }
    return new Inode(buffer$$1.toString('ascii', 30), buffer$$1.readUInt32LE(0), buffer$$1.readUInt16LE(4), buffer$$1.readDoubleLE(6), buffer$$1.readDoubleLE(14), buffer$$1.readDoubleLE(22));
};
/**
 * Handy function that converts the Inode to a Node Stats object.
 */
Inode.prototype.toStats = function toStats () {
    return new Stats((this.mode & 0xF000) === FileType.DIRECTORY ? FileType.DIRECTORY : FileType.FILE, this.size, this.mode, new Date(this.atime), new Date(this.mtime), new Date(this.ctime));
};
/**
 * Get the size of this Inode, in bytes.
 */
Inode.prototype.getSize = function getSize () {
    // ASSUMPTION: ID is ASCII (1 byte per char).
    return 30 + this.id.length;
};
/**
 * Writes the inode into the start of the buffer.
 */
Inode.prototype.toBuffer = function toBuffer (buff) {
        if ( buff === void 0 ) buff = Buffer.alloc(this.getSize());

    buff.writeUInt32LE(this.size, 0);
    buff.writeUInt16LE(this.mode, 4);
    buff.writeDoubleLE(this.atime, 6);
    buff.writeDoubleLE(this.mtime, 14);
    buff.writeDoubleLE(this.ctime, 22);
    buff.write(this.id, 30, this.id.length, 'ascii');
    return buff;
};
/**
 * Updates the Inode using information from the stats object. Used by file
 * systems at sync time, e.g.:
 * - Program opens file and gets a File object.
 * - Program mutates file. File object is responsible for maintaining
 *   metadata changes locally -- typically in a Stats object.
 * - Program closes file. File object's metadata changes are synced with the
 *   file system.
 * @return True if any changes have occurred.
 */
Inode.prototype.update = function update (stats) {
    var hasChanged = false;
    if (this.size !== stats.size) {
        this.size = stats.size;
        hasChanged = true;
    }
    if (this.mode !== stats.mode) {
        this.mode = stats.mode;
        hasChanged = true;
    }
    var atimeMs = stats.atime.getTime();
    if (this.atime !== atimeMs) {
        this.atime = atimeMs;
        hasChanged = true;
    }
    var mtimeMs = stats.mtime.getTime();
    if (this.mtime !== mtimeMs) {
        this.mtime = mtimeMs;
        hasChanged = true;
    }
    var ctimeMs = stats.ctime.getTime();
    if (this.ctime !== ctimeMs) {
        this.ctime = ctimeMs;
        hasChanged = true;
    }
    return hasChanged;
};
// XXX: Copied from Stats. Should reconcile these two into something more
//  compact.
/**
 * @return [Boolean] True if this item is a file.
 */
Inode.prototype.isFile = function isFile () {
    return (this.mode & 0xF000) === FileType.FILE;
};
/**
 * @return [Boolean] True if this item is a directory.
 */
Inode.prototype.isDirectory = function isDirectory () {
    return (this.mode & 0xF000) === FileType.DIRECTORY;
};

/**
 * @hidden
 */
var ROOT_NODE_ID = "/";
/**
 * @hidden
 */
var emptyDirNode = null;
/**
 * Returns an empty directory node.
 * @hidden
 */
function getEmptyDirNode() {
    if (emptyDirNode) {
        return emptyDirNode;
    }
    return emptyDirNode = Buffer.from("{}");
}
/**
 * Generates a random ID.
 * @hidden
 */
function GenerateRandomID() {
    // From http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * A simple RW transaction for simple synchronous key-value stores.
 */
var SimpleSyncRWTransaction = function SimpleSyncRWTransaction(store) {
    this.store = store;
    /**
     * Stores data in the keys we modify prior to modifying them.
     * Allows us to roll back commits.
     */
    this.originalData = {};
    /**
     * List of keys modified in this transaction, if any.
     */
    this.modifiedKeys = [];
};
SimpleSyncRWTransaction.prototype.get = function get (key) {
    var val = this.store.get(key);
    this.stashOldValue(key, val);
    return val;
};
SimpleSyncRWTransaction.prototype.put = function put (key, data, overwrite) {
    this.markModified(key);
    return this.store.put(key, data, overwrite);
};
SimpleSyncRWTransaction.prototype.del = function del (key) {
    this.markModified(key);
    this.store.del(key);
};
SimpleSyncRWTransaction.prototype.commit = function commit () { };
SimpleSyncRWTransaction.prototype.abort = function abort () {
        var this$1 = this;

    // Rollback old values.
    for (var i = 0, list = this$1.modifiedKeys; i < list.length; i += 1) {
        var key = list[i];

            var value = this$1.originalData[key];
        if (!value) {
            // Key didn't exist.
            this$1.store.del(key);
        }
        else {
            // Key existed. Store old value.
            this$1.store.put(key, value, true);
        }
    }
};
/**
 * Stashes given key value pair into `originalData` if it doesn't already
 * exist. Allows us to stash values the program is requesting anyway to
 * prevent needless `get` requests if the program modifies the data later
 * on during the transaction.
 */
SimpleSyncRWTransaction.prototype.stashOldValue = function stashOldValue (key, value) {
    // Keep only the earliest value in the transaction.
    if (!this.originalData.hasOwnProperty(key)) {
        this.originalData[key] = value;
    }
};
/**
 * Marks the given key as modified, and stashes its value if it has not been
 * stashed already.
 */
SimpleSyncRWTransaction.prototype.markModified = function markModified (key) {
    if (this.modifiedKeys.indexOf(key) === -1) {
        this.modifiedKeys.push(key);
        if (!this.originalData.hasOwnProperty(key)) {
            this.originalData[key] = this.store.get(key);
        }
    }
};
var SyncKeyValueFile = (function (PreloadFile$$1) {
    function SyncKeyValueFile(_fs, _path, _flag, _stat, contents) {
        PreloadFile$$1.call(this, _fs, _path, _flag, _stat, contents);
    }

    if ( PreloadFile$$1 ) SyncKeyValueFile.__proto__ = PreloadFile$$1;
    SyncKeyValueFile.prototype = Object.create( PreloadFile$$1 && PreloadFile$$1.prototype );
    SyncKeyValueFile.prototype.constructor = SyncKeyValueFile;
    SyncKeyValueFile.prototype.syncSync = function syncSync () {
        if (this.isDirty()) {
            this._fs._syncSync(this.getPath(), this.getBuffer(), this.getStats());
            this.resetDirty();
        }
    };
    SyncKeyValueFile.prototype.closeSync = function closeSync () {
        this.syncSync();
    };

    return SyncKeyValueFile;
}(PreloadFile));
/**
 * A "Synchronous key-value file system". Stores data to/retrieves data from an
 * underlying key-value store.
 *
 * We use a unique ID for each node in the file system. The root node has a
 * fixed ID.
 * @todo Introduce Node ID caching.
 * @todo Check modes.
 */
var SyncKeyValueFileSystem = (function (SynchronousFileSystem$$1) {
    function SyncKeyValueFileSystem(options) {
        SynchronousFileSystem$$1.call(this);
        this.store = options.store;
        // INVARIANT: Ensure that the root exists.
        this.makeRootDirectory();
    }

    if ( SynchronousFileSystem$$1 ) SyncKeyValueFileSystem.__proto__ = SynchronousFileSystem$$1;
    SyncKeyValueFileSystem.prototype = Object.create( SynchronousFileSystem$$1 && SynchronousFileSystem$$1.prototype );
    SyncKeyValueFileSystem.prototype.constructor = SyncKeyValueFileSystem;
    SyncKeyValueFileSystem.isAvailable = function isAvailable () { return true; };

    SyncKeyValueFileSystem.prototype.getName = function getName () { return this.store.name(); };
    SyncKeyValueFileSystem.prototype.isReadOnly = function isReadOnly () { return false; };
    SyncKeyValueFileSystem.prototype.supportsSymlinks = function supportsSymlinks () { return false; };
    SyncKeyValueFileSystem.prototype.supportsProps = function supportsProps () { return false; };
    SyncKeyValueFileSystem.prototype.supportsSynch = function supportsSynch () { return true; };
    /**
     * Delete all contents stored in the file system.
     */
    SyncKeyValueFileSystem.prototype.empty = function empty () {
        this.store.clear();
        // INVARIANT: Root always exists.
        this.makeRootDirectory();
    };
    SyncKeyValueFileSystem.prototype.renameSync = function renameSync (oldPath, newPath) {
        var tx = this.store.beginTransaction('readwrite'), oldParent = path.dirname(oldPath), oldName = path.basename(oldPath), newParent = path.dirname(newPath), newName = path.basename(newPath), 
        // Remove oldPath from parent's directory listing.
        oldDirNode = this.findINode(tx, oldParent), oldDirList = this.getDirListing(tx, oldParent, oldDirNode);
        if (!oldDirList[oldName]) {
            throw ApiError.ENOENT(oldPath);
        }
        var nodeId = oldDirList[oldName];
        delete oldDirList[oldName];
        // Invariant: Can't move a folder inside itself.
        // This funny little hack ensures that the check passes only if oldPath
        // is a subpath of newParent. We append '/' to avoid matching folders that
        // are a substring of the bottom-most folder in the path.
        if ((newParent + '/').indexOf(oldPath + '/') === 0) {
            throw new ApiError(ErrorCode.EBUSY, oldParent);
        }
        // Add newPath to parent's directory listing.
        var newDirNode, newDirList;
        if (newParent === oldParent) {
            // Prevent us from re-grabbing the same directory listing, which still
            // contains oldName.
            newDirNode = oldDirNode;
            newDirList = oldDirList;
        }
        else {
            newDirNode = this.findINode(tx, newParent);
            newDirList = this.getDirListing(tx, newParent, newDirNode);
        }
        if (newDirList[newName]) {
            // If it's a file, delete it.
            var newNameNode = this.getINode(tx, newPath, newDirList[newName]);
            if (newNameNode.isFile()) {
                try {
                    tx.del(newNameNode.id);
                    tx.del(newDirList[newName]);
                }
                catch (e) {
                    tx.abort();
                    throw e;
                }
            }
            else {
                // If it's a directory, throw a permissions error.
                throw ApiError.EPERM(newPath);
            }
        }
        newDirList[newName] = nodeId;
        // Commit the two changed directory listings.
        try {
            tx.put(oldDirNode.id, Buffer.from(JSON.stringify(oldDirList)), true);
            tx.put(newDirNode.id, Buffer.from(JSON.stringify(newDirList)), true);
        }
        catch (e) {
            tx.abort();
            throw e;
        }
        tx.commit();
    };
    SyncKeyValueFileSystem.prototype.statSync = function statSync (p, isLstat) {
        // Get the inode to the item, convert it into a Stats object.
        return this.findINode(this.store.beginTransaction('readonly'), p).toStats();
    };
    SyncKeyValueFileSystem.prototype.createFileSync = function createFileSync (p, flag, mode) {
        var tx = this.store.beginTransaction('readwrite'), data = emptyBuffer(), newFile = this.commitNewFile(tx, p, FileType.FILE, mode, data);
        // Open the file.
        return new SyncKeyValueFile(this, p, flag, newFile.toStats(), data);
    };
    SyncKeyValueFileSystem.prototype.openFileSync = function openFileSync (p, flag) {
        var tx = this.store.beginTransaction('readonly'), node = this.findINode(tx, p), data = tx.get(node.id);
        if (data === undefined) {
            throw ApiError.ENOENT(p);
        }
        return new SyncKeyValueFile(this, p, flag, node.toStats(), data);
    };
    SyncKeyValueFileSystem.prototype.unlinkSync = function unlinkSync (p) {
        this.removeEntry(p, false);
    };
    SyncKeyValueFileSystem.prototype.rmdirSync = function rmdirSync (p) {
        // Check first if directory is empty.
        if (this.readdirSync(p).length > 0) {
            throw ApiError.ENOTEMPTY(p);
        }
        else {
            this.removeEntry(p, true);
        }
    };
    SyncKeyValueFileSystem.prototype.mkdirSync = function mkdirSync (p, mode) {
        var tx = this.store.beginTransaction('readwrite'), data = Buffer.from('{}');
        this.commitNewFile(tx, p, FileType.DIRECTORY, mode, data);
    };
    SyncKeyValueFileSystem.prototype.readdirSync = function readdirSync (p) {
        var tx = this.store.beginTransaction('readonly');
        return Object.keys(this.getDirListing(tx, p, this.findINode(tx, p)));
    };
    SyncKeyValueFileSystem.prototype._syncSync = function _syncSync (p, data, stats) {
        // @todo Ensure mtime updates properly, and use that to determine if a data
        //       update is required.
        var tx = this.store.beginTransaction('readwrite'), 
        // We use the _findInode helper because we actually need the INode id.
        fileInodeId = this._findINode(tx, path.dirname(p), path.basename(p)), fileInode = this.getINode(tx, p, fileInodeId), inodeChanged = fileInode.update(stats);
        try {
            // Sync data.
            tx.put(fileInode.id, data, true);
            // Sync metadata.
            if (inodeChanged) {
                tx.put(fileInodeId, fileInode.toBuffer(), true);
            }
        }
        catch (e) {
            tx.abort();
            throw e;
        }
        tx.commit();
    };
    /**
     * Checks if the root directory exists. Creates it if it doesn't.
     */
    SyncKeyValueFileSystem.prototype.makeRootDirectory = function makeRootDirectory () {
        var tx = this.store.beginTransaction('readwrite');
        if (tx.get(ROOT_NODE_ID) === undefined) {
            // Create new inode.
            var currTime = (new Date()).getTime(), 
            // Mode 0666
            dirInode = new Inode(GenerateRandomID(), 4096, 511 | FileType.DIRECTORY, currTime, currTime, currTime);
            // If the root doesn't exist, the first random ID shouldn't exist,
            // either.
            tx.put(dirInode.id, getEmptyDirNode(), false);
            tx.put(ROOT_NODE_ID, dirInode.toBuffer(), false);
            tx.commit();
        }
    };
    /**
     * Helper function for findINode.
     * @param parent The parent directory of the file we are attempting to find.
     * @param filename The filename of the inode we are attempting to find, minus
     *   the parent.
     * @return string The ID of the file's inode in the file system.
     */
    SyncKeyValueFileSystem.prototype._findINode = function _findINode (tx, parent, filename) {
        var this$1 = this;

        var readDirectory = function (inode) {
            // Get the root's directory listing.
            var dirList = this$1.getDirListing(tx, parent, inode);
            // Get the file's ID.
            if (dirList[filename]) {
                return dirList[filename];
            }
            else {
                throw ApiError.ENOENT(path.resolve(parent, filename));
            }
        };
        if (parent === '/') {
            if (filename === '') {
                // BASE CASE #1: Return the root's ID.
                return ROOT_NODE_ID;
            }
            else {
                // BASE CASE #2: Find the item in the root ndoe.
                return readDirectory(this.getINode(tx, parent, ROOT_NODE_ID));
            }
        }
        else {
            return readDirectory(this.getINode(tx, parent + path.sep + filename, this._findINode(tx, path.dirname(parent), path.basename(parent))));
        }
    };
    /**
     * Finds the Inode of the given path.
     * @param p The path to look up.
     * @return The Inode of the path p.
     * @todo memoize/cache
     */
    SyncKeyValueFileSystem.prototype.findINode = function findINode (tx, p) {
        return this.getINode(tx, p, this._findINode(tx, path.dirname(p), path.basename(p)));
    };
    /**
     * Given the ID of a node, retrieves the corresponding Inode.
     * @param tx The transaction to use.
     * @param p The corresponding path to the file (used for error messages).
     * @param id The ID to look up.
     */
    SyncKeyValueFileSystem.prototype.getINode = function getINode (tx, p, id) {
        var inode = tx.get(id);
        if (inode === undefined) {
            throw ApiError.ENOENT(p);
        }
        return Inode.fromBuffer(inode);
    };
    /**
     * Given the Inode of a directory, retrieves the corresponding directory
     * listing.
     */
    SyncKeyValueFileSystem.prototype.getDirListing = function getDirListing (tx, p, inode) {
        if (!inode.isDirectory()) {
            throw ApiError.ENOTDIR(p);
        }
        var data = tx.get(inode.id);
        if (data === undefined) {
            throw ApiError.ENOENT(p);
        }
        return JSON.parse(data.toString());
    };
    /**
     * Creates a new node under a random ID. Retries 5 times before giving up in
     * the exceedingly unlikely chance that we try to reuse a random GUID.
     * @return The GUID that the data was stored under.
     */
    SyncKeyValueFileSystem.prototype.addNewNode = function addNewNode (tx, data) {
        var retries = 0;
        var currId;
        while (retries < 5) {
            try {
                currId = GenerateRandomID();
                tx.put(currId, data, false);
                return currId;
            }
            catch (e) {
                // Ignore and reroll.
            }
        }
        throw new ApiError(ErrorCode.EIO, 'Unable to commit data to key-value store.');
    };
    /**
     * Commits a new file (well, a FILE or a DIRECTORY) to the file system with
     * the given mode.
     * Note: This will commit the transaction.
     * @param p The path to the new file.
     * @param type The type of the new file.
     * @param mode The mode to create the new file with.
     * @param data The data to store at the file's data node.
     * @return The Inode for the new file.
     */
    SyncKeyValueFileSystem.prototype.commitNewFile = function commitNewFile (tx, p, type, mode, data) {
        var parentDir = path.dirname(p), fname = path.basename(p), parentNode = this.findINode(tx, parentDir), dirListing = this.getDirListing(tx, parentDir, parentNode), currTime = (new Date()).getTime();
        // Invariant: The root always exists.
        // If we don't check this prior to taking steps below, we will create a
        // file with name '' in root should p == '/'.
        if (p === '/') {
            throw ApiError.EEXIST(p);
        }
        // Check if file already exists.
        if (dirListing[fname]) {
            throw ApiError.EEXIST(p);
        }
        var fileNode;
        try {
            // Commit data.
            var dataId = this.addNewNode(tx, data);
            fileNode = new Inode(dataId, data.length, mode | type, currTime, currTime, currTime);
            // Commit file node.
            var fileNodeId = this.addNewNode(tx, fileNode.toBuffer());
            // Update and commit parent directory listing.
            dirListing[fname] = fileNodeId;
            tx.put(parentNode.id, Buffer.from(JSON.stringify(dirListing)), true);
        }
        catch (e) {
            tx.abort();
            throw e;
        }
        tx.commit();
        return fileNode;
    };
    /**
     * Remove all traces of the given path from the file system.
     * @param p The path to remove from the file system.
     * @param isDir Does the path belong to a directory, or a file?
     * @todo Update mtime.
     */
    SyncKeyValueFileSystem.prototype.removeEntry = function removeEntry (p, isDir) {
        var tx = this.store.beginTransaction('readwrite'), parent = path.dirname(p), parentNode = this.findINode(tx, parent), parentListing = this.getDirListing(tx, parent, parentNode), fileName = path.basename(p);
        if (!parentListing[fileName]) {
            throw ApiError.ENOENT(p);
        }
        // Remove from directory listing of parent.
        var fileNodeId = parentListing[fileName];
        delete parentListing[fileName];
        // Get file inode.
        var fileNode = this.getINode(tx, p, fileNodeId);
        if (!isDir && fileNode.isDirectory()) {
            throw ApiError.EISDIR(p);
        }
        else if (isDir && !fileNode.isDirectory()) {
            throw ApiError.ENOTDIR(p);
        }
        try {
            // Delete data.
            tx.del(fileNode.id);
            // Delete node.
            tx.del(fileNodeId);
            // Update directory listing.
            tx.put(parentNode.id, Buffer.from(JSON.stringify(parentListing)), true);
        }
        catch (e) {
            tx.abort();
            throw e;
        }
        // Success.
        tx.commit();
    };

    return SyncKeyValueFileSystem;
}(SynchronousFileSystem));

/**
 * An "Asynchronous key-value file system". Stores data to/retrieves data from
 * an underlying asynchronous key-value store.
 */

/**
 * A simple in-memory key-value store backed by a JavaScript object.
 */
var InMemoryStore = function InMemoryStore() {
    this.store = {};
};
InMemoryStore.prototype.name = function name () { return InMemoryFileSystem.Name; };
InMemoryStore.prototype.clear = function clear () { this.store = {}; };
InMemoryStore.prototype.beginTransaction = function beginTransaction (type) {
    return new SimpleSyncRWTransaction(this);
};
InMemoryStore.prototype.get = function get (key) {
    return this.store[key];
};
InMemoryStore.prototype.put = function put (key, data, overwrite) {
    if (!overwrite && this.store.hasOwnProperty(key)) {
        return false;
    }
    this.store[key] = data;
    return true;
};
InMemoryStore.prototype.del = function del (key) {
    delete this.store[key];
};
/**
 * A simple in-memory file system backed by an InMemoryStore.
 * Files are not persisted across page loads.
 */
var InMemoryFileSystem = (function (SyncKeyValueFileSystem$$1) {
    function InMemoryFileSystem() {
        SyncKeyValueFileSystem$$1.call(this, { store: new InMemoryStore() });
    }

    if ( SyncKeyValueFileSystem$$1 ) InMemoryFileSystem.__proto__ = SyncKeyValueFileSystem$$1;
    InMemoryFileSystem.prototype = Object.create( SyncKeyValueFileSystem$$1 && SyncKeyValueFileSystem$$1.prototype );
    InMemoryFileSystem.prototype.constructor = InMemoryFileSystem;
    /**
     * Creates an InMemoryFileSystem instance.
     */
    InMemoryFileSystem.Create = function Create (options, cb) {
        cb(null, new InMemoryFileSystem());
    };

    return InMemoryFileSystem;
}(SyncKeyValueFileSystem));

InMemoryFileSystem.Name = "InMemory";
InMemoryFileSystem.Options = {};

/**
 * @hidden
 */
var toExport = typeof (window) !== 'undefined' ? window : typeof (self) !== 'undefined' ? self : global;

/**
 * @hidden
 */
var SpecialArgType;
(function (SpecialArgType) {
    // Callback
    SpecialArgType[SpecialArgType["CB"] = 0] = "CB";
    // File descriptor
    SpecialArgType[SpecialArgType["FD"] = 1] = "FD";
    // API error
    SpecialArgType[SpecialArgType["API_ERROR"] = 2] = "API_ERROR";
    // Stats object
    SpecialArgType[SpecialArgType["STATS"] = 3] = "STATS";
    // Initial probe for file system information.
    SpecialArgType[SpecialArgType["PROBE"] = 4] = "PROBE";
    // FileFlag object.
    SpecialArgType[SpecialArgType["FILEFLAG"] = 5] = "FILEFLAG";
    // Buffer object.
    SpecialArgType[SpecialArgType["BUFFER"] = 6] = "BUFFER";
    // Generic Error object.
    SpecialArgType[SpecialArgType["ERROR"] = 7] = "ERROR";
})(SpecialArgType || (SpecialArgType = {}));
/**
 * Converts callback arguments into ICallbackArgument objects, and back
 * again.
 * @hidden
 */
var CallbackArgumentConverter = function CallbackArgumentConverter() {
    this._callbacks = {};
    this._nextId = 0;
};
CallbackArgumentConverter.prototype.toRemoteArg = function toRemoteArg (cb) {
    var id = this._nextId++;
    this._callbacks[id] = cb;
    return {
        type: SpecialArgType.CB,
        id: id
    };
};
CallbackArgumentConverter.prototype.toLocalArg = function toLocalArg (id) {
    var cb = this._callbacks[id];
    delete this._callbacks[id];
    return cb;
};
/**
 * @hidden
 */
var FileDescriptorArgumentConverter = function FileDescriptorArgumentConverter() {
    this._fileDescriptors = {};
    this._nextId = 0;
};
FileDescriptorArgumentConverter.prototype.toRemoteArg = function toRemoteArg (fd, p, flag, cb) {
    var id = this._nextId++;
    var data;
    var stat;
    this._fileDescriptors[id] = fd;
    // Extract needed information asynchronously.
    fd.stat(function (err, stats) {
        if (err) {
            cb(err);
        }
        else {
            stat = bufferToTransferrableObject(stats.toBuffer());
            // If it's a readable flag, we need to grab contents.
            if (flag.isReadable()) {
                fd.read(Buffer.alloc(stats.size), 0, stats.size, 0, function (err, bytesRead, buff) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        data = bufferToTransferrableObject(buff);
                        cb(null, {
                            type: SpecialArgType.FD,
                            id: id,
                            data: data,
                            stat: stat,
                            path: p,
                            flag: flag.getFlagString()
                        });
                    }
                });
            }
            else {
                // File is not readable, which means writing to it will append or
                // truncate/replace existing contents. Return an empty arraybuffer.
                cb(null, {
                    type: SpecialArgType.FD,
                    id: id,
                    data: new ArrayBuffer(0),
                    stat: stat,
                    path: p,
                    flag: flag.getFlagString()
                });
            }
        }
    });
};
FileDescriptorArgumentConverter.prototype.applyFdAPIRequest = function applyFdAPIRequest (request, cb) {
        var this$1 = this;

    var fdArg = request.args[0];
    this._applyFdChanges(fdArg, function (err, fd) {
        if (err) {
            cb(err);
        }
        else {
            // Apply method on now-changed file descriptor.
            fd[request.method](function (e) {
                if (request.method === 'close') {
                    delete this$1._fileDescriptors[fdArg.id];
                }
                cb(e);
            });
        }
    });
};
FileDescriptorArgumentConverter.prototype._applyFdChanges = function _applyFdChanges (remoteFd, cb) {
    var fd = this._fileDescriptors[remoteFd.id], data = transferrableObjectToBuffer(remoteFd.data), remoteStats = Stats.fromBuffer(transferrableObjectToBuffer(remoteFd.stat));
    // Write data if the file is writable.
    var flag = FileFlag.getFileFlag(remoteFd.flag);
    if (flag.isWriteable()) {
        // Appendable: Write to end of file.
        // Writeable: Replace entire contents of file.
        fd.write(data, 0, data.length, flag.isAppendable() ? fd.getPos() : 0, function (e) {
            function applyStatChanges() {
                // Check if mode changed.
                fd.stat(function (e, stats) {
                    if (e) {
                        cb(e);
                    }
                    else {
                        if (stats.mode !== remoteStats.mode) {
                            fd.chmod(remoteStats.mode, function (e) {
                                cb(e, fd);
                            });
                        }
                        else {
                            cb(e, fd);
                        }
                    }
                });
            }
            if (e) {
                cb(e);
            }
            else {
                // If writeable & not appendable, we need to ensure file contents are
                // identical to those from the remote FD. Thus, we truncate to the
                // length of the remote file.
                if (!flag.isAppendable()) {
                    fd.truncate(data.length, function () {
                        applyStatChanges();
                    });
                }
                else {
                    applyStatChanges();
                }
            }
        });
    }
    else {
        cb(null, fd);
    }
};
/**
 * @hidden
 */
function apiErrorLocal2Remote(e) {
    return {
        type: SpecialArgType.API_ERROR,
        errorData: bufferToTransferrableObject(e.writeToBuffer())
    };
}
/**
 * @hidden
 */
function apiErrorRemote2Local(e) {
    return ApiError.fromBuffer(transferrableObjectToBuffer(e.errorData));
}
/**
 * @hidden
 */
function errorLocal2Remote(e) {
    return {
        type: SpecialArgType.ERROR,
        name: e.name,
        message: e.message,
        stack: e.stack
    };
}
/**
 * @hidden
 */
function errorRemote2Local(e) {
    var cnstr = toExport[e.name];
    if (typeof (cnstr) !== 'function') {
        cnstr = Error;
    }
    var err = new cnstr(e.message);
    err.stack = e.stack;
    return err;
}
/**
 * @hidden
 */
function statsLocal2Remote(stats) {
    return {
        type: SpecialArgType.STATS,
        statsData: bufferToTransferrableObject(stats.toBuffer())
    };
}
/**
 * @hidden
 */
function statsRemote2Local(stats) {
    return Stats.fromBuffer(transferrableObjectToBuffer(stats.statsData));
}
/**
 * @hidden
 */
function fileFlagLocal2Remote(flag) {
    return {
        type: SpecialArgType.FILEFLAG,
        flagStr: flag.getFlagString()
    };
}
/**
 * @hidden
 */
function fileFlagRemote2Local(remoteFlag) {
    return FileFlag.getFileFlag(remoteFlag.flagStr);
}
/**
 * @hidden
 */
function bufferToTransferrableObject(buff) {
    return buffer2ArrayBuffer(buff);
}
/**
 * @hidden
 */
function transferrableObjectToBuffer(buff) {
    return arrayBuffer2Buffer(buff);
}
/**
 * @hidden
 */
function bufferLocal2Remote(buff) {
    return {
        type: SpecialArgType.BUFFER,
        data: bufferToTransferrableObject(buff)
    };
}
/**
 * @hidden
 */
function bufferRemote2Local(buffArg) {
    return transferrableObjectToBuffer(buffArg.data);
}
/**
 * @hidden
 */
function isAPIRequest(data) {
    return data && typeof data === 'object' && data.hasOwnProperty('browserfsMessage') && data['browserfsMessage'];
}
/**
 * @hidden
 */
function isAPIResponse(data) {
    return data && typeof data === 'object' && data.hasOwnProperty('browserfsMessage') && data['browserfsMessage'];
}
/**
 * Represents a remote file in a different worker/thread.
 */
var WorkerFile = (function (PreloadFile$$1) {
    function WorkerFile(_fs, _path, _flag, _stat, remoteFdId, contents) {
        PreloadFile$$1.call(this, _fs, _path, _flag, _stat, contents);
        this._remoteFdId = remoteFdId;
    }

    if ( PreloadFile$$1 ) WorkerFile.__proto__ = PreloadFile$$1;
    WorkerFile.prototype = Object.create( PreloadFile$$1 && PreloadFile$$1.prototype );
    WorkerFile.prototype.constructor = WorkerFile;
    WorkerFile.prototype.getRemoteFdId = function getRemoteFdId () {
        return this._remoteFdId;
    };
    /**
     * @hidden
     */
    WorkerFile.prototype.toRemoteArg = function toRemoteArg () {
        return {
            type: SpecialArgType.FD,
            id: this._remoteFdId,
            data: bufferToTransferrableObject(this.getBuffer()),
            stat: bufferToTransferrableObject(this.getStats().toBuffer()),
            path: this.getPath(),
            flag: this.getFlag().getFlagString()
        };
    };
    WorkerFile.prototype.sync = function sync (cb) {
        this._syncClose('sync', cb);
    };
    WorkerFile.prototype.close = function close (cb) {
        this._syncClose('close', cb);
    };
    WorkerFile.prototype._syncClose = function _syncClose (type, cb) {
        var this$1 = this;

        if (this.isDirty()) {
            this._fs.syncClose(type, this, function (e) {
                if (!e) {
                    this$1.resetDirty();
                }
                cb(e);
            });
        }
        else {
            cb();
        }
    };

    return WorkerFile;
}(PreloadFile));
/**
 * WorkerFS lets you access a BrowserFS instance that is running in a different
 * JavaScript context (e.g. access BrowserFS in one of your WebWorkers, or
 * access BrowserFS running on the main page from a WebWorker).
 *
 * For example, to have a WebWorker access files in the main browser thread,
 * do the following:
 *
 * MAIN BROWSER THREAD:
 *
 * ```javascript
 *   // Listen for remote file system requests.
 *   BrowserFS.FileSystem.WorkerFS.attachRemoteListener(webWorkerObject);
 * ```
 *
 * WEBWORKER THREAD:
 *
 * ```javascript
 *   // Set the remote file system as the root file system.
 *   BrowserFS.configure({ fs: "WorkerFS", options: { worker: self }}, function(e) {
 *     // Ready!
 *   });
 * ```
 *
 * Note that synchronous operations are not permitted on the WorkerFS, regardless
 * of the configuration option of the remote FS.
 */
var WorkerFS = (function (BaseFileSystem$$1) {
    function WorkerFS(worker) {
        var this$1 = this;

        BaseFileSystem$$1.call(this);
        this._callbackConverter = new CallbackArgumentConverter();
        this._isInitialized = false;
        this._isReadOnly = false;
        this._supportLinks = false;
        this._supportProps = false;
        this._worker = worker;
        this._worker.addEventListener('message', function (e) {
            var resp = e.data;
            if (isAPIResponse(resp)) {
                var i;
                var args = resp.args;
                var fixedArgs = new Array(args.length);
                // Dispatch event to correct id.
                for (i = 0; i < fixedArgs.length; i++) {
                    fixedArgs[i] = this$1._argRemote2Local(args[i]);
                }
                this$1._callbackConverter.toLocalArg(resp.cbId).apply(null, fixedArgs);
            }
        });
    }

    if ( BaseFileSystem$$1 ) WorkerFS.__proto__ = BaseFileSystem$$1;
    WorkerFS.prototype = Object.create( BaseFileSystem$$1 && BaseFileSystem$$1.prototype );
    WorkerFS.prototype.constructor = WorkerFS;
    WorkerFS.Create = function Create (opts, cb) {
        var fs = new WorkerFS(opts.worker);
        fs._initialize(function () {
            cb(null, fs);
        });
    };
    WorkerFS.isAvailable = function isAvailable () {
        return typeof (importScripts) !== 'undefined' || typeof (Worker) !== 'undefined';
    };
    /**
     * Attaches a listener to the remote worker for file system requests.
     */
    WorkerFS.attachRemoteListener = function attachRemoteListener (worker) {
        var fdConverter = new FileDescriptorArgumentConverter();
        function argLocal2Remote(arg, requestArgs, cb) {
            switch (typeof arg) {
                case 'object':
                    if (arg instanceof Stats) {
                        cb(null, statsLocal2Remote(arg));
                    }
                    else if (arg instanceof ApiError) {
                        cb(null, apiErrorLocal2Remote(arg));
                    }
                    else if (arg instanceof BaseFile) {
                        // Pass in p and flags from original request.
                        cb(null, fdConverter.toRemoteArg(arg, requestArgs[0], requestArgs[1], cb));
                    }
                    else if (arg instanceof FileFlag) {
                        cb(null, fileFlagLocal2Remote(arg));
                    }
                    else if (arg instanceof Buffer) {
                        cb(null, bufferLocal2Remote(arg));
                    }
                    else if (arg instanceof Error) {
                        cb(null, errorLocal2Remote(arg));
                    }
                    else {
                        cb(null, arg);
                    }
                    break;
                default:
                    cb(null, arg);
                    break;
            }
        }
        function argRemote2Local(arg, fixedRequestArgs) {
            if (!arg) {
                return arg;
            }
            switch (typeof arg) {
                case 'object':
                    if (typeof arg['type'] === 'number') {
                        var specialArg = arg;
                        switch (specialArg.type) {
                            case SpecialArgType.CB:
                                var cbId = arg.id;
                                return function () {
                                    var arguments$1 = arguments;

                                    var i;
                                    var fixedArgs = new Array(arguments.length);
                                    var message, countdown = arguments.length;
                                    function abortAndSendError(err) {
                                        if (countdown > 0) {
                                            countdown = -1;
                                            message = {
                                                browserfsMessage: true,
                                                cbId: cbId,
                                                args: [apiErrorLocal2Remote(err)]
                                            };
                                            worker.postMessage(message);
                                        }
                                    }
                                    for (i = 0; i < arguments.length; i++) {
                                        // Capture i and argument.
                                        (function (i, arg) {
                                            argLocal2Remote(arg, fixedRequestArgs, function (err, fixedArg) {
                                                fixedArgs[i] = fixedArg;
                                                if (err) {
                                                    abortAndSendError(err);
                                                }
                                                else if (--countdown === 0) {
                                                    message = {
                                                        browserfsMessage: true,
                                                        cbId: cbId,
                                                        args: fixedArgs
                                                    };
                                                    worker.postMessage(message);
                                                }
                                            });
                                        })(i, arguments$1[i]);
                                    }
                                    if (arguments.length === 0) {
                                        message = {
                                            browserfsMessage: true,
                                            cbId: cbId,
                                            args: fixedArgs
                                        };
                                        worker.postMessage(message);
                                    }
                                };
                            case SpecialArgType.API_ERROR:
                                return apiErrorRemote2Local(specialArg);
                            case SpecialArgType.STATS:
                                return statsRemote2Local(specialArg);
                            case SpecialArgType.FILEFLAG:
                                return fileFlagRemote2Local(specialArg);
                            case SpecialArgType.BUFFER:
                                return bufferRemote2Local(specialArg);
                            case SpecialArgType.ERROR:
                                return errorRemote2Local(specialArg);
                            default:
                                // No idea what this is.
                                return arg;
                        }
                    }
                    else {
                        return arg;
                    }
                default:
                    return arg;
            }
        }
        worker.addEventListener('message', function (e) {
            var request = e.data;
            if (isAPIRequest(request)) {
                var args = request.args, fixedArgs = new Array(args.length);
                switch (request.method) {
                    case 'close':
                    case 'sync':
                        (function () {
                            // File descriptor-relative methods.
                            var remoteCb = args[1];
                            fdConverter.applyFdAPIRequest(request, function (err) {
                                // Send response.
                                var response = {
                                    browserfsMessage: true,
                                    cbId: remoteCb.id,
                                    args: err ? [apiErrorLocal2Remote(err)] : []
                                };
                                worker.postMessage(response);
                            });
                        })();
                        break;
                    case 'probe':
                        (function () {
                            var rootFs = _fsMock.getRootFS(), remoteCb = args[1], probeResponse = {
                                type: SpecialArgType.PROBE,
                                isReadOnly: rootFs.isReadOnly(),
                                supportsLinks: rootFs.supportsLinks(),
                                supportsProps: rootFs.supportsProps()
                            }, response = {
                                browserfsMessage: true,
                                cbId: remoteCb.id,
                                args: [probeResponse]
                            };
                            worker.postMessage(response);
                        })();
                        break;
                    default:
                        // File system methods.
                        for (var i = 0; i < args.length; i++) {
                            fixedArgs[i] = argRemote2Local(args[i], fixedArgs);
                        }
                        var rootFS = _fsMock.getRootFS();
                        rootFS[request.method].apply(rootFS, fixedArgs);
                        break;
                }
            }
        });
    };
    WorkerFS.prototype.getName = function getName () {
        return WorkerFS.Name;
    };
    WorkerFS.prototype.isReadOnly = function isReadOnly () { return this._isReadOnly; };
    WorkerFS.prototype.supportsSynch = function supportsSynch () { return false; };
    WorkerFS.prototype.supportsLinks = function supportsLinks () { return this._supportLinks; };
    WorkerFS.prototype.supportsProps = function supportsProps () { return this._supportProps; };
    WorkerFS.prototype.rename = function rename (oldPath, newPath, cb) {
        this._rpc('rename', arguments);
    };
    WorkerFS.prototype.stat = function stat (p, isLstat, cb) {
        this._rpc('stat', arguments);
    };
    WorkerFS.prototype.open = function open (p, flag, mode, cb) {
        this._rpc('open', arguments);
    };
    WorkerFS.prototype.unlink = function unlink (p, cb) {
        this._rpc('unlink', arguments);
    };
    WorkerFS.prototype.rmdir = function rmdir (p, cb) {
        this._rpc('rmdir', arguments);
    };
    WorkerFS.prototype.mkdir = function mkdir (p, mode, cb) {
        this._rpc('mkdir', arguments);
    };
    WorkerFS.prototype.readdir = function readdir (p, cb) {
        this._rpc('readdir', arguments);
    };
    WorkerFS.prototype.exists = function exists (p, cb) {
        this._rpc('exists', arguments);
    };
    WorkerFS.prototype.realpath = function realpath (p, cache, cb) {
        this._rpc('realpath', arguments);
    };
    WorkerFS.prototype.truncate = function truncate (p, len, cb) {
        this._rpc('truncate', arguments);
    };
    WorkerFS.prototype.readFile = function readFile (fname, encoding, flag, cb) {
        this._rpc('readFile', arguments);
    };
    WorkerFS.prototype.writeFile = function writeFile (fname, data, encoding, flag, mode, cb) {
        this._rpc('writeFile', arguments);
    };
    WorkerFS.prototype.appendFile = function appendFile (fname, data, encoding, flag, mode, cb) {
        this._rpc('appendFile', arguments);
    };
    WorkerFS.prototype.chmod = function chmod (p, isLchmod, mode, cb) {
        this._rpc('chmod', arguments);
    };
    WorkerFS.prototype.chown = function chown (p, isLchown, uid, gid, cb) {
        this._rpc('chown', arguments);
    };
    WorkerFS.prototype.utimes = function utimes (p, atime, mtime, cb) {
        this._rpc('utimes', arguments);
    };
    WorkerFS.prototype.link = function link (srcpath, dstpath, cb) {
        this._rpc('link', arguments);
    };
    WorkerFS.prototype.symlink = function symlink (srcpath, dstpath, type, cb) {
        this._rpc('symlink', arguments);
    };
    WorkerFS.prototype.readlink = function readlink (p, cb) {
        this._rpc('readlink', arguments);
    };
    WorkerFS.prototype.syncClose = function syncClose (method, fd, cb) {
        this._worker.postMessage({
            browserfsMessage: true,
            method: method,
            args: [fd.toRemoteArg(), this._callbackConverter.toRemoteArg(cb)]
        });
    };
    /**
     * Called once both local and remote sides are set up.
     */
    WorkerFS.prototype._initialize = function _initialize (cb) {
        var this$1 = this;

        if (!this._isInitialized) {
            var message = {
                browserfsMessage: true,
                method: 'probe',
                args: [this._argLocal2Remote(emptyBuffer()), this._callbackConverter.toRemoteArg(function (probeResponse) {
                        this$1._isInitialized = true;
                        this$1._isReadOnly = probeResponse.isReadOnly;
                        this$1._supportLinks = probeResponse.supportsLinks;
                        this$1._supportProps = probeResponse.supportsProps;
                        cb();
                    })]
            };
            this._worker.postMessage(message);
        }
        else {
            cb();
        }
    };
    WorkerFS.prototype._argRemote2Local = function _argRemote2Local (arg) {
        if (!arg) {
            return arg;
        }
        switch (typeof arg) {
            case 'object':
                if (typeof arg['type'] === 'number') {
                    var specialArg = arg;
                    switch (specialArg.type) {
                        case SpecialArgType.API_ERROR:
                            return apiErrorRemote2Local(specialArg);
                        case SpecialArgType.FD:
                            var fdArg = specialArg;
                            return new WorkerFile(this, fdArg.path, FileFlag.getFileFlag(fdArg.flag), Stats.fromBuffer(transferrableObjectToBuffer(fdArg.stat)), fdArg.id, transferrableObjectToBuffer(fdArg.data));
                        case SpecialArgType.STATS:
                            return statsRemote2Local(specialArg);
                        case SpecialArgType.FILEFLAG:
                            return fileFlagRemote2Local(specialArg);
                        case SpecialArgType.BUFFER:
                            return bufferRemote2Local(specialArg);
                        case SpecialArgType.ERROR:
                            return errorRemote2Local(specialArg);
                        default:
                            return arg;
                    }
                }
                else {
                    return arg;
                }
            default:
                return arg;
        }
    };
    WorkerFS.prototype._rpc = function _rpc (methodName, args) {
        var this$1 = this;

        var fixedArgs = new Array(args.length);
        for (var i = 0; i < args.length; i++) {
            fixedArgs[i] = this$1._argLocal2Remote(args[i]);
        }
        var message = {
            browserfsMessage: true,
            method: methodName,
            args: fixedArgs
        };
        this._worker.postMessage(message);
    };
    /**
     * Converts a local argument into a remote argument. Public so WorkerFile objects can call it.
     */
    WorkerFS.prototype._argLocal2Remote = function _argLocal2Remote (arg) {
        if (!arg) {
            return arg;
        }
        switch (typeof arg) {
            case "object":
                if (arg instanceof Stats) {
                    return statsLocal2Remote(arg);
                }
                else if (arg instanceof ApiError) {
                    return apiErrorLocal2Remote(arg);
                }
                else if (arg instanceof WorkerFile) {
                    return arg.toRemoteArg();
                }
                else if (arg instanceof FileFlag) {
                    return fileFlagLocal2Remote(arg);
                }
                else if (arg instanceof Buffer) {
                    return bufferLocal2Remote(arg);
                }
                else if (arg instanceof Error) {
                    return errorLocal2Remote(arg);
                }
                else {
                    return "Unknown argument";
                }
            case "function":
                return this._callbackConverter.toRemoteArg(arg);
            default:
                return arg;
        }
    };

    return WorkerFS;
}(BaseFileSystem));

WorkerFS.Name = "WorkerFS";
WorkerFS.Options = {
    worker: {
        type: "object",
        description: "The target worker that you want to connect to, or the current worker if in a worker context.",
        validator: function (v, cb) {
            // Check for a `postMessage` function.
            if (v['postMessage']) {
                cb();
            }
            else {
                cb(new ApiError(ErrorCode.EINVAL, "option must be a Web Worker instance."));
            }
        }
    }
};

var CodeSandboxFile = (function (PreloadFile$$1) {
    function CodeSandboxFile(_fs, _path, _flag, _stat, contents) {
        PreloadFile$$1.call(this, _fs, _path, _flag, _stat, contents);
    }

    if ( PreloadFile$$1 ) CodeSandboxFile.__proto__ = PreloadFile$$1;
    CodeSandboxFile.prototype = Object.create( PreloadFile$$1 && PreloadFile$$1.prototype );
    CodeSandboxFile.prototype.constructor = CodeSandboxFile;
    CodeSandboxFile.prototype.sync = function sync (cb) {
        var this$1 = this;

        if (this.isDirty()) {
            var buffer$$1 = this.getBuffer();
            this._fs._sync(this.getPath(), buffer$$1, function (e, stat) {
                if (!e) {
                    this$1.resetDirty();
                }
                cb(e);
            });
        }
        else {
            cb();
        }
    };
    CodeSandboxFile.prototype.close = function close (cb) {
        this.sync(cb);
    };
    CodeSandboxFile.prototype.syncSync = function syncSync () {
        if (this.isDirty()) {
            this._fs._syncSync(this.getPath(), this.getBuffer());
            this.resetDirty();
        }
    };
    CodeSandboxFile.prototype.closeSync = function closeSync () {
        this.syncSync();
    };

    return CodeSandboxFile;
}(PreloadFile));
var CodeSandboxFS = (function (SynchronousFileSystem$$1) {
    function CodeSandboxFS(manager) {
        SynchronousFileSystem$$1.call(this);
        this.manager = manager;
    }

    if ( SynchronousFileSystem$$1 ) CodeSandboxFS.__proto__ = SynchronousFileSystem$$1;
    CodeSandboxFS.prototype = Object.create( SynchronousFileSystem$$1 && SynchronousFileSystem$$1.prototype );
    CodeSandboxFS.prototype.constructor = CodeSandboxFS;
    /**
     * Creates an InMemoryFileSystem instance.
     */
    CodeSandboxFS.Create = function Create (options, cb) {
        cb(null, new CodeSandboxFS(options.manager));
    };
    CodeSandboxFS.isAvailable = function isAvailable () {
        return true;
    };
    CodeSandboxFS.prototype.getName = function getName () {
        return 'CodeSandboxFS';
    };
    CodeSandboxFS.prototype.isReadOnly = function isReadOnly () {
        return false;
    };
    CodeSandboxFS.prototype.supportsProps = function supportsProps () {
        return false;
    };
    CodeSandboxFS.prototype.supportsSynch = function supportsSynch () {
        return true;
    };
    CodeSandboxFS.prototype.empty = function empty (mainCb) {
        var this$1 = this;

        var tModules = this.manager.getTranspiledModules();
        Object.keys(tModules).forEach(function (pa) {
            this$1.manager.removeModule(tModules[pa].module);
        });
        mainCb();
    };
    CodeSandboxFS.prototype.renameSync = function renameSync (oldPath, newPath) {
        var this$1 = this;

        var tModules = this.manager.getTranspiledModules();
        var modulesWithPath = Object.keys(tModules).filter(function (p) { return p.startsWith(oldPath) + '/' || p === oldPath; });
        if (modulesWithPath.length === 0) {
            throw ApiError.FileError(ErrorCode.ENOENT, oldPath);
        }
        modulesWithPath.map(function (p) { return tModules[p]; }).forEach(function (moduleInfo) {
            var module = moduleInfo.module;
            this$1.manager.moveModule(module, module.path.replace(oldPath, newPath));
        });
    };
    CodeSandboxFS.prototype.statSync = function statSync (p, isLstate) {
        var tModules = this.manager.getTranspiledModules();
        var moduleInfo = tModules[p];
        if (!moduleInfo) {
            var modulesStartingWithPath = Object.keys(tModules).filter(function (pa) { return pa.startsWith(p.endsWith('/') ? p : p + '/') || pa === p; });
            if (modulesStartingWithPath.length > 0) {
                return new Stats(FileType.DIRECTORY, 0);
            }
            else {
                throw ApiError.FileError(ErrorCode.ENOENT, p);
            }
        }
        var stats = new Stats(FileType.FILE, (moduleInfo.module.code || '').length);
        return stats;
    };
    CodeSandboxFS.prototype.createFileSync = function createFileSync (p, flag, mode) {
        if (p === '/') {
            throw ApiError.EEXIST(p);
        }
        if (this.manager.getTranspiledModules()[p]) {
            throw ApiError.EEXIST(p);
        }
        var module = {
            path: p,
            code: '',
        };
        this.manager.addModule(module);
        var buffer$$1 = Buffer.from(module.code || '');
        var stats = new Stats(FileType.FILE, buffer$$1.length);
        return new CodeSandboxFile(this, p, flag, stats, buffer$$1);
    };
    CodeSandboxFS.prototype.openFileSync = function openFileSync (p, flag, mode) {
        var moduleInfo = this.manager.getTranspiledModules()[p];
        if (!moduleInfo) {
            throw ApiError.ENOENT(p);
        }
        var ref = moduleInfo.module;
        var code = ref.code; if ( code === void 0 ) code = '';
        var buffer$$1 = Buffer.from(code || '');
        var stats = new Stats(FileType.FILE, buffer$$1.length);
        return new CodeSandboxFile(this, p, flag, stats, buffer$$1);
    };
    CodeSandboxFS.prototype.rmdirSync = function rmdirSync (p) {
        var this$1 = this;

        var tModules = this.manager.getTranspiledModules();
        Object.keys(tModules)
            .filter(function (pa) { return pa.startsWith(p + '/') || p === pa; })
            .forEach(function (pa) {
            var ref = tModules[pa];
            var module = ref.module;
            this$1.manager.removeModule(module);
        });
    };
    CodeSandboxFS.prototype.mkdirSync = function mkdirSync (p) {
        // CodeSandbox Manager doesn't have the concept of directories, like git.
        // For now we will do nothing, as we pretend that every directory already exists.
    };
    CodeSandboxFS.prototype.readdirSync = function readdirSync (path$$1) {
        var paths = Object.keys(this.manager.getTranspiledModules());
        var p = path$$1.endsWith('/') ? path$$1 : path$$1 + '/';
        var pathsInDir = paths.filter(function (secondP) { return secondP.startsWith(p); });
        if (pathsInDir.length === 0) {
            return [];
        }
        var directChildren = new Set();
        var currentPathLength = p.split('/').length;
        pathsInDir
            .filter(function (np) { return np.split('/').length >= currentPathLength; })
            .forEach(function (np) {
            var parts = np.split('/');
            parts.length = currentPathLength;
            directChildren.add(parts.join('/'));
        });
        var pathArray = Array.from(directChildren).map(function (pa) { return pa.replace(p, ''); });
        return pathArray;
    };
    CodeSandboxFS.prototype._sync = function _sync (p, data, cb) {
        var this$1 = this;

        var parent = path.dirname(p);
        this.stat(parent, false, function (error, stat) {
            if (error) {
                cb(ApiError.FileError(ErrorCode.ENOENT, parent));
            }
            else {
                var module = this$1.manager.getTranspiledModules()[p].module;
                this$1.manager.updateModule(module);
                cb(null);
            }
        });
    };
    CodeSandboxFS.prototype._syncSync = function _syncSync (p, data) {
        var parent = path.dirname(p);
        this.statSync(parent, false);
        var module = this.manager.getTranspiledModules()[p].module;
        this.manager.updateModule(module);
    };

    return CodeSandboxFS;
}(SynchronousFileSystem));

CodeSandboxFS.Name = 'CodeSandboxFS';
CodeSandboxFS.Options = {
    manager: {
        type: 'object',
        description: 'The CodeSandbox Manager',
        validator: function (opt, cb) {
            if (opt) {
                cb();
            }
            else {
                cb(new ApiError(ErrorCode.EINVAL, "Manager is invalid"));
            }
        },
    },
};

// import Dropbox from '../backend/Dropbox';
// import Emscripten from '../backend/Emscripten';
// import FolderAdapter from '../backend/FolderAdapter';
// import HTML5FS from '../backend/HTML5FS';
// import IndexedDB from '../backend/IndexedDB';
// import LocalStorage from '../backend/LocalStorage';
// import MountableFileSystem from '../backend/MountableFileSystem';
// import OverlayFS from '../backend/OverlayFS';
// import HTTPRequest from '../backend/HTTPRequest';
// import ZipFS from '../backend/ZipFS';
// import IsoFS from '../backend/IsoFS';
// Monkey-patch `Create` functions to check options before file system initialization.
[
    AsyncMirror,
    // Dropbox,
    // Emscripten,
    // FolderAdapter,
    // HTML5FS,
    InMemoryFileSystem,
    // IndexedDB,
    // IsoFS,
    // LocalStorage,
    // MountableFileSystem,
    // OverlayFS,
    WorkerFS,
    // HTTPRequest,
    // ZipFS,
    CodeSandboxFS ].forEach(function (fsType) {
    var create = fsType.Create;
    fsType.Create = function (opts, cb) {
        var oneArg = typeof opts === 'function';
        var normalizedCb = oneArg ? opts : cb;
        var normalizedOpts = oneArg ? {} : opts;
        function wrappedCb(e) {
            if (e) {
                normalizedCb(e);
            }
            else {
                create.call(fsType, normalizedOpts, normalizedCb);
            }
        }
        checkOptions(fsType, normalizedOpts, wrappedCb);
    };
});
/**
 * @hidden
 */
var Backends = {
    AsyncMirror: AsyncMirror,
    // Dropbox,
    // Emscripten,
    // FolderAdapter,
    // HTML5FS,
    InMemory: InMemoryFileSystem,
    // IndexedDB,
    // IsoFS,
    // LocalStorage,
    // MountableFileSystem,
    // OverlayFS,
    WorkerFS: WorkerFS,
    // HTTPRequest,
    // XmlHttpRequest: HTTPRequest,
    // ZipFS,
    CodeSandboxFS: CodeSandboxFS,
};

/**
 * @hidden
 */
var bfsSetImmediate;
if (typeof (setImmediate) !== "undefined") {
    bfsSetImmediate = setImmediate;
}
else {
    var gScope = toExport;
    var timeouts = [];
    var messageName = "zero-timeout-message";
    var canUsePostMessage = function () {
        if (typeof gScope.importScripts !== 'undefined' || !gScope.postMessage) {
            return false;
        }
        var postMessageIsAsync = true;
        var oldOnMessage = gScope.onmessage;
        gScope.onmessage = function () {
            postMessageIsAsync = false;
        };
        gScope.postMessage('', '*');
        gScope.onmessage = oldOnMessage;
        return postMessageIsAsync;
    };
    if (canUsePostMessage()) {
        bfsSetImmediate = function (fn) {
            timeouts.push(fn);
            gScope.postMessage(messageName, "*");
        };
        var handleMessage = function (event) {
            if (event.source === self && event.data === messageName) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else {
                    event.cancelBubble = true;
                }
                if (timeouts.length > 0) {
                    var fn = timeouts.shift();
                    return fn();
                }
            }
        };
        if (gScope.addEventListener) {
            gScope.addEventListener('message', handleMessage, true);
        }
        else {
            gScope.attachEvent('onmessage', handleMessage);
        }
    }
    else if (gScope.MessageChannel) {
        // WebWorker MessageChannel
        var channel = new gScope.MessageChannel();
        channel.port1.onmessage = function (event) {
            if (timeouts.length > 0) {
                return timeouts.shift()();
            }
        };
        bfsSetImmediate = function (fn) {
            timeouts.push(fn);
            channel.port2.postMessage('');
        };
    }
    else {
        bfsSetImmediate = function (fn) {
            return setTimeout(fn, 0);
        };
    }
}
var bfsSetImmediate$1 = bfsSetImmediate;

/**
 * BrowserFS's main module. This is exposed in the browser via the BrowserFS global.
 * Due to limitations in typedoc, we document these functions in ./typedoc.ts.
 */
if (process['initializeTTYs']) {
    process['initializeTTYs']();
}
/**
 * Installs BFSRequire as global `require`, a Node Buffer polyfill as the global `Buffer` variable,
 * and a Node process polyfill as the global `process` variable.
 */
function install(obj) {
    obj.Buffer = Buffer;
    obj.process = process;
    var oldRequire = obj.require ? obj.require : null;
    // Monkey-patch require for Node-style code.
    obj.require = function (arg) {
        var rv = BFSRequire(arg);
        if (!rv) {
            return oldRequire.apply(null, Array.prototype.slice.call(arguments, 0));
        }
        else {
            return rv;
        }
    };
}
/**
 * @hidden
 */
function registerFileSystem(name, fs) {
    Backends[name] = fs;
}
function BFSRequire(module) {
    switch (module) {
        case 'fs':
            return _fsMock;
        case 'path':
            return path;
        case 'buffer':
            // The 'buffer' module has 'Buffer' as a property.
            return buffer;
        case 'process':
            return process;
        case 'bfs_utils':
            return BFSUtils;
        default:
            return Backends[module];
    }
}
/**
 * Initializes BrowserFS with the given root file system.
 */
function initialize(rootfs) {
    return _fsMock.initialize(rootfs);
}
/**
 * Creates a file system with the given configuration, and initializes BrowserFS with it.
 * See the FileSystemConfiguration type for more info on the configuration object.
 */
function configure(config, cb) {
    getFileSystem(config, function (e, fs) {
        if (fs) {
            initialize(fs);
            cb();
        }
        else {
            cb(e);
        }
    });
}
/**
 * Retrieve a file system with the given configuration.
 * @param config A FileSystemConfiguration object. See FileSystemConfiguration for details.
 * @param cb Called when the file system is constructed, or when an error occurs.
 */
function getFileSystem(config, cb) {
    var fsName = config['fs'];
    if (!fsName) {
        return cb(new ApiError(ErrorCode.EPERM, 'Missing "fs" property on configuration object.'));
    }
    var options = config['options'];
    var waitCount = 0;
    var called = false;
    function finish() {
        if (!called) {
            called = true;
            var fsc = Backends[fsName];
            if (!fsc) {
                cb(new ApiError(ErrorCode.EPERM, ("File system " + fsName + " is not available in BrowserFS.")));
            }
            else {
                fsc.Create(options, cb);
            }
        }
    }
    if (options !== null && typeof (options) === "object") {
        var finishedIterating = false;
        var props = Object.keys(options).filter(function (k) { return k !== 'fs'; });
        // Check recursively if other fields have 'fs' properties.
        props.forEach(function (p) {
            var d = options[p];
            if (d !== null && typeof (d) === "object" && d['fs']) {
                waitCount++;
                getFileSystem(d, function (e, fs) {
                    waitCount--;
                    if (e) {
                        if (called) {
                            return;
                        }
                        called = true;
                        cb(e);
                    }
                    else {
                        options[p] = fs;
                        if (waitCount === 0 && finishedIterating) {
                            finish();
                        }
                    }
                });
            }
        });
        finishedIterating = true;
    }
    if (waitCount === 0) {
        finish();
    }
}

/**
 * BrowserFS's main entry point.
 * It installs all of the needed polyfills, and requires() the main module.
 */
// IE substr does not support negative indices
if ('ab'.substr(-1) !== 'b') {
    String.prototype.substr = function (substr) {
        return function (start, length) {
            // did we get a negative start, calculate how much it is from the
            // beginning of the string
            if (start < 0) {
                start = this.length + start;
            }
            // call the original function
            return substr.call(this, start, length);
        };
    }(String.prototype.substr);
}
// Polyfill for Uint8Array.prototype.slice.
// Safari and some other browsers do not define it.
if (typeof (ArrayBuffer) !== 'undefined' && typeof (Uint8Array) !== 'undefined') {
    if (!Uint8Array.prototype['slice']) {
        Uint8Array.prototype.slice = function (start, end) {
            if ( start === void 0 ) start = 0;
            if ( end === void 0 ) end = this.length;

            var self = this;
            if (start < 0) {
                start = this.length + start;
                if (start < 0) {
                    start = 0;
                }
            }
            if (end < 0) {
                end = this.length + end;
                if (end < 0) {
                    end = 0;
                }
            }
            if (end < start) {
                end = start;
            }
            return new Uint8Array(self.buffer, self.byteOffset + start, end - start);
        };
    }
}

exports.install = install;
exports.registerFileSystem = registerFileSystem;
exports.BFSRequire = BFSRequire;
exports.initialize = initialize;
exports.configure = configure;
exports.getFileSystem = getFileSystem;
exports.EmscriptenFS = BFSEmscriptenFS;
exports.FileSystem = Backends;
exports.Errors = api_error;
exports.setImmediate = bfsSetImmediate$1;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(5), __webpack_require__(2)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = __webpack_require__(6);
// Path depends on process. Avoid a circular reference by dynamically including path when we need it.
var path = null;
var Item = (function () {
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    return Item;
}());
/**
 * Contains a queue of Items for process.nextTick.
 * Inspired by node-process: https://github.com/defunctzombie/node-process
 */
var NextTickQueue = (function () {
    function NextTickQueue() {
        this._queue = [];
        this._draining = false;
        // Used/assigned by the drainQueue function.
        this._currentQueue = null;
        this._queueIndex = -1;
    }
    NextTickQueue.prototype.push = function (item) {
        var _this = this;
        if (this._queue.push(item) === 1 && !this._draining) {
            setTimeout(function () { return _this._drainQueue(); }, 0);
        }
    };
    NextTickQueue.prototype._cleanUpNextTick = function () {
        this._draining = false;
        if (this._currentQueue && this._currentQueue.length) {
            this._queue = this._currentQueue.concat(this._queue);
        }
        else {
            this._queueIndex = -1;
        }
        if (this._queue.length) {
            this._drainQueue();
        }
    };
    NextTickQueue.prototype._drainQueue = function () {
        var _this = this;
        if (this._draining) {
            return;
        }
        // If an Item throws an unhandled exception, this function will clean things up.
        var timeout = setTimeout(function () { return _this._cleanUpNextTick(); });
        this._draining = true;
        var len = this._queue.length;
        while (len) {
            this._currentQueue = this._queue;
            this._queue = [];
            while (++this._queueIndex < len) {
                if (this._currentQueue) {
                    this._currentQueue[this._queueIndex].run();
                }
            }
            this._queueIndex = -1;
            len = this._queue.length;
        }
        this._currentQueue = null;
        this._draining = false;
        clearTimeout(timeout);
    };
    return NextTickQueue;
}());
/**
 * Partial implementation of Node's `process` module.
 * We implement the portions that are relevant for the filesystem.
 * @see http://nodejs.org/api/process.html
 * @class
 */
var Process = (function (_super) {
    __extends(Process, _super);
    function Process() {
        _super.apply(this, arguments);
        this.startTime = Date.now();
        this._cwd = '/';
        /**
         * Returns what platform you are running on.
         * @return [String]
         */
        this.platform = 'browser';
        this.argv = [];
        this.execArgv = [];
        this.stdout = null;
        this.stderr = null;
        this.stdin = null;
        this.domain = null;
        this._queue = new NextTickQueue();
        this.execPath = __dirname;
        this.env = {};
        this.exitCode = 0;
        this._gid = 1;
        this._uid = 1;
        this.version = 'v5.0';
        this.versions = {
            http_parser: '0.0',
            node: '5.0',
            v8: '0.0',
            uv: '0.0',
            zlib: '0.0',
            ares: '0.0',
            icu: '0.0',
            modules: '0',
            openssl: '0.0'
        };
        this.config = {
            target_defaults: { cflags: [],
                default_configuration: 'Release',
                defines: [],
                include_dirs: [],
                libraries: [] },
            variables: { clang: 0,
                host_arch: 'x32',
                node_install_npm: false,
                node_install_waf: false,
                node_prefix: '',
                node_shared_cares: false,
                node_shared_http_parser: false,
                node_shared_libuv: false,
                node_shared_zlib: false,
                node_shared_v8: false,
                node_use_dtrace: false,
                node_use_etw: false,
                node_use_openssl: false,
                node_shared_openssl: false,
                strict_aliasing: false,
                target_arch: 'x32',
                v8_use_snapshot: false,
                v8_no_strict_aliasing: 0,
                visibility: '' } };
        this.pid = (Math.random() * 1000) | 0;
        this.title = 'node';
        this.arch = 'x32';
        this._mask = 18;
        // Undefined in main thread. Worker-only.
        this.connected = undefined;
    }
    /**
     * Changes the current working directory.
     *
     * **Note**: BrowserFS does not validate that the directory actually exists.
     *
     * @example Usage example
     *   console.log('Starting directory: ' + process.cwd());
     *   process.chdir('/tmp');
     *   console.log('New directory: ' + process.cwd());
     * @param [String] dir The directory to change to.
     */
    Process.prototype.chdir = function (dir) {
        // XXX: Circular dependency hack.
        if (path === null) {
            path = __webpack_require__(12);
        }
        this._cwd = path.resolve(dir);
    };
    /**
     * Returns the current working directory.
     * @example Usage example
     *   console.log('Current directory: ' + process.cwd());
     * @return [String] The current working directory.
     */
    Process.prototype.cwd = function () {
        return this._cwd;
    };
    /**
     * Number of seconds BrowserFS has been running.
     * @return [Number]
     */
    Process.prototype.uptime = function () {
        return ((Date.now() - this.startTime) / 1000) | 0;
    };
    Process.prototype.nextTick = function (fun) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._queue.push(new Item(fun, args));
    };
    Process.prototype.abort = function () {
        this.emit('abort');
    };
    Process.prototype.exit = function (code) {
        this.exitCode = code;
        this.emit('exit', [code]);
    };
    Process.prototype.getgid = function () {
        return this._gid;
    };
    Process.prototype.setgid = function (gid) {
        if (typeof gid === 'number') {
            this._gid = gid;
        }
        else {
            this._gid = 1;
        }
    };
    Process.prototype.getuid = function () {
        return this._uid;
    };
    Process.prototype.setuid = function (uid) {
        if (typeof uid === 'number') {
            this._uid = uid;
        }
        else {
            this._uid = 1;
        }
    };
    Process.prototype.kill = function (pid, signal) {
        this.emit('kill', [pid, signal]);
    };
    Process.prototype.memoryUsage = function () {
        return { rss: 0, heapTotal: 0, heapUsed: 0 };
    };
    Process.prototype.umask = function (mask) {
        if (mask === void 0) { mask = this._mask; }
        var oldMask = this._mask;
        this._mask = mask;
        this.emit('umask', [mask]);
        return oldMask;
    };
    Process.prototype.hrtime = function () {
        var timeinfo;
        if (typeof performance !== 'undefined') {
            timeinfo = performance.now();
        }
        else if (Date['now']) {
            timeinfo = Date.now();
        }
        else {
            timeinfo = (new Date()).getTime();
        }
        var secs = (timeinfo / 1000) | 0;
        timeinfo -= secs * 1000;
        timeinfo = (timeinfo * 1000000) | 0;
        return [secs, timeinfo];
    };
    /**
     * [BFS only] Initialize the TTY devices.
     */
    Process.prototype.initializeTTYs = function () {
        // Guard against multiple invocations.
        if (this.stdout === null) {
            var TTY = __webpack_require__(22);
            this.stdout = new TTY();
            this.stderr = new TTY();
            this.stdin = new TTY();
        }
    };
    /**
     * Worker-only function; irrelevant here.
     */
    Process.prototype.disconnect = function () {
    };
    return Process;
}(events.EventEmitter));
module.exports = Process;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stream = __webpack_require__(23);
var TTY = (function (_super) {
    __extends(TTY, _super);
    function TTY() {
        _super.call(this);
        this.isRaw = false;
        this.columns = 80;
        this.rows = 120;
        this.isTTY = true;
        this._bufferedWrites = [];
        this._waitingForWrites = false;
    }
    /**
     * Toggle raw mode.
     */
    TTY.prototype.setRawMode = function (mode) {
        if (this.isRaw !== mode) {
            this.isRaw = mode;
            // [BFS] TTY implementations can use this to change their event emitting
            //       patterns.
            this.emit('modeChange');
        }
    };
    /**
     * [BFS] Update the number of columns available on the terminal.
     */
    TTY.prototype.changeColumns = function (columns) {
        if (columns !== this.columns) {
            this.columns = columns;
            // Resize event.
            this.emit('resize');
        }
    };
    /**
     * [BFS] Update the number of rows available on the terminal.
     */
    TTY.prototype.changeRows = function (rows) {
        if (rows !== this.rows) {
            this.rows = rows;
            // Resize event.
            this.emit('resize');
        }
    };
    /**
     * Returns 'true' if the given object is a TTY.
     */
    TTY.isatty = function (fd) {
        return fd && fd instanceof TTY;
    };
    TTY.prototype._write = function (chunk, encoding, cb) {
        var error;
        try {
            var data;
            if (typeof (chunk) === 'string') {
                data = new Buffer(chunk, encoding);
            }
            else {
                data = chunk;
            }
            this._bufferedWrites.push(data);
            if (this._waitingForWrites) {
                this._read(1024);
            }
        }
        catch (e) {
            error = e;
        }
        finally {
            cb(error);
        }
    };
    TTY.prototype._read = function (size) {
        // Size is advisory -- we can ignore it.
        if (this._bufferedWrites.length === 0) {
            this._waitingForWrites = true;
        }
        else {
            while (this._bufferedWrites.length > 0) {
                this._waitingForWrites = this.push(this._bufferedWrites.shift());
                if (!this._waitingForWrites) {
                    break;
                }
            }
        }
    };
    return TTY;
}(stream.Duplex));
module.exports = TTY;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(6).EventEmitter;
var inherits = __webpack_require__(1);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(9);
Stream.Writable = __webpack_require__(29);
Stream.Duplex = __webpack_require__(30);
Stream.Transform = __webpack_require__(31);
Stream.PassThrough = __webpack_require__(32);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(10).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(17);

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(1);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9).Transform


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9).PassThrough


/***/ })
/******/ ]);
});
//# sourceMappingURL=browserfs.js.map