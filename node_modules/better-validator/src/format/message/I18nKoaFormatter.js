"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const DEFAULT_OPTIONS = {
    lookupPrefix: '',
    messageElement: 'message',
};
class I18nKoaFormatter {
    /**
     * Create new message formatter
     * @param {object} [options] - options
     * @param {string} [options.messageElement] - name of formatted path property, default = 'message'
     * @param {string} [options.lookupPrefix] - prefix used when passing failure to i18n, default = ''
     */
    constructor(options) {
        this.options = _.defaults({}, options, DEFAULT_OPTIONS);
    }
    /**
     * Format validation failure object
     * @param {object} failure - validation failure
     * @param {Context} ctx - express req object
     * @return {object} formatted failure
     */
    format(failure, ctx) {
        failure[this.options.messageElement] = ctx.i18n.__(this.options.lookupPrefix + failure.failed, failure);
        return failure;
    }
}
exports.I18nKoaFormatter = I18nKoaFormatter;
//# sourceMappingURL=I18nKoaFormatter.js.map