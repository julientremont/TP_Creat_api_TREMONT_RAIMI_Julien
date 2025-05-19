import { ObjectValidator, StringObjectValidator } from '../IsObject';
export declare class Koa2Middleware {
    protected options: any;
    constructor(options: any);
    query(rule: StringObjectValidator): (ctx: any, next: any) => Promise<void>;
    body(rule: ObjectValidator): (ctx: any, next: any) => Promise<void>;
    params(rule: StringObjectValidator): (ctx: any, next: any) => Promise<void>;
    checkErrors(validator: any, ctx: any, next: any): Promise<void>;
}
