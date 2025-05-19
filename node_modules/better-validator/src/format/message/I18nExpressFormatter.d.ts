export declare class I18nExpressFormatter {
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
     * @param {object} req - express req object
     * @return {object} formatted failure
     */
    format(failure: any, req: any): any;
}
