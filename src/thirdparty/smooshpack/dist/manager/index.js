"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var codesandbox_api_1 = require("codesandbox-api");
var templates_1 = require("codesandbox-import-utils/lib/create-sandbox/templates");
var lodash_isequal_1 = require("lodash.isequal");
var generate_package_json_1 = require("../utils/generate-package-json");
var version_1 = require("../version");
var BUNDLER_URL = process.env.CODESANDBOX_ENV === 'development'
    ? 'http://localhost:3001'
    : "https://sandpack-" + version_1.default.replace(/\./g, '-') + ".codesandbox.io";
var PreviewManager = /** @class */ (function () {
    function PreviewManager(selector, sandboxInfo, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.options = options;
        this.sandboxInfo = sandboxInfo;
        this.bundlerURL = options.bundlerURL || BUNDLER_URL;
        if (typeof selector === 'string') {
            this.selector = selector;
            var element = document.querySelector(selector);
            if (!element) {
                throw new Error("No element found for selector '" + selector + "'");
            }
            this.element = element;
            this.iframe = document.createElement('iframe');
            this.initializeElement();
        }
        else {
            this.element = selector;
            this.iframe = selector;
        }
        this.iframe.src = this.bundlerURL;
        this.listener = codesandbox_api_1.listen(function (message) {
            switch (message.type) {
                case 'initialized': {
                    if (_this.iframe) {
                        if (_this.iframe.contentWindow) {
                            codesandbox_api_1.registerFrame(_this.iframe.contentWindow);
                            if (_this.options.fileResolver) {
                                _this.fileResolverProtocol = new codesandbox_api_1.Protocol('file-resolver', function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (data.m === 'isFile') {
                                            return [2 /*return*/, this.options.fileResolver.isFile(data.p)];
                                        }
                                        else {
                                            return [2 /*return*/, this.options.fileResolver.readFile(data.p)];
                                        }
                                        return [2 /*return*/];
                                    });
                                }); }, _this.iframe.contentWindow);
                            }
                        }
                        _this.updatePreview();
                    }
                    break;
                }
                default: {
                    // Do nothing
                }
            }
        });
    }
    PreviewManager.prototype.updateOptions = function (options) {
        if (!lodash_isequal_1.default(this.options, options)) {
            this.options = options;
            this.updatePreview();
        }
    };
    PreviewManager.prototype.updatePreview = function (sandboxInfo) {
        if (sandboxInfo === void 0) { sandboxInfo = this.sandboxInfo; }
        this.sandboxInfo = sandboxInfo;
        var files = this.getFiles();
        var modules = Object.keys(files).reduce(function (prev, next) {
            var _a;
            return (__assign({}, prev, (_a = {}, _a[next] = {
                code: files[next].code,
                path: next,
            }, _a)));
        }, {});
        var packageJSON = JSON.parse(generate_package_json_1.getPackageJSON(this.sandboxInfo.dependencies, this.sandboxInfo.entry));
        try {
            packageJSON = JSON.parse(files['/package.json'].code);
        }
        catch (e) {
            console.error('Could not parse package.json file: ' + e.message);
        }
        // TODO move this to a common format
        var normalizedModules = Object.keys(files).reduce(function (prev, next) {
            var _a;
            return (__assign({}, prev, (_a = {}, _a[next] = {
                content: files[next].code,
                path: next,
            }, _a)));
        }, {});
        codesandbox_api_1.dispatch({
            type: 'compile',
            codesandbox: true,
            version: 3,
            modules: modules,
            externalResources: [],
            hasFileResolver: !!this.options.fileResolver,
            template: this.sandboxInfo.template ||
                templates_1.getTemplate(packageJSON, normalizedModules),
            showOpenInCodeSandbox: this.sandboxInfo.showOpenInCodeSandbox == null
                ? true
                : this.sandboxInfo.showOpenInCodeSandbox,
            skipEval: this.options.skipEval || false,
        });
    };
    PreviewManager.prototype.dispatch = function (message) {
        codesandbox_api_1.dispatch(message);
    };
    /**
     * Get the URL of the contents of the current sandbox
     */
    PreviewManager.prototype.getCodeSandboxURL = function () {
        var files = this.getFiles();
        var paramFiles = Object.keys(files).reduce(function (prev, next) {
            var _a;
            return (__assign({}, prev, (_a = {}, _a[next.replace('/', '')] = {
                content: files[next].code,
                isBinary: false,
            }, _a)));
        }, {});
        return fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
            method: 'POST',
            body: JSON.stringify({ files: paramFiles }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(function (x) { return x.json(); })
            .then(function (res) { return ({
            sandboxId: res.sandbox_id,
            editorUrl: "https://codesandbox.io/s/" + res.sandbox_id,
            embedUrl: "https://codesandbox.io/embed/" + res.sandbox_id,
        }); });
    };
    PreviewManager.prototype.getFiles = function () {
        var sandboxInfo = this.sandboxInfo;
        if (sandboxInfo.files['/package.json'] === undefined) {
            return generate_package_json_1.default(sandboxInfo.files, sandboxInfo.dependencies, sandboxInfo.entry);
        }
        return this.sandboxInfo.files;
    };
    PreviewManager.prototype.initializeElement = function () {
        this.iframe.style.border = '0';
        this.iframe.style.width = this.options.width || '100%';
        this.iframe.style.height = this.options.height || '100%';
        this.iframe.style.overflow = 'hidden';
        if (!this.element.parentNode) {
            // This should never happen
            throw new Error('Given element does not have a parent.');
        }
        this.element.parentNode.replaceChild(this.iframe, this.element);
    };
    return PreviewManager;
}());
exports.default = PreviewManager;
//# sourceMappingURL=index.js.map