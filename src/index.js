/**
 * Useful yup schema shortcuts
 * @module module:addons/TSchemas
 */
import yup, {mixed} from 'yup';
import SIN from 'social-insurance-number';
import escapeRegExp from 'escape-string-regexp';
import moment from 'moment';

const email = yup
	.string()
	.email('Invalid email address')
	.required('Email required')
	.trim()
	.lowercase();

const password = yup
	.string()
	.min(6)
	.required('Password required');

const passwordSecond = passwordField => yup.string().when(passwordField, v => {
	if (!v) return yup.string().required('Please confirm your password');
	return yup.string().matches(new RegExp(`^${escapeRegExp(v)}$`), 'Passwords must match');
});

const address = yup.object({
	description: yup.string().required('Description required'),
	address1: yup.string().required('Address 1 required'),
	address2: yup.string(),
	city: yup.string(),
	province: yup.string(),
	postalCode: yup.string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$|^\d\d\d\d\d$|^\d\d\d\d\d-\d\d\d\d$/, 'Invalid Postal Code'),
});

const phone = yup.object({
	description: yup.string().required('Description required'),
	number: yup.string().required().matches(/^(\d\d\d-\d\d\d-\d\d\d\d|\+\d-\d\d\d-\d\d\d-\d\d\d\d)( x\d+)?$/, 'Invalid Phone Number'),
});

export const sin = yup.object({
	sin: yup.string().test('is-sin', '${path} is not a valid SIN', value => new SIN(value).isValid()), // eslint-disable-line
});

class MomentSchema extends mixed {
	constructor() {
		super({type: 'momentschema'});

		this.transforms.push(value => {
			if (this.isType(value)) return value;

			const val = moment(value);
			return val.isValid() ? val : moment.invalid();
		});
	}

	_typeCheck(v) {
		return moment.isMoment(v) && v.isValid();
	}
}

const money = yup.object({
	amount: yup.number().required('Amount required'),
	currency: yup.string().required('Currency required'),
});

const localDate = yup.object({
	_day: yup.number().required('Day required'),
	_month: yup.number().required('Month required'),
	_year: yup.number().required('Year required'),
});

export default {
	email,
	password,
	passwordSecond,
	address,
	phone,
	sin,
	moment: () => new MomentSchema(),
	money,
	localDate,
};

/**
 * Generic Yup Schema
 * @typedef YupSchema
 * @memberOf module:addons/TSchemas
 */
