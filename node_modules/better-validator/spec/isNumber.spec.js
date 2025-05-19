const runTests = require('./runTests');

describe('isNumber', () => {
  it('default', () => {
    const rule = (item) => {
      item.isNumber();
    };

    runTests(rule, [
      {value: null},
      {value: undefined}, // TODO: ?
      {value: 0},
      {value: -1},
      {value: 1},
      {value: -1.32948},
      {value: 1.23488},
      {value: '', fail: 'isNumber'},
      {value: 'asdf', fail: 'isNumber'},
      {value: '1234', fail: 'isNumber'},
      {value: new Date(), fail: 'isNumber'},
      {value: /./, fail: 'isNumber'},
      {value: true, fail: 'isNumber'},
      {value: false, fail: 'isNumber'},
      {value: {}, fail: 'isNumber'},
      {value: [], fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('required', () => {
    const rule = (item) => {
      item.isNumber().required();
    };

    runTests(rule, [
      {value: null, fail: 'required'},
      {value: undefined, fail: 'required'},
      {value: 0},
      {value: -1},
      {value: 1},
      {value: -1.32948},
      {value: 1.23488},
      {value: '', fail: 'isNumber'},
      {value: 'asdf', fail: 'isNumber'},
      {value: '1234', fail: 'isNumber'},
      {value: new Date(), fail: 'isNumber'},
      {value: /./, fail: 'isNumber'},
      {value: true, fail: 'isNumber'},
      {value: false, fail: 'isNumber'},
      {value: {}, fail: 'isNumber'},
      {value: [], fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('integer', () => {
    const rule = (item) => {
      item.isNumber().integer();
    };

    runTests(rule, [
      {value: null},
      {value: undefined},
      {value: 0},
      {value: -1},
      {value: 1},
      {value: -1.32948, fail: 'integer'},
      {value: 1.23488, fail: 'integer'},
      {value: 1e-17, fail: 'integer'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('isNegative', () => {
    const rule = (item) => {
      item.isNumber().isNegative();
    };

    runTests(rule, [
      {value: null},
      {value: undefined},
      {value: 0, fail: 'isNegative'},
      {value: -1},
      {value: 1, fail: 'isNegative'},
      {value: -1.32948},
      {value: 1.23488, fail: 'isNegative'},
      {value: 1e-17, fail: 'isNegative'},
      {value: '0', fail: 'isNumber'},
      {value: 'test', fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('notNegative', () => {
    const rule = (item) => {
      item.isNumber().notNegative();
    };

    runTests(rule, [
      {value: null},
      {value: undefined},
      {value: 0},
      {value: -1, fail: 'notNegative'},
      {value: 1},
      {value: -1.32948, fail: 'notNegative'},
      {value: 1.23488},
      {value: 1e-17},
      {value: '0', fail: 'isNumber'},
      {value: 'test', fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('isZero', () => {
    const rule = (item) => {
      item.isNumber().isZero();
    };

    runTests(rule, [
      {value: null},
      {value: undefined},
      {value: 0},
      {value: -1, fail: 'isZero'},
      {value: 1, fail: 'isZero'},
      {value: -1.32948, fail: 'isZero'},
      {value: 1.23488, fail: 'isZero'},
      {value: 1e-17, fail: 'isZero'},
      {value: '0', fail: 'isNumber'},
      {value: 'test', fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

  it('notZero', () => {
    const rule = (item) => {
      item.isNumber().notZero();
    };

    runTests(rule, [
      {value: null},
      {value: undefined},
      {value: 0, fail: 'notZero'},
      {value: -1},
      {value: 1},
      {value: -1.32948},
      {value: 1.23488},
      {value: 1e-17},
      {value: '0', fail: 'isNumber'},
      {value: 'test', fail: 'isNumber'},
      {value: NaN, fail: 'isNumber'}
    ]);
  });

});
