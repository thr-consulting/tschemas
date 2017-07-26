// @flow

import yup, {mixed} from 'yup';
import moment from 'moment';
import {LocalDate} from 'js-joda';
import isNull from 'lodash/isNull';

/**
 * Validates a Moment.
 */
export class MomentSchema extends mixed {
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

/**
 * Validates a LocalDate object (from js-joda).
 */
export const localDate = yup.object({
	_day: yup.number().required('Day required'),
	_month: yup.number().required('Month required'),
	_year: yup.number().required('Year required'),
});

/**
 * Validates a LocalDate
 */
export class LocalDateSchema extends mixed {
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
