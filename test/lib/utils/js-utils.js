/**
 * @fileoverview Tests for lib/utils/js-utils.js
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var jsUtils = require ('../../../lib/utils/js-utils'),
	Solium = require ('../../../lib/solium');

var userConfig = {
	'custom-rules-filename': null,
	rules: {}
};

describe ('Test jsUtils functions', function () {

	it ('should have a set of functions exposed as API', function (done) {
		jsUtils.should.have.ownProperty ('isStrictlyObject');
		jsUtils.isStrictlyObject.should.be.type ('function');

		jsUtils.should.have.ownProperty ('toContract');
		jsUtils.toContract.should.be.type ('function');

		jsUtils.should.have.ownProperty ('toFunction');
		jsUtils.toFunction.should.be.type ('function');
		done ();
	});

	it ('isStrictlyObject: should correctly classify whether argument is a non-array, non-null object', function (done) {
		var iso = jsUtils.isStrictlyObject;

		iso ().should.equal (false);
		iso (100).should.equal (false);
		iso (null).should.equal (false);
		iso ('foo').should.equal (false);
		iso ([1,2]).should.equal (false);

		iso ({}).should.equal (true);

		done ();
	});

	it('toContract: should correctly wrap a solidity statement in contract code', function (done) {
		var toContract = jsUtils.toContract;
		var statement = 'uint x = 1;'
		var expected = 
			'pragma solidity ^0.4.3;\n\n\n' +
			'contract Wrap {\n' +
			'\t' + statement + '\n' +
			'}';

		var errors = Solium.lint(expected, userConfig);
		errors.constructor.name.should.equal ('Array');
		errors.length.should.equal (0);
		toContract(statement).should.equal(expected);

		Solium.reset();
		done ();
	});

	it('toFunction: should correctly wrap a solidity statement in contract/function code', function (done) {
		var toFunction = jsUtils.toFunction;
		var statement = 'uint x = 1;'
		var expected = 
			'pragma solidity ^0.4.3;\n\n\n' +
			'contract Wrap {\n' +
			'\tfunction wrap() {\n' + 
			'\t\t' + statement + '\n' +
			'\t}\n' +
			'}';

		var errors = Solium.lint(expected, userConfig);
		errors.constructor.name.should.equal ('Array');
		errors.length.should.equal (0);
		toFunction(statement).should.equal(expected);

		Solium.reset();
		done ();
	});
});
