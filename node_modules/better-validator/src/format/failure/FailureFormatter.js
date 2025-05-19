"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Helpers_1 = require("../../Helpers");
const path_1 = require("../path");
const DEFAULT_OPTIONS = {
    pathElement: 'parameter',
    pathFormatter: new path_1.PathFormatter(null),
};
class FailureFormatter {
    /**
     * Create new error formatter
     * @param {object} [options] - options
     * @param {string} [options.pathElement] - name of formatted path property, default = 'parameter'
     * @param {function|object} [options.pathFormatter] - path formatter, default format 'foo[0].bar'
     */
    constructor(options) {
        this.options = _.defaults({}, options, DEFAULT_OPTIONS);
    }
    /**
     * Format validation failure object
     * @param {object} failure - validation failure
     * @return {object} formatted failure
     */
    format(failure) {
        return {
            [this.options.pathElement]: Helpers_1.Helpers.format(this.options.pathFormatter, failure.path),
            failed: failure.failed,
            value: failure.value,
        };
    }
}
exports.FailureFormatter = FailureFormatter;
//# sourceMappingURL=FailureFormatter.js.map