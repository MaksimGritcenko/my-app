import jwt from 'jsonwebtoken';
import {generateEntryId} from '../util/entry';
import type {Customer} from '../types';

export const jwsSecret = 'secret';

export function composeCustomer(
	username: string,
	token: string,
	customers: Customer[],
): Customer {
	return {
		id: generateEntryId(customers),
		username,
		token,
	};
}

export function generateWebToken(username: string): string {
	if (!username) {
		return '';
	}

	return jwt.sign({username}, jwsSecret);
}
