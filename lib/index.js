// @flow

import {address, email, password, passwordSecond, phone, sin} from './user';
import {localDate, LocalDateSchema, MomentSchema} from './date';
import {money} from './money';


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
	LocalDateSchema,
};

/**
 * Generic Yup Schema
 * @typedef {Object} YupSchema
 */
