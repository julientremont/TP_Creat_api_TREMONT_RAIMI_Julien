export declare class WrapperFormatter {
    protected options: any;
    /**
     * Create wrapper formatter
     * @param {object} [options] - options
     * @param {string} [options.wrapperElement] - wrapper element name, default = 'failures'
     * @param {object} [options.staticTemplate] - static response template into which the wrapped failures will be injected, default = {type: 'ValidationError'}
     */
    constructor(options: any);
    /**
     * Format path
     * @param {object[]} failures - array of failures
     * @return {string} formatted response
     */
    format(failures: any): any;
}
