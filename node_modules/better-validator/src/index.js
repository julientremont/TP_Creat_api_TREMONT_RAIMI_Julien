"use strict";
const format = require("./format");
const ExpressMiddleware_1 = require("./middleware/ExpressMiddleware");
const Koa2Middleware_1 = require("./middleware/Koa2Middleware");
const KoaMiddleware_1 = require("./middleware/KoaMiddleware");
const ValidatorFactory_1 = require("./ValidatorFactory");
class Validator {
    constructor(options) {
        const factory = new ValidatorFactory_1.ValidatorFactory(options);
        const fn = (value, rules) => {
            if (rules) {
                return factory.createAndRun(value, rules);
            }
            return factory.create(value);
        };
        fn.run = factory.run.bind(factory);
        return fn;
    }
    static expressMiddleware(options) {
        return new ExpressMiddleware_1.ExpressMiddleware(options);
    }
    static koaMiddleware(options) {
        return new KoaMiddleware_1.KoaMiddleware(options);
    }
    static koa2Middleware(options) {
        return new Koa2Middleware_1.Koa2Middleware(options);
    }
    static create(options) {
        const factory = new ValidatorFactory_1.ValidatorFactory(options);
        const fn = value => {
            return factory.create(value);
        };
        fn.run = factory.run.bind(factory);
        return fn;
    }
    static get format() {
        return format;
    }
}
Validator.default = Validator;
module.exports = Validator;
//# sourceMappingURL=index.js.map