var felix = require('../../index');
var cache = felix.create('example');

cache.put('foo', 'bar');

setTimeout(function () {
  console.log('foo', felix.get('example').get('foo'));
}, 500);
