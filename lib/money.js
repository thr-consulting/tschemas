// @flow

import yup from 'yup';

/**
 * Validates a Money object (from js-money).
 */
export const money = () => yup.object({
	amount: yup.number().required('Amount required'),
	currency: yup.string().required('Currency required'),
});
