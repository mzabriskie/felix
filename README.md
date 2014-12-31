# felix

Isomorphic caching module for JavaScript

# Installing

```bash
$ npm install felix
# or
$ bower install felix
```

# Example

```js
var factory = require('felix').Factory;
var exampleCache = factory.create('example');

exampleCache.put('foo', 123);
exampleCache.put('bar', 456);
console.log(exampleCache.get('foo')); // 123
console.log(exampleCache.get('bar')); // 456
console.log(exampleCache.size()); // 2

exampleCache.remove('foo');
console.log(exampleCache.size()); // 1

exampleCache.clear();
console.log(exampleCache.size()); // 0
```

If you want to reference a cache that's already been created:

```js
var factory = require('felix').Factory;
factory.create('example');

// Elsewhere in your code...
var exampleCache = factory.get('example');
```

You may also forgo the factory all together:

```js
var Cache = require('felix').Cache;
var exampleCache = new Cache();
```
