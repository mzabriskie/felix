var Cache = require('./Cache');
var Factory = module.exports = {};
var __store = {};

/**
 * Construct a Cache object
 *
 * @param {String} id The id of the cache
 * @returns {Cache} The newly created cache
 */
Factory.create = function (id) {
  __store[id] = new Cache();
  return __store[id];
};

/**
 * Get a Cache object by ID
 *
 * @param {String} id The id of the cache
 * @returns {Cache} The cache if it exists, otherwise undefined
 */
Factory.get = function (id) {
  return __store[id];
};

/**
* Remove a cache
*
* @param {String} id The id of the cache to be removed
*/
Factory.remove = function (id) {
  delete __store[id];
};

/**
 * Clear all caches
 */
Factory.clear = function () {
  __store = {};
};
