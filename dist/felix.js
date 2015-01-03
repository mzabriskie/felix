!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.felix=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/Factory');

},{"./lib/Factory":3}],2:[function(require,module,exports){
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
  if (typeof this.__store[key] === 'undefined') {
    this.__size++;
  }
  this.__store[key] = val;
};

/**
 * Get a cached value for `key`
 *
 * @param {String} key The key that the value is expected to be cached with
 * @returns {Object} The value associated with `key`, otherwise undefined
 */
function get(key) {
  return this.__store[key];
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
  }
  delete this.__store[key];
};

/**
 * Clear all cached values
 */
function clear() {
  this.__size = 0;
  this.__store = {};
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

},{}],3:[function(require,module,exports){
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

},{"./Cache":2}]},{},[1])(1)
});