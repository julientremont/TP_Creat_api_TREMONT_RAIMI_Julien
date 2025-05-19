import { Base } from './Base';
import { IsArrayOf } from './IsArrayOf';
import { IsArrayOrObjectOf } from './IsArrayOrObjectOf';
import { IsBoolean } from './IsBoolean';
import { IsNumber } from './IsNumber';
import { IsObject, ObjectValidator } from './IsObject';
import { IsString } from './IsString';
export declare type ArrayValidator = (validator: IsAnything) => void;
export declare class IsAnything extends Base {
    constructor(path: (string | number)[] | null);
    isNumber(): IsNumber;
    isBoolean(): IsBoolean;
    isString(): IsString;
    isObject(objectValidator: ObjectValidator): IsObject;
    isObjectArray(childValidator: ObjectValidator): IsArrayOf;
    isArrayOrObject(childValidator: ObjectValidator): IsArrayOrObjectOf;
    isArray(childValidator: ArrayValidator): IsArrayOf;
}
