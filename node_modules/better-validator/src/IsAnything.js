"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("./Base");
const IsArrayOf_1 = require("./IsArrayOf");
const IsArrayOrObjectOf_1 = require("./IsArrayOrObjectOf");
const IsBoolean_1 = require("./IsBoolean");
const IsNumber_1 = require("./IsNumber");
const IsObject_1 = require("./IsObject");
const IsString_1 = require("./IsString");
class IsAnything extends Base_1.Base {
    constructor(path) {
        super(path);
    }
    isNumber() {
        const child = new IsNumber_1.IsNumber(this.path);
        this.satisfies('isNumber', value => (!Base_1.Base.hasValue(value) || _.isNumber(value)) && (!isNaN(value) || value === undefined) && child.test(value));
        return child;
    }
    isBoolean() {
        const child = new IsBoolean_1.IsBoolean(this.path);
        this.satisfies('isBoolean', value => (!Base_1.Base.hasValue(value) || _.isBoolean(value)) && child.test(value));
        return child;
    }
    isString() {
        const child = new IsString_1.IsString(this.path);
        this.satisfies('isString', value => (!Base_1.Base.hasValue(value) || _.isString(value)) && child.test(value));
        return child;
    }
    isObject(objectValidator) {
        const child = new IsObject_1.IsObject(this.path, objectValidator, IsAnything, 'isAnything');
        this.satisfies('isObject', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && child.test(value));
        return child;
    }
    isObjectArray(childValidator) {
        const factory = path => {
            return new IsObject_1.IsObject(path, childValidator, IsAnything, 'isAnything');
        };
        const child = new IsArrayOf_1.IsArrayOf(this.path, factory, 'isObject');
        this.satisfies('isObjectArray', value => (!Base_1.Base.hasValue(value) || _.isArray(value)) && child.test(value));
        return child;
    }
    isArrayOrObject(childValidator) {
        const factory = path => {
            return new IsObject_1.IsObject(path, childValidator, IsAnything, 'isAnything');
        };
        const child = new IsArrayOrObjectOf_1.IsArrayOrObjectOf(this.path, factory, 'isObject');
        this.satisfies('isArrayOrObjectOf', value => child.test(value));
        return child;
    }
    isArray(childValidator) {
        const factory = path => {
            const itemValidator = new IsAnything(path);
            childValidator(itemValidator);
            return itemValidator;
        };
        const child = new IsArrayOf_1.IsArrayOf(this.path, factory, 'isObject');
        this.satisfies('isArray', value => (!Base_1.Base.hasValue(value) || _.isArray(value)) && child.test(value));
        return child;
    }
}
exports.IsAnything = IsAnything;
//# sourceMappingURL=IsAnything.js.map