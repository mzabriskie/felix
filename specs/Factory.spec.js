var Cache = require('../lib/Cache');
var Factory = require('../lib/Factory');
var assert = require('assert');
var equal = assert.equal;
var deepEqual = assert.deepEqual;

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

  it('should support removing a cache', function () {
    Factory.create('test');
    Factory.remove('test');
    equal(Factory.get('test'), null);
  });

  it('should clear caches', function () {
    Factory.create('test');
    Factory.clear();
    equal(Factory.get('test'), null);
  });

  it('should support multiple caches', function () {
    Factory.create('a').put('foo', 1);
    Factory.create('b').put('foo', 'test');
    Factory.create('c').put('foo', [true, false]);

    equal(Factory.get('a').get('foo'), 1);
    equal(Factory.get('b').get('foo'), 'test');
    deepEqual(Factory.get('c').get('foo'), [true, false]);
  });
});
