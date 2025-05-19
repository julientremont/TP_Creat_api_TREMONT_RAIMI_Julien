export declare class PathFormatter {
    protected options: any;
    /**
     * Create new path formatter
     * @param {object} [options] - options
     * @param {string} [options.separator] - path element separator, default = '.'
     * @param {string} [options.initialSeparator] - path element separator for before first element, default = ''
     */
    constructor(options: any);
    /**
     * Format path
     * @param {string[]} path - path parts array
     * @return {string} formatted path
     */
    format(path: (string | number)[]): string;
    protected formatIndex(index: number, position: number, length: number): string;
    protected formatProperty(property: string, position: number, length: number): string;
}
