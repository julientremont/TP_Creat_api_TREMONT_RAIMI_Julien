const Validator = require('../src');

const OPTIONS_RAW = {};

/**
 * Run validation rule tests and check results
 * @param {function} rule - validation rule function to test against
 * @param {object[]} tests - tests to run
 * @param {*} tests.value - value to check
 * @param {string} [tests.fail] - name of rule that should fail; or omit if test should pass
 * @return {void}
 */
 function runTests(rule, tests) {
  const validator = new Validator(OPTIONS_RAW);

  for (const test of tests) {
    const failures = validator(test.value, rule);
    if (test.fail) {
      expect(failures).toContain(jasmine.objectContaining({value: test.value, path: [], failed: test.fail}));
    } else {
      expect(failures).toEqual([]);
    }
  }
}

module.exports = runTests;
