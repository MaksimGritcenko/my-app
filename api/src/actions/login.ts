import jwt from 'jsonwebtoken';
import type { Customer } from '../types';

export const jwsSecret = 'secret';

function _getIncrementCustomerId(customers: Array<Customer>): number {
    return customers.reduce((acc, { id }) => {
        if (acc < id) {
            acc = id;
        }

        return acc;
    }, 1);
}

export function composeCustomer(
    username: string,
    token: string,
    customers: Array<Customer>
): Customer {
    return {
        id: _getIncrementCustomerId(customers),
        username,
        token
    };
}

export function generateWebToken(username: string): string {
    if (!username) {
        return '';
    }

    return jwt.sign({ username }, jwsSecret);
}