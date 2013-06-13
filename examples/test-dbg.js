var dbc = require('..')
, expect = require('expect.js')
;

// Design-by-contract
	// the imported `dbc` item

		// is a callable function
		expect(dbc).to.be.a('function');

		// exposes the ContractError class
		expect(dbc).to.have.property('ContractError');
		expect(dbc.ContractError).to.be.a('function');

		// when invoked with a single condition

			// succeeds if the condition is an object
			dbc({});

			// succeeds if the condition is a non-empty string
			dbc('yes');

			// succeeds if the condition is a non-zero number
			dbc(1);

			// succeeds if the condition is an empty array
			dbc([]);

			// succeeds if the condition is a function returning true
			dbc(function() { return true; });

			// throws if the first argument is undefined
			expect(function() {
				dbc(undefined);
			}).to.throwError(/Failed contract/);

			// throws if the first argument is null
			expect(function() {
				dbc(null);
			}).to.throwError(/Failed contract/);

			// throws if the first argument is zero (0
				expect(function() {
					dbc(0);
				}).to.throwError(/Failed contract/);

			// throws if the first argument is an empty string
			expect(function() {
				dbc(0);
			}).to.throwError(/Failed contract/);

			// throws if the first argument is a function returning false
			expect(function() {
				dbc(function() { return false; });
			}).to.throwError(/Failed contract/);


		// when invoked with multiple conditions

			// succeeds if all conditions are truthy
			dbc([{}, [], 1, 'y', function() { return true; }]);

			// throws if any conditions are falsy
			expect(function() {
				dbc([{}, [], 1, 'y', function() { return true; },null]);
			}).to.throwError(/Failed contract/);

		// when invoked with two arguments

		var contractViolationMessage = "Yo, get it right!";

			// succeeds if the condition is an object
			dbc({}, contractViolationMessage);

			// succeeds if the condition is a non-empty string
			dbc('yes', contractViolationMessage);

			// succeeds if the condition is a non-zero number
			dbc(1, contractViolationMessage);

			// succeeds if the condition is an empty array
			dbc([], contractViolationMessage);

			// succeeds if the condition is a function returning true
			dbc(function() { return true; }, contractViolationMessage);

			// throws if the first argument is undefined
			expect(function() {
				dbc(undefined, contractViolationMessage);
			}).to.throwError(contractViolationMessage);

			// throws if the first argument is null
			expect(function() {
				dbc(null, contractViolationMessage);
			}).to.throwError(contractViolationMessage);

			// throws if the first argument is zero (0
				expect(function() {
					dbc(0, contractViolationMessage);
				}).to.throwError(contractViolationMessage);

			// throws if the first argument is an empty string
			expect(function() {
				dbc(0, contractViolationMessage);
			}).to.throwError(contractViolationMessage);

			// throws if the first argument is a function returning false
			expect(function() {
				dbc(function() { return false; }, contractViolationMessage);
			}).to.throwError(contractViolationMessage);
