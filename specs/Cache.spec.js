var Factory = require('../lib/Factory');
var assert = require('assert');
var equal = assert.equal;
var deepEqual = assert.deepEqual;

describe('Cache', function () {
  var cache;

  beforeEach(function () {
    cache = Factory.create();
  });

  afterEach(function () {
    cache = null;
  });

  it('should support creating cache', function () {
    equal(typeof cache, 'object');
  });

  it('should support putting cache values', function () {
    cache.put('foo', 'bar');
    equal(cache.__cache['foo'], 'bar');
  });

  it('should support getting cache values', function () {
    cache.put('foo', 'bar');
    equal(cache.get('foo'), 'bar');
    equal(cache.get('bar'), null);
  });

  it('should support removing cache values', function () {
    cache.put('foo', 'bar');
    cache.remove('foo');
    equal(cache.get('foo'), null);
  });

  it('should support clearing cache', function () {
    cache.put('foo', 123);
    cache.put('bar', 456);
    cache.clear();
    deepEqual(cache.__cache, {});
  });

  it('should provide cache keys', function () {
    cache.put('foo', 123);
    cache.put('bar', 456);
    deepEqual(cache.keys(), ['foo', 'bar']);

    cache.remove('bar');
    deepEqual(cache.keys(), ['foo']);
  });

  it('should keep track of size', function () {
    equal(cache.size(), 0);

    cache.put('foo', 123);
    equal(cache.size(), 1);

    cache.put('bar', 456);
    equal(cache.size(), 2);

    cache.put('baz', 789);
    equal(cache.size(), 3);

    cache.remove('foo');
    equal(cache.size(), 2);

    cache.clear();
    equal(cache.size(), 0);
  });

  it('should only update size if needed', function () {
    cache.put('foo', 123);
    cache.put('foo', 456);
    equal(cache.size(), 1);

    cache.remove('foo');
    cache.remove('foo');
    equal(cache.size(), 0);

    cache.put('foo', 789);
    equal(cache.size(), 1);

    cache.clear();
    equal(cache.size(), 0);
  });
});
