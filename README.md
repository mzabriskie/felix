# felix [![Build Status](https://travis-ci.org/mzabriskie/felix.svg?branch=master)](https://travis-ci.org/mzabriskie/felix)

In-memory caching module for JavaScript

## Installing

```bash
$ npm install felix
# or
$ bower install felix
```

## Example

```js
var felix = require('felix');
var cache = felix.create('example');

cache.put('foo', 123);
cache.put('bar', 456);
console.log(cache.get('foo')); // 123
console.log(cache.get('bar')); // 456
console.log(cache.size()); // 2

cache.remove('foo');
console.log(cache.size()); // 1

cache.clear();
console.log(cache.size()); // 0
```

## API

### felix

The top level API for `felix` is used to manage stored `Cache` objects.

##### felix.create(id)
Construct a cache object identified by `id`

##### felix.get(id)
Get a cache object by it's identifier

##### felix.remove(id)
Remove a cache by it's identifier

##### felix.clear()
Clear all caches

### Cache

The `Cache` object is what is returned by `felix.create` and `felix.get`.

##### put(key, val)
Put a key-value pair into the cache

##### get(key)
Get the cached value for `key`

##### remove(key)
Remove the cached value for `key`

##### clear()
Clear all cached values

##### size()
Get the size of the cache

##### keys()
Get all the cache keys

## License

MIT
