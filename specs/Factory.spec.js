var Cache = require('../lib/Cache');
var Factory = require('../lib/Factory');
var assert = require('assert');
var equal = assert.equal;

describe('Factory', function () {
  afterEach(function () {
    Factory.clear();
  });

  it('should create new cache', function () {
    equal(Factory.create('test') instanceof Cache, true);
  });

  it('should return existing cache', function () {
    var cache = Factory.create('test');
    equal(Factory.get('test'), cache);
  });

  it('should clear caches', function () {
    Factory.create('test');
    Factory.clear();
    equal(Factory.get('test'), null);
  });
});
