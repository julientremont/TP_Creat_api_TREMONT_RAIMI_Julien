import { Base } from './Base';
import { IsAnything } from './IsAnything';
export declare class ValidatorFactory {
    protected static defaultOptions: any;
    protected options: any;
    protected tests: {
        validator: Base;
        value: any;
    }[];
    constructor(options: any);
    create(value: any): IsAnything;
    createAndRun(value: any, rules: (validator: Base) => void): any[];
    run(): any[];
}
