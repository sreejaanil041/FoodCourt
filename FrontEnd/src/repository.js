import axios from 'axios';
import {configpath} from './utils/config'
const BASE_URL = configpath;

export function getProducts() {
	return axios.get(`${BASE_URL}/products`)
		.then(response => response.data.data);
}

export function getCartProducts(cart) {
	return axios.post(`${BASE_URL}/api/products`, {cart})
		.then(response => response.data);
}

export function login (data) {
	return axios.post(`${BASE_URL}/users/authenticate`, { email: data.name, password: data.password })
		.then(response => {
            localStorage.setItem('user', response.data);
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data
		})
		.catch(err => Promise.reject('Authentication Failed!'));
}
export function register (data) {
	return axios.post(`${BASE_URL}/users/register`, data)
		.then(response => {
            return response.data
		})
		.catch(err => Promise.reject('Registeration Failed!'));
}

export function isAuthenticated(){
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}

export function postCartProducts(cart) {
	return axios.post(`${BASE_URL}/orders/add-to-cart`, {cart})
		.then(response => response.data);
}
