export declare class I18nKoaFormatter {
    protected options: any;
    /**
     * Create new message formatter
     * @param {object} [options] - options
     * @param {string} [options.messageElement] - name of formatted path property, default = 'message'
     * @param {string} [options.lookupPrefix] - prefix used when passing failure to i18n, default = ''
     */
    constructor(options: any);
    /**
     * Format validation failure object
     * @param {object} failure - validation failure
     * @param {Context} ctx - express req object
     * @return {object} formatted failure
     */
    format(failure: any, ctx: any): any;
}
