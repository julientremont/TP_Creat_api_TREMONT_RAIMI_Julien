import { ObjectValidator, StringObjectValidator } from '../IsObject';
export declare class KoaMiddleware {
    protected options: any;
    constructor(options: any);
    query(rule: StringObjectValidator): (next: any) => IterableIterator<IterableIterator<any>>;
    body(rule: ObjectValidator): (next: any) => IterableIterator<IterableIterator<any>>;
    params(rule: StringObjectValidator): (next: any) => IterableIterator<IterableIterator<any>>;
    checkErrors(validator: any, ctx: any, next: any): IterableIterator<any>;
}
