;
if (typeof require === 'function') {
	var expect = require('expect.js')
	, dbc = require('..')
	;
}

describe('Design-by-contract', function() {
	describe('the imported `dbc` item', function() {

		it('is a callable function', function() {
			expect(dbc).to.be.a('function');
		});

		it('exposes the ContractError class', function() {
			expect(dbc).to.have.property('ContractError');
			expect(dbc.ContractError).to.be.a('function');
		});

		describe('when invoked with a single condition', function() {

			it('succeeds if the condition is an object', function() {
				dbc({});
			});

			it('succeeds if the condition is a non-empty string', function() {
				dbc('yes');
			});

			it('succeeds if the condition is a non-zero number', function() {
				dbc(1);
			});

			it('succeeds if the condition is an empty array', function() {
				dbc([]);
			});

			it('succeeds if the condition is a function returning true', function() {
				dbc(function() { return true; });
			});

			it('throws if the first argument is undefined', function() {
				expect(function() {
					dbc(undefined);
				}).to.throwError(/Failed contract/);
			});

			it('throws if the first argument is null', function() {
				expect(function() {
					dbc(null);
				}).to.throwError(/Failed contract/);
			});

			it('throws if the first argument is zero (0)', function() {
				expect(function() {
					dbc(0);
				}).to.throwError(/Failed contract/);
			});

			it('throws if the first argument is an empty string', function() {
				expect(function() {
					dbc(0);
				}).to.throwError(/Failed contract/);
			});

			it('throws if the first argument is a function returning false', function() {
				expect(function() {
					dbc(function() { return false; });
				}).to.throwError(/Failed contract/);
			});

		});

		describe('when invoked with multiple conditions', function() {

			it('succeeds if all conditions are truthy', function() {
				dbc([{}, [], 1, 'y', function() { return true; }]);
			});

			it('throws if any conditions are falsy', function() {
				expect(function() {
					dbc([{}, [], 1, 'y', function() { return true; },null]);
				}).to.throwError(/Failed contract/);
			});

		});
		describe('when invoked with two arguments', function() {

			var contractViolationMessage = "Yo, get it right!";

			it('succeeds if the condition is an object', function() {
				dbc({}, contractViolationMessage);
			});

			it('succeeds if the condition is a non-empty string', function() {
				dbc('yes', contractViolationMessage);
			});

			it('succeeds if the condition is a non-zero number', function() {
				dbc(1, contractViolationMessage);
			});

			it('succeeds if the condition is an empty array', function() {
				dbc([], contractViolationMessage);
			});

			it('succeeds if the condition is a function returning true', function() {
				dbc(function() { return true; }, contractViolationMessage);
			});

			it('throws if the first argument is undefined', function() {
				expect(function() {
					dbc(undefined, contractViolationMessage);
				}).to.throwError(contractViolationMessage);
			});

			it('throws if the first argument is null', function() {
				expect(function() {
					dbc(null, contractViolationMessage);
				}).to.throwError(contractViolationMessage);
			});

			it('throws if the first argument is zero (0)', function() {
				expect(function() {
					dbc(0, contractViolationMessage);
				}).to.throwError(contractViolationMessage);
			});

			it('throws if the first argument is an empty string', function() {
				expect(function() {
					dbc(0, contractViolationMessage);
				}).to.throwError(contractViolationMessage);
			});

			it('throws if the first argument is a function returning false', function() {
				expect(function() {
					dbc(function() { return false; }, contractViolationMessage);
				}).to.throwError(contractViolationMessage);
			});

		});


	})
})