export declare class FailureFormatter {
    protected options: any;
    /**
     * Create new error formatter
     * @param {object} [options] - options
     * @param {string} [options.pathElement] - name of formatted path property, default = 'parameter'
     * @param {function|object} [options.pathFormatter] - path formatter, default format 'foo[0].bar'
     */
    constructor(options: any);
    /**
     * Format validation failure object
     * @param {object} failure - validation failure
     * @return {object} formatted failure
     */
    format(failure: any): {
        [x: number]: any;
        failed: any;
        value: any;
    };
}
