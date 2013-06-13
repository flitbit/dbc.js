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


## Example

```javascript
var dbc = require('dbc.js')
, expect = require('expect.js')
;

// from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email) {
    return emailRe.test(email);
}

function Person(email, handle, last, first) {
	dbc([validateEmail(email)], 'email address must appear valid.')
	dbc([handle], 'a handle is required');
	dbc([typeof first === 'undefined' || typeof last === 'string'],
		'if you supply a first name you must also supply a last name');

	this.email = email;
	this.handle = handle;
	this.last = last;
	this.first = first;
}

expect(new Person('me@home.me', 'me')).to.be.a(Person);

expect(function() {

	// create a Person with a clearly invalid email address...
	new Person('it.doesn`t@compute')

}).to.throwError(/email address must appear valid/);

expect(function() {

	// create a Person without a handle
	new Person('jo@bob.me');

}).to.throwError(/a handle is required/);
```

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