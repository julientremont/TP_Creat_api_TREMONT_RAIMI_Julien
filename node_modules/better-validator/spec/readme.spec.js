const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser')

const Validator = require('../src');
const runTests = require('./runTests');

describe('readme.md', () => {
  describe('Basic usage', () => {
    it('1', () => {
      const validator = new Validator();

      validator(123).isNumber();
      const errors = validator.run(); // => []
      expect(errors).toEqual([]);
    });

    it('2', () => {
      const validator = new Validator();

      validator('not number').isNumber();
      const errors = validator.run(); // => [{path: [], value: 'not number', test: 'isNumber'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: [], value: 'not number', failed: 'isNumber'}));
    });

    it('Validate multiple objects at once', () => {
      const validator = new Validator();

      const query = {};
      const body = null;

      validator(query).display('query').required();
      validator(body).display('body').required();
      const errors = validator.run(); // => [{path: ['body'], value: null, test: 'required'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: ['body'], value: null, failed: 'required'}));
    });

    it('Validate children of an object', () => {
      const validator = new Validator();

      const query = {count: 5, hint: 32};

      validator(query).required().isObject((obj) => {
        obj('count').required().isNumber().integer(); // pass
        obj('hint').isString(); // fail
      });
      const errors = validator.run(); // => [{path: ['hint'], value: 32, test: 'isString'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: ['hint'], value: 32, failed: 'isString'}));
    });

    it('Validate children of an object array', () => {
      const validator = new Validator();

      const array = [{count: 5, hint: 32}];

      validator(array).required().isObjectArray((child) => {
        child('count').required().isNumber().integer(); // pass
        child('hint').isString(); // fail
      });
      const errors = validator.run(); // => [{path: [0, 'hint'], value: 32, test: 'isString'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: [0, 'hint'], value: 32, failed: 'isString'}));
    });

    it('Validate children of an array', () => {
      const validator = new Validator();

      const array = [{count: 5, hint: 32}];

      validator(array).required().isArray((item) => {
        item.isObject((child) => {
          child('count').required().isNumber().integer(); // pass
          child('hint').isString(); // fail
        });
      });
      const errors = validator.run(); // => [{path: [0, 'hint'], value: 32, test: 'isString'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: [0, 'hint'], value: 32, failed: 'isString'}));
    });

    it('Validate number children of an array', () => {
      const validator = new Validator();

      const array = [1, 2, 3.2, 'test'];

      validator(array).required().isArray((item) => {
        item.isNumber().required().integer();
      });
      const errors = validator.run(); // => [{path: [2], value: 3.2, test: 'integer'}, {path: [3], value: 'test, test: 'isNumber'}]
      expect(errors.length).toBe(2);
      expect(errors).toContain(jasmine.objectContaining({path: [2], value: 3.2, failed: 'integer'}));
      expect(errors).toContain(jasmine.objectContaining({path: [3], value: 'test', failed: 'isNumber'}));
    });

    it('Re-usable validation parts 1', () => {
      const validator = new Validator();

      const rule = (item) => {
        item.isNumber().integer().isPositive();
      };

      const errors = validator(123, rule); // => []
      expect(errors).toEqual([]);
    });

    it('Re-usable validation parts 2', () => {
      const validator = new Validator();

      const query = {count: 5, hint: '32'};

      const rule = (item) => item.isNumber().integer().isPositive();

      validator(query).required().isObject((child) => {
        child('count').check(rule).lte(10); // pass
        child('hint').check(rule); // fail
      });
      const errors = validator.run(); // => [{path: ['hint'], value: '32', test: 'isNumber'}]
      expect(errors.length).toBe(1);
      expect(errors).toContain(jasmine.objectContaining({path: ['hint'], value: '32', failed: 'isNumber'}));
    });

  });

  describe('express.js', () => {
    describe('query check', () => {
      const queryRule = (query) => {
        query('email').required().isEmail();
        query('date').required().isISO8601();
      };
      const check = Validator.expressMiddleware();
      const app = express();
      app.get('/test', check.query(queryRule), (req, res) => {
        res.status(200).send();
      });

      it('will return 200 if valid', (done) => {
        request(app)
          .get('/test?email=me@home.com&date=2016-10-26T12:43:00Z')
          .expect(200)
          .end((err) => {
            if (err) fail(err);
            done();
          })
      });

      it('will return 400 if not valid 1', (done) => {
        request(app)
          .get('/test?date=2016-10-26T12:43:00Z')
          .expect(400, [{path: ['?', 'email'], failed: 'required'}])
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });

      it('will return 400 if not valid 2', (done) => {
        request(app)
          .get('/test?email=test&date=2016-10-26T12:43:00Z')
          .expect(400, [{path: ['?', 'email'], value: 'test', failed: 'isEmail'}])
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });
    });

    describe('body check', () => {
      const bodyRule = (body) => {
        body('count').required().isNumber().integer();
        body('hint').required().isString();
        body().strict();
      };
      const check = Validator.expressMiddleware();
      const app = express();
      app.use(bodyParser.json());
      app.post('/test', check.body(bodyRule), (req, res) => {
        res.status(200).send();
      });

      it('will return 200 if valid', (done) => {
        request(app)
          .post('/test')
          .send({count: 5, hint: 'test'})
          .expect(200)
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });

      it('will evaluate strict', (done) => {
        request(app)
          .post('/test')
          .send({count: 5, hint: 'test', foo: 'bar'})
          .expect(400, [{path: ['foo'], value: 'bar', failed: 'strict'}])
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });

      it('will return 400 if not valid 1', (done) => {
        request(app)
          .post('/test')
          .send({hint: 'test'})
          .expect(400, [{path: ['count'], failed: 'required'}])
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });

      it('will return 400 if not valid 2', (done) => {
        request(app)
          .post('/test')
          .send({count: 5, hint: 123})
          .expect(400, [{path: ['hint'], value: 123, failed: 'isString'}])
          .end((err) => {
            if (err) fail(err);
            done();
          });
      });

    });

  });

  // TODO koa

  describe('required()', () => {
    it('will allow require by itself', () => {
      const rule = (item) => {
        item.required();
      };

      runTests(rule, [
        {value: null, fail: 'required'},
        {value: undefined, fail: 'required'},
        {value: 0},
        {value: -1},
        {value: 1},
        {value: -1.32948},
        {value: 1.23488},
        {value: ''},
        {value: 'asdf'},
        {value: '1234'},
        {value: new Date()},
        {value: /./},
        {value: true},
        {value: false},
        {value: {}},
        {value: []},
        {value: NaN}
      ]);
    });

    it('will allow require before type constraint', () => {
      const rule = (item) => {
        item.required().isString();
      };

      runTests(rule, [
        {value: null, fail: 'required'},
        {value: undefined, fail: 'required'},
        {value: 0, fail: 'isString'},
        {value: -1, fail: 'isString'},
        {value: 1, fail: 'isString'},
        {value: -1.32948, fail: 'isString'},
        {value: 1.23488, fail: 'isString'},
        {value: ''},
        {value: 'asdf'},
        {value: '1234'},
        {value: new Date(), fail: 'isString'},
        {value: /./, fail: 'isString'},
        {value: true, fail: 'isString'},
        {value: false, fail: 'isString'},
        {value: {}, fail: 'isString'},
        {value: [], fail: 'isString'},
        {value: NaN, fail: 'isString'}
      ]);
    });

    it('will allow require after type constraint', () => {
      const rule = (item) => {
        item.isString().required();
      };

      runTests(rule, [
        {value: null, fail: 'required'},
        {value: undefined, fail: 'required'},
        {value: 0, fail: 'isString'},
        {value: -1, fail: 'isString'},
        {value: 1, fail: 'isString'},
        {value: -1.32948, fail: 'isString'},
        {value: 1.23488, fail: 'isString'},
        {value: ''},
        {value: 'asdf'},
        {value: '1234'},
        {value: new Date(), fail: 'isString'},
        {value: /./, fail: 'isString'},
        {value: true, fail: 'isString'},
        {value: false, fail: 'isString'},
        {value: {}, fail: 'isString'},
        {value: [], fail: 'isString'},
        {value: NaN, fail: 'isString'}
      ]);
    });

  });
});
