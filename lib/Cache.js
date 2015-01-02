/**
 * Construct a new Cache object
 */
var Cache = module.exports = function () {
  this.clear();
};

Cache.prototype = {
  put: put,
  get: get,
  remove: remove,
  clear: clear,
  size: size,
  keys: keys
};

/**
 * Put a key-value pair into the cache
 *
 * @param {String} key The key that the value will be cached with
 * @param {Object} val The value of the cache entry
 */
function put(key, val) {
  // Don't increment size if key already exists
  if (typeof this.__cache[key] === 'undefined') {
    this.__size++;
  }
  this.__cache[key] = val;
};

/**
 * Get a cached value for `key`
 *
 * @param {String} key The key that the value is expected to be cached with
 * @returns {Object} The value associated with `key`, otherwise undefined
 */
function get(key) {
  return this.__cache[key];
};

/**
 * Remove the cached value for `key`
 *
 * @param {String} key The key that the value is cached with
 */
function remove(key) {
  // Don't decrement if key doesn't exist
  if (typeof this.__cache[key] !== 'undefined') {
    this.__size--;
  }
  delete this.__cache[key];
};

/**
 * Clear all cached values
 */
function clear() {
  this.__size = 0;
  this.__cache = {};
};

/**
 * Get the size of the cache
 *
 * @returns {number} The number of cached items
 */
function size() {
  return this.__size;
};

/**
 * Get all the cache keys
 *
 * @returns {Array} The cache keys
 */
function keys() {
  return oKeys(this.__cache);
};

/**
* Polyfill for Object.keys
*/
var oKeys = Object.keys || function (obj) {
  if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
    throw new TypeError('Object.keys called on non-object');
  }

  var result = [];
  for (var key in obj) {
    result.hasOwnProperty.call(obj, key) && result.push(key);
  }
  return result;
};
