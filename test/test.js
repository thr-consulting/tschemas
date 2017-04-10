import {expect} from 'chai';
import TSchemas from '../lib';

describe('TSchemas.email', () => {
	it('should validate proper emails', () => {
		TSchemas.email.isValid('test@example.com').then(valid => expect(valid).to.equal(true));
	});
	it('should reject improper emails', () => {
		TSchemas.email.isValid('test').then(valid => expect(valid).to.equal(false));
	});
	it('should reject improper emails', () => {
		TSchemas.email.isValid('').then(valid => expect(valid).to.equal(false));
	});
});

describe('TSchemas.password', () => {
	it('should validate password length', () => {
		TSchemas.password.isValid('abcd', valid => {
			expect(valid).to.equal(false);
		})
	});
	it('should validate password length', () => {
		TSchemas.password.isValid('abcdef', valid => {
			expect(valid).to.equal(true);
		})
	});
});
