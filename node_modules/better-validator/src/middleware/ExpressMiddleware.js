"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("../Base");
const Helpers_1 = require("../Helpers");
const IsObject_1 = require("../IsObject");
const IsString_1 = require("../IsString");
const ValidatorFactory_1 = require("../ValidatorFactory");
class ExpressMiddleware {
    constructor(options) {
        this.options = _.defaults({}, options);
    }
    query(rule) {
        return (req, res, next) => {
            const validator = new ValidatorFactory_1.ValidatorFactory(this.options);
            const anythingValidator = validator.create(req.query).display('?');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            this.checkErrors(validator, req, res, next);
        };
    }
    body(rule) {
        return (req, res, next) => {
            const validator = new ValidatorFactory_1.ValidatorFactory(this.options);
            validator.create(req.body).isObject(rule);
            this.checkErrors(validator, req, res, next);
        };
    }
    params(rule) {
        return (req, res, next) => {
            const validator = new ValidatorFactory_1.ValidatorFactory(this.options);
            const anythingValidator = validator.create(req.params).display('@');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            this.checkErrors(validator, req, res, next);
        };
    }
    checkErrors(validator, req, res, next) {
        const failures = validator.run();
        if (!failures || !failures.length) {
            next();
            return;
        }
        res.status(400).send(Helpers_1.Helpers.format(this.options.responseFormatter, _.map(failures, failure => Helpers_1.Helpers.format(this.options.translationFormatter, failure, req, res))));
    }
}
exports.ExpressMiddleware = ExpressMiddleware;
//# sourceMappingURL=ExpressMiddleware.js.map