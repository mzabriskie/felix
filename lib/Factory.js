var Cache = require('./Cache');
var Factory = module.exports = {};
var __caches = {};

/**
 * Construct a Cache object
 *
 * @param {String} id The id of the cache
 * @returns {Cache} The newly created cache
 */
Factory.create = function (id) {
  __caches[id] = new Cache();
  return __caches[id];
};

/**
 * Get a Cache object by ID
 *
 * @param {String} id The id of the cache
 * @returns {Cache} The cache if it exists, otherwise undefined
 */
Factory.get = function (id) {
  return __caches[id];
};

/**
 * Clear all caches
 */
Factory.clear = function () {
  __caches = {};
};
