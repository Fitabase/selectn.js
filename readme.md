# selectn
[![Sauce Test Status](https://saucelabs.com/browser-matrix/selectn.svg)](https://saucelabs.com/u/selectn)
> Curried [property accessor][Property accessors] function that resolves deeply-nested object properties via dot/bracket-notation string path while mitigating `TypeErrors` via friendly and composable API.

[![Build Status](http://img.shields.io/travis/wilmoore/selectn.js.svg)](https://travis-ci.org/wilmoore/selectn.js) [![Code Climate](https://codeclimate.com/github/wilmoore/selectn.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/selectn.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install selectn --save
```

or

```html
<script src="https://npmcdn.com/selectn/selectn.min.js"></script>
```

> You may also install `selectn` via [Bower], [Duo], or [jspm].

###### npm stats

[![npm](https://img.shields.io/npm/v/selectn.svg)](https://www.npmjs.org/package/selectn) [![NPM downloads](http://img.shields.io/npm/dm/selectn.svg)](https://www.npmjs.org/package/selectn) [![David](https://img.shields.io/david/wilmoore/selectn.js.svg)](https://david-dm.org/wilmoore/selectn.js)

## Overview

###### allows you to refactor this:

    person && person.info && person.info.name && person.info.name.full

###### into:

    selectn('info.name.full', person)

###### or refactor this:

    contacts.map(function (contact) {
      return contact && contact.addresses && contact.addresses[0]
    })

###### into:

    contacts.map(selectn('addresses[0]')))

## Features

  - Mitigates boilerplate guards like `if (obj && obj.a && obj.a.b && obj.a.b.c) { return obj.a.b.c; }`.
  - Mitigates **TypeError** `Cannot read property '...' of undefined`.
  - Supports multiple levels of array nesting (i.e. `group[0].section.a.seat[3]`).
  - Supports dashed key access (i.e. `stats.temperature-today`).
  - If value at path is a function, the value returned is the return value of invoking the function.
  - [Partial application is automatic][Un-bind your JS with curry] when you omit the second argument (i.e. `selectn` is curried).
  - Property accessor generated by `selectn` can be passed to higher-order functions like [map] or [filter].
  - Compatible with [modern and legacy browsers][browsers], Node/CommonJS, and AMD.
  - Haskell style [parameter order] allows for [pointfree style programming][Un-bind your JS with curry].

## Non-Features

  - No [eval][] or [Function][] (see: [`eval`][note] in disguise).
  - No [typeof][] since, [typeof][] is not a real solution to this problem but can _appear_ to be due to the way the global scope is _implied_.

## Usage example(s)

#### property accessor as predicate
> Avoid annoying __Cannot read property '...' of undefined__ `TypeError` without writing boilerplate anonymous functions or guards.

```js
var selectn = require('selectn')
var language = [
  { strings: { en: { name: 'english' } }},
  { strings: { es: { name: 'spanish' } }},
  { strings: { km: { name: 'khmer'   } }},
  { strings: { es: { name: 'spanish' } }},
  { nodatas: {}}
]

var spanish = selectn('strings.es')
//=> [Function]

language.filter(spanish).length
//=> 2
```

#### point-free property accessor
> Access deeply nested properties (including dashed properties) using point-free style.

```js
var selectn = require('selectn')
var data = {
  client: {
    message: { 'message-id': 'd50afb80-a6be-11e2-9e96-0800200c9a66' }
  }
}

var getId = selectn('client.message.message-id')
//=> [Function]

Promise.resolve(data).then(getId)
//=> 'd50afb80-a6be-11e2-9e96-0800200c9a66'
```

#### property accessor for functor
> Avoid wrapping property accessors in anonymous functions.

```js
var selectn = require('selectn')
var contacts = [
  { addresses: [ '123 Main St, Broomfield, CO 80020', '123 Main St, Denver, CO 80202' ] },
  { addresses: [ '123 Main St, Kirkland, IL 60146' ] },
  { phones: [] },
]

var primaryAddress = selectn('addresses[0]')
//=> [Function]

contacts.map(primaryAddress)
//=> [ '123 Main St, Broomfield, CO 80020', '123 Main St, Kirkland, IL 60146', undefined ]
```

#### support for keys containing `.`
> Pass an array as path instead of a string.

```js
var selectn = require('selectn')
var data = {
  client: {
    'message.id': 'd50afb80-a6be-11e2-9e96-0800200c9a66'
  }
}

selectn(['client', 'message.id'], data)
//=> 'd50afb80-a6be-11e2-9e96-0800200c9a66'
```

## API (partial application)

### `selectn(String|Array)`

###### arguments

 * `path (String|Array)` Dot/bracket-notation string path or array.

###### returns

 - `(Function)` Unary function accepting the object to access.

## API (full application)

### `selectn(String|Array, Object)`

###### arguments

 * `path (String|Array)` Dot/bracket-notation string path or array.
 * `object (String|Array)` Object to access.

###### returns

 - `(*|undefined)` Value at path if path exists or `undefined` if path does not exist.

## Tested/Supported browsers

> The following browsers are continuously tested; however, `selectn` is also supported and known to work on even older browsers not listed below:

|Browser|Version|
|---|---|
|Android|Latest|
|Chrome|Latest|
|Firefox|Latest|
|Internet Explorer|9 - Latest|
|Iphone|Latest|
|Safari|Latest|

## Other Languages

`selectn` has inspired ports to other languages:

|Language|Project|
|---|---|
|Python|[selectn](https://pypi.python.org/pypi/selectn)|

## Related

Other JS packages whose friendly API is driven by `selectn`:

- [array-groupby]
- [array.filter]
- [arraymap]
- [orderby-time]
- [regexp-id]
- [sum.js]

## Inspiration

JS packages that have inpsired `selectn`:

- [reach]
- [to-function]

## Alternatives

Alternative packages you might like instead of `selectn`:

- [dref]
- [path-lookup]
- [pathval]
- [reach]
- [to-function]

## Licenses

[![LICENSE](http://img.shields.io/npm/l/selectn.svg)](license)


[Bower]: http://bower.io
[Duo]: http://duojs.org
[Function]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function
[Property accessors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
[Sauce Test Status]: https://saucelabs.com/browser-matrix/selectn.svg
[Un-bind your JS with curry]: https://medium.com/@wilmoore/un-bind-your-js-with-curry-a8657a4138cb#.6dswguc2q
[array-groupby]: https://www.npmjs.com/package/array-groupby
[array.filter]: https://www.npmjs.com/package/array.filter
[arraymap]: https://www.npmjs.com/package/arraymap
[browsers]: https://saucelabs.com/u/selectn
[dref]: https://github.com/crcn/dref.js
[eval]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval
[filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[jspm]: http://jspm.io
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[note]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Member_Operators#Note_on_eval
[orderby-time]: https://www.npmjs.com/package/orderby-time
[parameter order]: https://wiki.haskell.org/Parameter_order
[path-lookup]: https://github.com/yields/path-lookup
[pathval]: https://www.npmjs.com/package/pathval
[reach]: https://github.com/spumko/hoek#reachobj-chain
[regexp-id]: https://www.npmjs.com/package/regexp-id
[sum.js]: https://www.npmjs.com/package/sum.js
[to-function]: https://github.com/component/to-function
[typeof]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/typeof
