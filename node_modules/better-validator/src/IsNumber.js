"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class IsNumber extends Base_1.Base {
    constructor(path) {
        super(path);
    }
    integer() {
        this.satisfies('integer', value => !Base_1.Base.hasValue(value) || /^-?\d+$/.test(String(value)));
        return this;
    }
    isInRange(lower, upper) {
        this.satisfies('isInRange', value => !Base_1.Base.hasValue(value) || (lower === undefined || value >= lower) && (upper === undefined || value <= upper));
        return this;
    }
    notInRange(lower, upper) {
        this.satisfies('notInRange', value => !Base_1.Base.hasValue(value) || (lower === undefined || value <= lower) && (upper === undefined || value >= upper));
        return this;
    }
    gt(threshold) {
        this.satisfies('gt', value => !Base_1.Base.hasValue(value) || value > threshold);
        return this;
    }
    gte(threshold) {
        this.satisfies('gte', value => !Base_1.Base.hasValue(value) || value >= threshold);
        return this;
    }
    lt(threshold) {
        this.satisfies('lt', value => !Base_1.Base.hasValue(value) || value < threshold);
        return this;
    }
    lte(threshold) {
        this.satisfies('lte', value => !Base_1.Base.hasValue(value) || value <= threshold);
        return this;
    }
    isPositive() {
        this.satisfies('isPositive', value => !Base_1.Base.hasValue(value) || value > 0);
        return this;
    }
    notPositive() {
        this.satisfies('notPositive', value => !Base_1.Base.hasValue(value) || value <= 0);
        return this;
    }
    isNegative() {
        this.satisfies('isNegative', value => !Base_1.Base.hasValue(value) || value < 0);
        return this;
    }
    notNegative() {
        this.satisfies('notNegative', value => !Base_1.Base.hasValue(value) || value >= 0);
        return this;
    }
    isZero() {
        this.satisfies('isZero', value => !Base_1.Base.hasValue(value) || value === 0);
        return this;
    }
    notZero() {
        this.satisfies('notZero', value => !Base_1.Base.hasValue(value) || value !== 0);
        return this;
    }
}
exports.IsNumber = IsNumber;
//# sourceMappingURL=IsNumber.js.map