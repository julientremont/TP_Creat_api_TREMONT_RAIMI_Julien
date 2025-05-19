"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Helpers_1 = require("./Helpers");
const IsAnything_1 = require("./IsAnything");
const DEFAULT_OPTIONS = {
    failureFormatter: null,
    responseFormatter: null,
};
class ValidatorFactory {
    constructor(options) {
        this.options = _.defaults({}, options, ValidatorFactory.defaultOptions, DEFAULT_OPTIONS);
        this.tests = [];
    }
    create(value) {
        const test = {
            validator: new IsAnything_1.IsAnything(null),
            value,
        };
        this.tests.push(test);
        return test.validator;
    }
    createAndRun(value, rules) {
        const test = {
            validator: new IsAnything_1.IsAnything(null),
            value,
        };
        rules(test.validator);
        return test.validator.test(test.value);
    }
    run() {
        const failures = _.flatten(_.map(this.tests, test => test.validator.test(test.value)));
        const formatter = this.options.failureFormatter;
        if (!formatter) {
            return failures;
        }
        return _.map(failures, failure => {
            return Helpers_1.Helpers.format(formatter, failure);
        });
    }
}
exports.ValidatorFactory = ValidatorFactory;
//# sourceMappingURL=ValidatorFactory.js.map