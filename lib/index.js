// @flow

import {address, email, password, passwordSecond, phone, sin} from './user';
import {localDateNumber, localDateSchema, momentSchema} from './date';
import {money} from './money';


export default {
	email,
	password,
	passwordSecond,
	address,
	phone,
	sin,
	moment: momentSchema,
	money,
	localDateNumber,
	localDate: localDateSchema,
};

/**
 * Generic Yup Schema
 * @typedef {Object} YupSchema
 */
