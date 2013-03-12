# selectn

  Select n-levels deep into an object by providing a dot/bracket-notation query string.

## Build Status

[![Build Status](https://travis-ci.org/wilmoore/selectn.png?branch=master)](https://travis-ci.org/wilmoore/selectn)

## Features

  - `selectn` is simple, tiny and exposes a fluent API
  - ES5 and non-ES5 compatible

## Non-Features

  - No `eval` and [friends][Function]

## Installation

[component](http://component.io/wilmoore/selectn)

    $ component install wilmoore/selectn

[bower](http://sindresorhus.com/bower-components/)

    $ bower install selectn

[npm](https://npmjs.org/package/selectn)

    $ npm install selectn

## Example (immediate access)

Given the following object:

```js
var talk = {
  info: { name: 'Go Ahead, Make a Mess' }
};
```

the generated function can be immediately invoked for error-free and immediate access to deeply nested properties.

```js
selectn('info.name')(talk);
// => 'Go Ahead, Make a Mess'
```

## Example (functor predicate)

Given the following list:

```js
var talks  = [
  { info: { name: 'Go Ahead, Make a Mess' }},
  { info: { name: 'Silex Anatomy' }},
  { info: { name: 'Unit Testing in Python' }},
  { info: { name: 'Setting the Stage' }}
];
```
the generated function can be used as a predicate for a functor:

```js
var query = selectn('info.name');
talks.map(query);
// => [ 'Go Ahead, Make a Mess', 'Silex Anatomy', 'Unit Testing in Python', 'Setting the Stage' ]
```

## Rationale

In larger, data-driven applications, there tends to be a need to do a lot of deep object access which can quickly lead to code like this:

```
var name;
if (contact && contact.info && contact.info.name) {
  name = contact.info.name.full || 'unknown';
}
```

The following is much more concise:

```
var name = selectn('info.name.full')(contact) || 'unknown';
```

Alternatively, you can use [`typeof`][typeof]; however, it's limited in it's fluency and tends to make otherwise easy to read code look more obtuse than it really is. There are also solutions involving [`eval`][eval] and/or [`Function`][Function] ([`eval`][note] in indisguise). Thanks, but no thanks.  

## Inspiration

- [to-function][to-function]
- [reach][reach]

## License

  MIT



[to-function]:  https://github.com/component/to-function
[reach]:        https://github.com/spumko/hoek#reachobj-chain
[Function]:     https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function
[eval]:         https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval
[note]:         https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Member_Operators#Note_on_eval
[typeof]:       https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/typeof

