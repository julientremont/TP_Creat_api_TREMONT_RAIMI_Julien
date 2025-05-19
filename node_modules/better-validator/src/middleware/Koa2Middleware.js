"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("../Base");
const Helpers_1 = require("../Helpers");
const IsObject_1 = require("../IsObject");
const IsString_1 = require("../IsString");
const ValidatorFactory_1 = require("../ValidatorFactory");
class Koa2Middleware {
    constructor(options) {
        this.options = _.defaults({}, options);
    }
    query(rule) {
        const self = this;
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            const anythingValidator = validator.create(ctx.query).display('?');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            yield self.checkErrors(validator, ctx, next);
        });
    }
    body(rule) {
        const self = this;
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            validator.create(ctx.request.body).isObject(rule);
            yield self.checkErrors(validator, ctx, next);
        });
    }
    params(rule) {
        const self = this;
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const validator = new ValidatorFactory_1.ValidatorFactory(self.options);
            const anythingValidator = validator.create(ctx.params).display('@');
            const objectValidator = new IsObject_1.IsObject(anythingValidator.path, rule, IsString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', value => (!Base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            yield self.checkErrors(validator, ctx, next);
        });
    }
    checkErrors(validator, ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const failures = validator.run();
            if (!failures || !failures.length) {
                yield next();
                return;
            }
            ctx.status = 400;
            ctx.body = Helpers_1.Helpers.format(this.options.responseFormatter, _.map(failures, failure => Helpers_1.Helpers.format(this.options.translationFormatter, failure, ctx)));
        });
    }
}
exports.Koa2Middleware = Koa2Middleware;
//# sourceMappingURL=Koa2Middleware.js.map