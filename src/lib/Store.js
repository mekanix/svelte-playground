import axios from 'axios';

const API_ROOT = '/api/v0';

const getCookie = (name) => {
	var value = '; ' + document.cookie;
	var parts = value.split('; ' + name + '=');
	if (parts.length === 2) return parts.pop().split(';').shift();
};

const rest = (apiRoot = API_ROOT) => {
	const data = axios.create({ baseURL: apiRoot, withCredentials: true });
	data.interceptors.request.use(
		(config) => {
			const csrfType = config.url === '/auth/refresh' ? 'csrf_refresh_token' : 'csrf_access_token';
			const csrf = getCookie(csrfType);
			config.headers.withCredentials = true;
			if (csrf) {
				config.headers['X-CSRF-TOKEN'] = csrf;
			}
			return config;
		},

		(err) => Promise.reject(err)
	);
	return data;
};

const api = rest();
const Store = { api };

export default Store;
