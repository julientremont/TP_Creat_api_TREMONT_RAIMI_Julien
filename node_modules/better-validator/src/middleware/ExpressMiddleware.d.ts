import { ObjectValidator, StringObjectValidator } from '../IsObject';
export declare class ExpressMiddleware {
    protected options: any;
    constructor(options: any);
    query(rule: StringObjectValidator): (req: any, res: any, next: any) => void;
    body(rule: ObjectValidator): (req: any, res: any, next: any) => void;
    params(rule: StringObjectValidator): (req: any, res: any, next: any) => void;
    checkErrors(validator: any, req: any, res: any, next: any): void;
}
