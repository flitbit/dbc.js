dbc.js [![Build Status](https://travis-ci.org/flitbit/dbc.js.png)](http://travis-ci.org/flitbit/dbc.js)
======

A compact design-by-contract helper for nodejs and the browser.

## Installation

[node.js](http://nodejs.org)
```bash
$ npm install dbc.js
```

To use in a browser:

```html
 <script src="../releases/dbc.js.min-1.0.js"></script>
```

!! Be sure to fix the path relative to your static media assets and the referring page.

## Tests

Tests use [mocha](http://visionmedia.github.io/mocha/) and [expect.js](https://github.com/LearnBoost/expect.js/), so if you clone the [github repository](https://github.com/flitbit/json-ptr) you'll need to run:

```bash
npm install
```

... followed by ...

```bash
npm test
```

... or ...

```bash
mocha -R spec
```

To run the same tests from a browser, open the `test/test.html` file directly from your file system.