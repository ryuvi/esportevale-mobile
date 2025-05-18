// api/auth.js

import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';

const BASE_URL = API_URL + '/auth';

export const login = async (email, password) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/login`,
			{ email, password },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Erro ao fazer login:', error);
		throw error;
	}
};

export const register = async (name, email, password) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/register`,
			{ name, email, password },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Erro ao registrar usuário:', error);
		throw error;
	}
};

export const isLogged = async () => {
	try {
		const token = await AsyncStorage.getItem('userToken');
		const response = await axios.get(`${API_URL}/isLogged`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Erro ao verificar login:', error);
		throw error;
	}
};
