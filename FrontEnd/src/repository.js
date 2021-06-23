import axios from 'axios';
import {configpath} from './utils/config'
const BASE_URL = configpath;
const token = localStorage.getItem('token');
export function getProducts() {
	return axios.get(`${BASE_URL}/products`)
		.then(response => response.data.data);
}

// export function getCartProducts(cart) {
// 	return axios.post(`${BASE_URL}/api/products`, {cart})
// 		.then(response => response.data);
// }

export function login (data) {
	return axios.post(`${BASE_URL}/users/authenticate`, { email: data.name, password: data.password })
		.then(response => {

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
	return localStorage.getItem('token');
}

export function postCartProducts(cart) {


	return axios.post(`${BASE_URL}/orders/add-to-cart`, {products:cart},{ headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${token}`}
         })
		.then(response => response.data);
}
export function getCartProducts() {
	return axios.get(`${BASE_URL}/orders/cart`, { headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${token}`}
         })
		.then(response => response.data);
}

export function deleteCartItem(cartId) {
	return axios.delete(`${BASE_URL}/orders/cart/${cartId}`,{ headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${token}`}
         })
		.then(response => response.data);
}
