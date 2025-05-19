import { Base } from './Base';
import { IsAnything } from './IsAnything';
import { IsString } from './IsString';
export declare type ObjectValidator = (validator: ChildValidator | StringChildValidator) => void;
export declare type ChildValidator = ((property: string) => IsAnything) & (() => IsObject);
export declare type StringObjectValidator = (validator: StringChildValidator) => void;
export declare type StringChildValidator = ((property: string) => IsString) & (() => IsObject);
export declare type BaseConstructor = new (path: (string | number)[]) => Base;
export declare class IsObject extends Base {
    protected properties: string[];
    protected objectValidator: ObjectValidator;
    protected elementValidator: BaseConstructor;
    protected elementValidatorName: string;
    constructor(path: (string | number)[], objectValidator: ObjectValidator, elementValidator: BaseConstructor, elementValidatorName: string);
    strict(): this;
    protected childValidator(property: any): Base;
}
