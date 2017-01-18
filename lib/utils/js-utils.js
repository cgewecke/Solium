/**
 * @fileoverview Utility functions for rest of teh code base
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

module.exports = {

	/**
	 * Check if given argument is a non-null, non-Array javascript object
	 * @param {Object} possibleObject Argument to check for validity
	 * @returns {Boolean} isObject true if given argument is object, false otherwise
	 */
	isStrictlyObject: function (possibleObject) {
		return (
			possibleObject !== null &&	//because typeof null equals 'object', make sure the object is non-null
			typeof possibleObject === 'object' &&
			possibleObject.constructor !== Array
		);
	},

	/**
	 * Wrap solidity statement in valid contract boilerplate. 
	 * @param  {String} code Solidity snippet to wrap
	 * @return {String}      wrapped snippet
	 */
	toContract: function (code) {
		var pre = 'pragma solidity ^0.4.3;\n\ncontract Wrap {\n\t';
		var post = '\n}';
		return pre + code + post;
	},

	/**
	 * Wrap solidity statement in valid contract and function boilerplate. 
	 * @param  {String} code Solidity snippet
	 * @return {String}      wrapped snippet
	 */
	toFunction: function (code) {
		var pre = 'pragma solidity ^0.4.3;\n\ncontract Wrap {\n\tfunction wrap() {\n\t\t';
		var post = '\n\t}\n}';
		return pre + code + post;
	}

};