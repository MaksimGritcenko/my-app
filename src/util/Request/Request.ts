/* eslint-disable @typescript-eslint/naming-convention */
export const getToken = (isBearer = true): string => {
	const token = localStorage.getItem('token');
	return token
		? isBearer ? `Bearer ${token}` : token
		: '';
};

export const getApiUrl = (URI: string): string => `http://localhost:3001${URI}`;

export const getHeaders = (): HeadersInit => ({
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: getToken(),
});

export const postFetch = async (URI: string, body: any): Promise<Response> => fetch(getApiUrl(URI), {
	method: 'POST',
	body: JSON.stringify(body),
	headers: getHeaders(),
});

export const getFetch = async (URI: string): Promise<Response> => fetch(getApiUrl(URI), {
	method: 'GET',
	headers: getHeaders(),
});

export const putFetch = async (URI: string, body: any): Promise<Response> => fetch(getApiUrl(URI), {
	method: 'PUT',
	body: JSON.stringify(body),
	headers: getHeaders(),
});
