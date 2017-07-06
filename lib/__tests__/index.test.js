import TSchemas from '..';

describe('TSchemas.email', () => {
	it('should validate proper emails', async () => {
		expect.assertions(1);
		expect(await TSchemas.email.isValid('test@example.com')).toBe(true);
	});
	it('should reject improper emails', async () => {
		expect.assertions(2);
		expect(await TSchemas.email.isValid('test')).toBe(false);
		expect(await TSchemas.email.isValid('')).toBe(false);
	});
});

describe('TSchemas.password', () => {
	it('should validate short password length', async () => {
		expect.assertions(1);
		const result = await TSchemas.password.isValid('abcd');
		expect(result).toBe(false);
	});
	it('should validate correct password length', async () => {
		expect.assertions(1);
		const result = await
		TSchemas.password.isValid('abcdef');
		expect(result).toBe(true);
	});
});
