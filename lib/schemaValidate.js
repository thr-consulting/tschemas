// @flow

import omit from 'lodash/omit';
import debug from 'debug';
import {getTSchemaConfig} from './config';

const d = debug('app:core:lib:schema');

/**
 * Validates a schema on the server. This function is for use on the server only!
 * Returns null if validation passed. Returns a yup ValidationError if it fails.
 * Does not include the object as 'value'.
 * @function schemaValidate
 * @tag Server
 * @param {module:addons/TSchemas.YupSchema} schema - The schema to validate against.
 * @param {object} obj - The object to validate.
 * @param validateOptions - Custom yup validate options.
 * @returns {object}
 */
export default function(schema: Object, obj: Object, validateOptions: Object) {
	const {Meteor} = getTSchemaConfig();
	const result = Meteor.wrapAsync((objWrap: Object, schemaWrap: Object, cb: Function) => {
		schemaWrap.validate(objWrap, validateOptions || {
			strict: true,
		}, (err: Object[], res: Object[]) => {
			cb(null, {err, res});
		});
	})(obj, schema);
	d('Validation result: ', result.err, result.res);
	if (result.err) {
		return omit(result.err, ['value']);
	}
	return null;
}
