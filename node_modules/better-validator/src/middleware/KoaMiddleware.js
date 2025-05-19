"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("../Base");
const Helpers_1 = require("../Helpers");
const IsObject_1 = require("../IsObject");
const IsString_1 = require("../IsString");
const ValidatorFactory_1 = require("../ValidatorFactory");
class KoaMiddleware {
    constructor(options) {
        this.options = _.defaults({}, options);
    }
    query(rule) {
        const self = this;
        return function* queryGenerator(next) {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            const anythingValidator = validator.create(this.query).display('?');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            yield self.checkErrors(validator, this, next);
        };
    }
    body(rule) {
        const self = this;
        return function* bodyGenerator(next) {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            validator.create(this.request.body).isObject(rule);
            yield self.checkErrors(validator, this, next);
        };
    }
    params(rule) {
        const self = this;
        return function* paramsGenerator(next) {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            const anythingValidator = validator.create(this.params).display('@');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            yield self.checkErrors(validator, this, next);
        };
    }
    *checkErrors(validator, ctx, next) {
        const failures = validator.run();
        if (!failures || !failures.length) {
            yield next;
            return;
        }
        ctx.status = 400;
        ctx.body = Helpers_1.Helpers.format(this.options.responseFormatter, _.map(failures, failure => Helpers_1.Helpers.format(this.options.translationFormatter, failure, ctx)));
    }
}
exports.KoaMiddleware = KoaMiddleware;
//# sourceMappingURL=KoaMiddleware.js.map