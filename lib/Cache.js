/**
 * Construct a new Cache object
 */
var Cache = module.exports = function (options) {
  this.__options = options || {};
  this.clear();
};

var FOREVER = 0;

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
 * @param {Number} [ttl 30000] The ttl before this entry expires in milli-seconds
 */
function put(key, val, ttl) {
  // Don't increment size if key already exists
  if (typeof this.__store[key] === 'undefined') {
    this.__size++;
  }
  this.__ttl[key] = getExpiryDateFor(ttl || this.__options.maxAge);
  this.__store[key] = val;
};

/**
 * Get a cached value for `key`
 *
 * @param {String} key The key that the value is expected to be cached with
 * @returns {Object} The value associated with `key`, otherwise undefined
 */
function get(key) {
  var ttl = this.__ttl[key];

  if (!ttl || ttl === FOREVER || Date.now() < ttl) {
    return this.__store[key];
  }

  return this.remove(key);
};

/**
 * Remove the cached value for `key`
 *
 * @param {String} key The key that the value is cached with
 */
function remove(key) {
  // Don't decrement if key doesn't exist
  if (typeof this.__store[key] !== 'undefined') {
    this.__size--;
    delete this.__ttl[key];
  }
  delete this.__store[key];
};

/**
 * Clear all cached values
 */
function clear() {
  this.__size = 0;
  this.__store = {};
  this.__ttl = {};
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
  return oKeys(this.__store);
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

function getExpiryDateFor(ttl) {
  if (!ttl) {
    return FOREVER;
  }

  return Date.now() + ttl;
}
