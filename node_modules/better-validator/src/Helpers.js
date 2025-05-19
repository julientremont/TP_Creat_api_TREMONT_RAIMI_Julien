"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
var Helpers;
(function (Helpers) {
    function format(formatter, value, ...args) {
        return _.isFunction(formatter)
            ? formatter(value, ...args)
            : _.isObject(formatter)
                ? formatter.format(value, ...args)
                : value;
    }
    Helpers.format = format;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
//# sourceMappingURL=Helpers.js.map