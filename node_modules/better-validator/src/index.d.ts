import { IFailure } from './Base';
import * as format from './format';
import { IsAnything } from './IsAnything';
import { ExpressMiddleware } from './middleware/ExpressMiddleware';
import { Koa2Middleware } from './middleware/Koa2Middleware';
import { KoaMiddleware } from './middleware/KoaMiddleware';
declare class Validator {
    static default: typeof Validator;
    static expressMiddleware(options: any): ExpressMiddleware;
    static koaMiddleware(options: any): KoaMiddleware;
    static koa2Middleware(options: any): Koa2Middleware;
    static create(options?: any): ((value: any) => IsAnything) & ({
        run: () => IFailure[];
    });
    static readonly format: typeof format;
    constructor(options: any);
}
export = Validator;
