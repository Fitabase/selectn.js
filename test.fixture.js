'use strict'

/*!
 * talks.
 */

export const talks = [
  {info: { name: 'Go Ahead, Make a Mess', feedback: [8, 9, 10] }},
  {info: { name: 'Silex Anatomy', feedback: [8, 9, 10] }},
  {info: { name: 'Unit Testing in Python', feedback: [8, 9, 10] }},
  {info: { name: 'Setting the Stage', feedback: [8, 9, 10] }}
];

/*!
 * books.
 */

export const books = {
  part: [
    { chapter: [
        { title: 'getting started' },
        { title: 'going with the flow' }
    ] }
  ]
};

/*!
 * falsey.
 */

export const falsey = {
  _false: false,
  _null: null,
  _undefined: undefined,
  _0: 0
};

/*!
 * non-strings.
 */

export const nonstring = {
  '/^$/': true,
  undefined: true,
  false: true,
  null: true,
  true: true,
  0: true
};

/*!
 * helpers.
 */

export const getfn = function (talk) {
  return talk.info.name
};
