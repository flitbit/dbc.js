var dbc = require('..')
, expect = require('expect.js')
;

// from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email) {
    return emailRe.test(email);
}

function Person(email, handle, last, first) {
	dbc(validateEmail(email), 'email address must appear valid.')
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