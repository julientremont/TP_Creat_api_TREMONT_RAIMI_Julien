const Validator = require('../src');

const OPTIONS_RAW = {};

describe('isObject', () => {
  it('basics', () => {
    const validator = new Validator(OPTIONS_RAW);
    validator(null).display('test1').required().isObject();
    validator('test').display('test2').required().isObject();
    validator({}).display('test3').required().isObject();

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(2);
    expect(errors).toContain(jasmine.objectContaining({path: ['test1'], failed: 'required'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test2'], failed: 'isObject'}));
  });

  it('child validator', () => {
    const validator = new Validator(OPTIONS_RAW);
    const childValidator = (child) => {
      child('foo').isString();
      child('bar').required().isString();
      child('test').required().isString();
    };

    validator(null).display('test1').isObject(childValidator);
    validator({foo: 123}).display('test2').isObject(childValidator);
    validator({bar: 'asd'}).display('test3').isObject(childValidator);
    validator({foo: null}).display('test4').isObject(childValidator);
    validator({}).display('test5').isObject(childValidator);

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(8);

    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'foo'], failed: 'isString'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'bar'], failed: 'required'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'test'], failed: 'required'}));

    expect(errors).toContain(jasmine.objectContaining({path: ['test3', 'test'], failed: 'required'}));

    expect(errors).toContain(jasmine.objectContaining({path: ['test4', 'bar'], failed: 'required'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test4', 'test'], failed: 'required'}));

    expect(errors).toContain(jasmine.objectContaining({path: ['test5', 'bar'], failed: 'required'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test5', 'test'], failed: 'required'}));

  });

  it('child validator - more', () => {
    const validator = new Validator(OPTIONS_RAW);
    const childValidator = (child) => {
      child('foo').isString().notEmail();
      child('bar').required().isString().isEmail();
    };

    validator(null).display('test1').isObject(childValidator);
    validator({foo: 'test@home.com'}).display('test2').isObject(childValidator);
    validator({bar: 'test@home.com'}).display('test3').isObject(childValidator);
    validator({foo: null}).display('test4').isObject(childValidator);
    validator({}).display('test5').isObject(childValidator);

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(4);

    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'foo'], failed: 'notEmail'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'bar'], failed: 'required'}));

    expect(errors).toContain(jasmine.objectContaining({path: ['test4', 'bar'], failed: 'required'}));

    expect(errors).toContain(jasmine.objectContaining({path: ['test5', 'bar'], failed: 'required'}));

  });

  it('must fail strict() when extra properties are present', () => {
    const validator = new Validator(OPTIONS_RAW);
    const childValidator = (child) => {
      child('foo').isString().notEmail();
      child('bar').required().isString().isEmail();
    };

    validator({bar: 'test@home.com'}).display('test1').isObject(childValidator).strict();
    validator({bar: 'test@home.com', test: 123}).display('test2').isObject(childValidator).strict();
    validator({bar: 'test@home.com', test: 123}).display('test3').isObject(childValidator);

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);

    expect(errors).toContain(jasmine.objectContaining({path: ['test2', 'test'], failed: 'strict'}));

  });

});
