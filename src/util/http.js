import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	xsrfCookieName: 'XSRF-TOKEN', // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
	xsrfHeaderName: 'X-XSRF-TOKEN', // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
});

if (typeof window !== 'undefined') {
	instance.interceptors.response.use(
		(response) => response.data,
		(error) => Promise.reject(error)
	);
}

export const http = instance;
