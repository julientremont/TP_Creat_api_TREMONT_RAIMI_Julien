"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = require("validator");
const Base_1 = require("./Base");
class IsString extends Base_1.Base {
    constructor(path) {
        super(path);
        for (const key of Object.keys(validator)) {
            if (!/^is/.test(key))
                continue;
            const fn = validator[key];
            if (typeof fn !== 'function')
                continue;
            this[key] = (...args) => {
                this.satisfies(key, value => !Base_1.Base.hasValue(value) || fn.call(validator, value, ...args));
                return this;
            };
            const notKey = `not${key.slice(2)}`;
            this[notKey] = (...args) => {
                this.satisfies(notKey, value => !Base_1.Base.hasValue(value) || !fn.call(validator, value, ...args));
                return this;
            };
        }
    }
    // isAfter(date?)
    isAfter(date) {
        this.satisfies('isAfter', value => !Base_1.Base.hasValue(value) || validator.isAfter(value, date));
        return this;
    }
    notAfter(date) {
        this.satisfies('notAfter', value => !Base_1.Base.hasValue(value) || !validator.isAfter(value, date));
        return this;
    }
    // isAlpha(locale?)
    isAlpha(locale) {
        this.satisfies('isAlpha', value => !Base_1.Base.hasValue(value) || validator.isAlpha(value, locale));
        return this;
    }
    notAlpha(locale) {
        this.satisfies('notAlpha', value => !Base_1.Base.hasValue(value) || !validator.isAlpha(value, locale));
        return this;
    }
    // isAlphanumeric(locale?)
    isAlphanumeric(locale) {
        this.satisfies('isAlphanumeric', value => !Base_1.Base.hasValue(value) || validator.isAlphanumeric(value, locale));
        return this;
    }
    notAlphanumeric(locale) {
        this.satisfies('notAlphanumeric', value => !Base_1.Base.hasValue(value) || !validator.isAlphanumeric(value, locale));
        return this;
    }
    // isAscii
    isAscii() {
        this.satisfies('isAscii', value => !Base_1.Base.hasValue(value) || validator.isAscii(value));
        return this;
    }
    notAscii() {
        this.satisfies('notAscii', value => !Base_1.Base.hasValue(value) || !validator.isAscii(value));
        return this;
    }
    // isBefore(date?)
    isBefore(date) {
        this.satisfies('isBefore', value => !Base_1.Base.hasValue(value) || validator.isBefore(value, date));
        return this;
    }
    notBefore(date) {
        this.satisfies('notBefore', value => !Base_1.Base.hasValue(value) || !validator.isBefore(value, date));
        return this;
    }
    // isBoolean
    isBoolean() {
        this.satisfies('isBoolean', value => !Base_1.Base.hasValue(value) || validator.isBoolean(value));
        return this;
    }
    notBoolean() {
        this.satisfies('notBoolean', value => !Base_1.Base.hasValue(value) || !validator.isBoolean(value));
        return this;
    }
    // isByteLength(options)
    isByteLength(options) {
        this.satisfies('isByteLength', value => !Base_1.Base.hasValue(value) || validator.isByteLength(value, options));
        return this;
    }
    notByteLength(options) {
        this.satisfies('notByteLength', value => !Base_1.Base.hasValue(value) || !validator.isByteLength(value, options));
        return this;
    }
    // isCreditCard
    isCreditCard() {
        this.satisfies('isCreditCard', value => !Base_1.Base.hasValue(value) || validator.isCreditCard(value));
        return this;
    }
    notCreditCard() {
        this.satisfies('notCreditCard', value => !Base_1.Base.hasValue(value) || !validator.isCreditCard(value));
        return this;
    }
    // isCurrency(options)
    isCurrency(options) {
        this.satisfies('isCurrency', value => !Base_1.Base.hasValue(value) || validator.isCurrency(value, options));
        return this;
    }
    notCurrency(options) {
        this.satisfies('notCurrency', value => !Base_1.Base.hasValue(value) || !validator.isCurrency(value, options));
        return this;
    }
    // isDataURI
    isDataURI() {
        this.satisfies('isDataURI', value => !Base_1.Base.hasValue(value) || validator.isDataURI(value));
        return this;
    }
    notDataURI() {
        this.satisfies('notDataURI', value => !Base_1.Base.hasValue(value) || !validator.isDataURI(value));
        return this;
    }
    // isDate
    isDate() {
        this.satisfies('isDate', value => !Base_1.Base.hasValue(value) || validator.isDate(value));
        return this;
    }
    notDate() {
        this.satisfies('notDate', value => !Base_1.Base.hasValue(value) || !validator.isDate(value));
        return this;
    }
    // isDecimal
    isDecimal() {
        this.satisfies('isDecimal', value => !Base_1.Base.hasValue(value) || validator.isDecimal(value));
        return this;
    }
    notDecimal() {
        this.satisfies('notDecimal', value => !Base_1.Base.hasValue(value) || !validator.isDecimal(value));
        return this;
    }
    // isDivisibleBy(number)
    isDivisibleBy(num) {
        this.satisfies('isDivisibleBy', value => !Base_1.Base.hasValue(value) || validator.isDivisibleBy(value, num));
        return this;
    }
    notDivisibleBy(num) {
        this.satisfies('notDivisibleBy', value => !Base_1.Base.hasValue(value) || !validator.isDivisibleBy(value, num));
        return this;
    }
    // isEmail(options?)
    isEmail(options) {
        this.satisfies('isEmail', value => !Base_1.Base.hasValue(value) || validator.isEmail(value, options));
        return this;
    }
    notEmail(options) {
        this.satisfies('notEmail', value => !Base_1.Base.hasValue(value) || !validator.isEmail(value, options));
        return this;
    }
    // isEmpty
    isEmpty() {
        this.satisfies('isEmpty', value => !Base_1.Base.hasValue(value) || validator.isEmpty(value));
        return this;
    }
    notEmpty() {
        this.satisfies('notEmpty', value => !Base_1.Base.hasValue(value) || !validator.isEmpty(value));
        return this;
    }
    // isFQDN(options?)
    isFQDN(options) {
        this.satisfies('isFQDN', value => !Base_1.Base.hasValue(value) || validator.isFQDN(value, options));
        return this;
    }
    notFQDN(options) {
        this.satisfies('notFQDN', value => !Base_1.Base.hasValue(value) || !validator.isFQDN(value, options));
        return this;
    }
    // isFloat(options?)
    isFloat(options) {
        this.satisfies('isFloat', value => !Base_1.Base.hasValue(value) || validator.isFloat(value, options));
        return this;
    }
    notFloat(options) {
        this.satisfies('notFloat', value => !Base_1.Base.hasValue(value) || !validator.isFloat(value, options));
        return this;
    }
    // isFullWidth
    isFullWidth() {
        this.satisfies('isFullWidth', value => !Base_1.Base.hasValue(value) || validator.isFullWidth(value));
        return this;
    }
    notFullWidth() {
        this.satisfies('notFullWidth', value => !Base_1.Base.hasValue(value) || !validator.isFullWidth(value));
        return this;
    }
    // isHalfWidth
    isHalfWidth() {
        this.satisfies('isHalfWidth', value => !Base_1.Base.hasValue(value) || validator.isHalfWidth(value));
        return this;
    }
    notHalfWidth() {
        this.satisfies('notHalfWidth', value => !Base_1.Base.hasValue(value) || !validator.isHalfWidth(value));
        return this;
    }
    // isHexColor
    isHexColor() {
        this.satisfies('isHexColor', value => !Base_1.Base.hasValue(value) || validator.isHexColor(value));
        return this;
    }
    notHexColor() {
        this.satisfies('notHexColor', value => !Base_1.Base.hasValue(value) || !validator.isHexColor(value));
        return this;
    }
    // isHexadecimal
    isHexadecimal() {
        this.satisfies('isHexadecimal', value => !Base_1.Base.hasValue(value) || validator.isHexadecimal(value));
        return this;
    }
    notHexadecimal() {
        this.satisfies('notHexadecimal', value => !Base_1.Base.hasValue(value) || !validator.isHexadecimal(value));
        return this;
    }
    // isIP(version?)
    isIP(version) {
        this.satisfies('isIP', value => !Base_1.Base.hasValue(value) || validator.isIP(value, version));
        return this;
    }
    notIP(version) {
        this.satisfies('notIP', value => !Base_1.Base.hasValue(value) || !validator.isIP(value, version));
        return this;
    }
    // isISBN(version?)
    isISBN(version) {
        this.satisfies('isISBN', value => !Base_1.Base.hasValue(value) || validator.isISBN(value, version));
        return this;
    }
    notISBN(version) {
        this.satisfies('notISBN', value => !Base_1.Base.hasValue(value) || !validator.isISBN(value, version));
        return this;
    }
    // isISIN
    isISIN() {
        this.satisfies('isISIN', value => !Base_1.Base.hasValue(value) || validator.isISIN(value));
        return this;
    }
    notISIN() {
        this.satisfies('notISIN', value => !Base_1.Base.hasValue(value) || !validator.isISIN(value));
        return this;
    }
    // isISO8601
    isISO8601() {
        this.satisfies('isISO8601', value => !Base_1.Base.hasValue(value) || validator.isISO8601(value));
        return this;
    }
    notISO8601() {
        this.satisfies('notISO8601', value => !Base_1.Base.hasValue(value) || !validator.isISO8601(value));
        return this;
    }
    // isIn(values)
    isIn(values) {
        this.satisfies('isIn', value => !Base_1.Base.hasValue(value) || validator.isIn(value, values));
        return this;
    }
    notIn(values) {
        this.satisfies('notIn', value => !Base_1.Base.hasValue(value) || !validator.isIn(value, values));
        return this;
    }
    // isInt(options?)
    isInt(options) {
        this.satisfies('isInt', value => !Base_1.Base.hasValue(value) || validator.isInt(value, options));
        return this;
    }
    notInt(options) {
        this.satisfies('notInt', value => !Base_1.Base.hasValue(value) || !validator.isInt(value, options));
        return this;
    }
    // isJSON
    isJSON() {
        this.satisfies('isJSON', value => !Base_1.Base.hasValue(value) || validator.isJSON(value));
        return this;
    }
    notJSON() {
        this.satisfies('notJSON', value => !Base_1.Base.hasValue(value) || !validator.isJSON(value));
        return this;
    }
    // isLength(options)
    isLength(options) {
        this.satisfies('isLength', value => !Base_1.Base.hasValue(value) || validator.isLength(value, options));
        return this;
    }
    notLength(options) {
        this.satisfies('notLength', value => !Base_1.Base.hasValue(value) || !validator.isLength(value, options));
        return this;
    }
    // isLowercase
    isLowercase() {
        this.satisfies('isLowercase', value => !Base_1.Base.hasValue(value) || validator.isLowercase(value));
        return this;
    }
    notLowercase() {
        this.satisfies('notLowercase', value => !Base_1.Base.hasValue(value) || !validator.isLowercase(value));
        return this;
    }
    // isMACAddress
    isMACAddress() {
        this.satisfies('isMACAddress', value => !Base_1.Base.hasValue(value) || validator.isMACAddress(value));
        return this;
    }
    notMACAddress() {
        this.satisfies('notMACAddress', value => !Base_1.Base.hasValue(value) || !validator.isMACAddress(value));
        return this;
    }
    // isMD5
    isMD5() {
        this.satisfies('isMD5', value => !Base_1.Base.hasValue(value) || validator.isMD5(value));
        return this;
    }
    notMD5() {
        this.satisfies('notMD5', value => !Base_1.Base.hasValue(value) || !validator.isMD5(value));
        return this;
    }
    // isMobilePhone(locale)
    isMobilePhone(locale) {
        this.satisfies('isMobilePhone', value => !Base_1.Base.hasValue(value) || validator.isMobilePhone(value, locale));
        return this;
    }
    notMobilePhone(locale) {
        this.satisfies('notMobilePhone', value => !Base_1.Base.hasValue(value) || !validator.isMobilePhone(value, locale));
        return this;
    }
    // isMongoId
    isMongoId() {
        this.satisfies('isMongoId', value => !Base_1.Base.hasValue(value) || validator.isMongoId(value));
        return this;
    }
    notMongoId() {
        this.satisfies('notMongoId', value => !Base_1.Base.hasValue(value) || !validator.isMongoId(value));
        return this;
    }
    // isMultibyte
    isMultibyte() {
        this.satisfies('isMultibyte', value => !Base_1.Base.hasValue(value) || validator.isMultibyte(value));
        return this;
    }
    notMultibyte() {
        this.satisfies('notMultibyte', value => !Base_1.Base.hasValue(value) || !validator.isMultibyte(value));
        return this;
    }
    // isNumeric
    isNumeric() {
        this.satisfies('isNumeric', value => !Base_1.Base.hasValue(value) || validator.isNumeric(value));
        return this;
    }
    notNumeric() {
        this.satisfies('notNumeric', value => !Base_1.Base.hasValue(value) || !validator.isNumeric(value));
        return this;
    }
    // isSurrogatePair
    isSurrogatePair() {
        this.satisfies('isSurrogatePair', value => !Base_1.Base.hasValue(value) || validator.isSurrogatePair(value));
        return this;
    }
    notSurrogatePair() {
        this.satisfies('notSurrogatePair', value => !Base_1.Base.hasValue(value) || !validator.isSurrogatePair(value));
        return this;
    }
    // isURL(options?)
    isURL(options) {
        this.satisfies('isURL', value => !Base_1.Base.hasValue(value) || validator.isURL(value, options));
        return this;
    }
    notURL(options) {
        this.satisfies('notURL', value => !Base_1.Base.hasValue(value) || !validator.isURL(value, options));
        return this;
    }
    // isUUID(version?)
    isUUID(version) {
        this.satisfies('isUUID', value => !Base_1.Base.hasValue(value) || validator.isUUID(value, version));
        return this;
    }
    notUUID(version) {
        this.satisfies('notUUID', value => !Base_1.Base.hasValue(value) || !validator.isUUID(value, version));
        return this;
    }
    // isUppercase
    isUppercase() {
        this.satisfies('isUppercase', value => !Base_1.Base.hasValue(value) || validator.isUppercase(value));
        return this;
    }
    notUppercase() {
        this.satisfies('notUppercase', value => !Base_1.Base.hasValue(value) || !validator.isUppercase(value));
        return this;
    }
    // isVariableWidth
    isVariableWidth() {
        this.satisfies('isVariableWidth', value => !Base_1.Base.hasValue(value) || validator.isVariableWidth(value));
        return this;
    }
    notVariableWidth() {
        this.satisfies('notVariableWidth', value => !Base_1.Base.hasValue(value) || !validator.isVariableWidth(value));
        return this;
    }
    // isWhitelisted(chars)
    isWhitelisted(chars) {
        this.satisfies('isWhitelisted', value => !Base_1.Base.hasValue(value) || validator.isWhitelisted(value, chars));
        return this;
    }
    notWhitelisted(chars) {
        this.satisfies('notWhitelisted', value => !Base_1.Base.hasValue(value) || !validator.isWhitelisted(value, chars));
        return this;
    }
    // other
    isMatch(regex) {
        this.satisfies('isMatch', value => !Base_1.Base.hasValue(value) || regex.test(value));
        return this;
    }
    notMatch(regex) {
        this.satisfies('notMatch', value => !Base_1.Base.hasValue(value) || !regex.test(value));
        return this;
    }
    length(expected) {
        this.satisfies('length', value => !Base_1.Base.hasValue(value) || value.length === expected);
        return this;
    }
    lengthInRange(lower, upper) {
        this.satisfies('lengthInRange', value => !Base_1.Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
        return this;
    }
}
exports.IsString = IsString;
//# sourceMappingURL=IsString.js.map