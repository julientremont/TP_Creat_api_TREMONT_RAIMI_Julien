"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
class Base {
    static hasValue(value, allowNull) {
        return (!allowNull) ? (value !== undefined && value !== null) : value !== undefined;
    }
    constructor(path) {
        this.path = !path ? [] : typeof path !== 'string' ? path : [path];
        this.tests = [];
    }
    display(path) {
        if (path !== null && path !== undefined) {
            this.path.push(path);
        }
        return this;
    }
    required() {
        const child = new this.constructor(this.path);
        this.satisfies('required', value => Base.hasValue(value, false) && child.test(value));
        return child;
    }
    requiredWithNull() {
        const child = new this.constructor(this.path);
        this.satisfies('requiredWithNull', value => Base.hasValue(value, true) && child.test(value));
        return child;
    }
    isIncludedInArray(array = []) {
        this.satisfies('isIncludedInArray', value => _.contains(array, value));
        return this;
    }
    isEqual(expected) {
        this.satisfies('isEqual', value => value === expected);
        return this;
    }
    notEqual(expected) {
        this.satisfies('notEqual', value => value !== expected);
        return this;
    }
    if(predicate, validator) {
        this.satisfies('if', value => {
            const passed = predicate(value);
            if (!passed)
                return [];
            const child = new this.constructor(this.path);
            validator(child);
            return child.test(value);
        });
        return this;
    }
    satisfies(name, rule) {
        this.tests.push({ name, rule });
        return this;
    }
    check(rule) {
        return rule && rule(this) || this;
    }
    test(value) {
        const failures = [];
        for (const test of this.tests) {
            const results = test.rule(value);
            if (_.isArray(results)) {
                for (const result of results) {
                    failures.push(result);
                }
            }
            else {
                if (results)
                    continue;
                // failed
                failures.push({
                    failed: test.name,
                    path: this.path,
                    rule: test.rule,
                    value,
                });
            }
        }
        return failures;
    }
}
exports.Base = Base;
//# sourceMappingURL=Base.js.map