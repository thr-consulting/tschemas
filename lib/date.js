// @flow

import yup, {mixed} from 'yup';
import moment from 'moment';
import {LocalDate} from 'js-joda';
import isNull from 'lodash/isNull';

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

	_typeCheck(v: Object) {
		return moment.isMoment(v) && v.isValid();
	}
}
export const momentSchema = () => new MomentSchema();

/**
 * Validates a LocalDateNumber
 */
export const localDateNumber = () => yup.number();

/**
 * Validates a LocalDate
 */
class LocalDateSchema extends mixed {
	constructor() {
		super({type: 'localdateschema'});

		this.transforms.push(value => {
			if (this.isType(value)) return value;

			if (isNull(value)) return null;
			if (value instanceof LocalDate) return value;
			return null;
		});
	}

	_typeCheck(v: Object) {
		if (isNull(v)) return true;
		return v instanceof LocalDate;
	}
}
export const localDateSchema = () => new LocalDateSchema();
