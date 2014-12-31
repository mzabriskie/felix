var Cache = module.exports = function () {
  this.clear();
};

/**
 * Put a key-value pair into the cache
 *
 * @param {String} key The key that the value will be cached with
 * @param {Object} val The value of the cache entry
 */
Cache.prototype.put = function (key, val) {
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
Cache.prototype.get = function (key) {
  return this.__cache[key];
};

/**
 * Remove the cached value for `key`
 *
 * @param {String} key The key that the value is cached with
 */
Cache.prototype.remove = function (key) {
  // Don't decrement if key doesn't exist
  if (typeof this.__cache[key] !== 'undefined') {
    this.__size--;
  }
  delete this.__cache[key];
};

/**
 * Clear all cached values
 */
Cache.prototype.clear = function () {
  this.__size = 0;
  this.__cache = {};
};

/**
 * Get the size of the cache
 *
 * @returns {number} The number of cached items
 */
Cache.prototype.size = function () {
  return this.__size;
};
