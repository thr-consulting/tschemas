/**
 * Useful yup schema shortcuts
 */
import yup, {mixed} from 'yup';
import SIN from 'social-insurance-number';
import escapeRegExp from 'escape-string-regexp';
import moment from 'moment';

/**
 * Validates email addresses.
 */
const email = yup
	.string()
	.email('Invalid email address')
	.required('Email required')
	.trim()
	.lowercase();

/**
 * Validates a password. Required string, min length 6 chars.
 */
const password = yup
	.string()
	.min(6)
	.required('Password required');

/**
 * Validates a second password.
 * @param passwordField
 */
const passwordSecond = passwordField => yup.string().when(passwordField, v => {
	if (!v) return yup.string().required('Please confirm your password');
	return yup.string().matches(new RegExp(`^${escapeRegExp(v)}$`), 'Passwords must match');
});

/**
 * Validates an address object.
 */
const address = yup.object({
	description: yup.string().required('Description required'),
	address1: yup.string().required('Address 1 required'),
	address2: yup.string(),
	city: yup.string(),
	province: yup.string(),
	postalCode: yup.string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$|^\d\d\d\d\d$|^\d\d\d\d\d-\d\d\d\d$/, 'Invalid Postal Code'),
});

/**
 * Validates a phone number.
 */
const phone = yup.object({
	description: yup.string().required('Description required'),
	number: yup.string().required().matches(/^(\d\d\d-\d\d\d-\d\d\d\d|\+\d-\d\d\d-\d\d\d-\d\d\d\d)( x\d+)?$/, 'Invalid Phone Number'),
});

/**
 * Validates a Canadian SIN.
 */
export const sin = yup.object({
	sin: yup.string().test('is-sin', '${path} is not a valid SIN', value => new SIN(value).isValid()), // eslint-disable-line
});

/**
 * Validates a Moment.
 */
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

/**
 * Validates a Money object (from js-money).
 */
const money = yup.object({
	amount: yup.number().required('Amount required'),
	currency: yup.string().required('Currency required'),
});

/**
 * Validates a LocalDate object (from js-joda).
 */
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
 */
