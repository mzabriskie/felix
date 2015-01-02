var felix = require('../index');
var assert = require('assert');
var equal = assert.equal;

describe('felix', function () {
  it('should have expected API methods', function () {
    equal(typeof felix.create, 'function');
    equal(typeof felix.get, 'function');
    equal(typeof felix.remove, 'function');
    equal(typeof felix.clear, 'function');
  });
});
