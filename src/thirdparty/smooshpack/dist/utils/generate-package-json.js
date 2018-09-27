"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getPackageJSON(dependencies, entry) {
    if (dependencies === void 0) { dependencies = {}; }
    if (entry === void 0) { entry = '/index.js'; }
    return JSON.stringify({
        name: 'sandpack-project',
        main: entry,
        dependencies: dependencies,
    }, null, 2);
}
exports.getPackageJSON = getPackageJSON;
function createMissingPackageJSON(files, dependencies, entry) {
    var newFiles = __assign({}, files);
    if (!newFiles['/package.json']) {
        if (!dependencies) {
            throw new Error('No dependencies specified, please specify either a package.json or dependencies.');
        }
        if (!entry) {
            throw new Error("No entry specified, please specify either a package.json with 'main' field or dependencies.");
        }
        newFiles['/package.json'] = {
            code: getPackageJSON(dependencies, entry),
        };
    }
    return newFiles;
}
exports.default = createMissingPackageJSON;
//# sourceMappingURL=generate-package-json.js.map