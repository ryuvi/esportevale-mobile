import axios from 'axios';

import { API_URL } from '@env';

const BASE_URL = API_URL + '/news';

export const getContentByUser = async (token) => {
	try {
		const response = await axios.get(`${BASE_URL}/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Erro ao carregar conteúdo:', error);
		throw error;
	}
};

export const getContent = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/getAll`);
		// response deve existir aqui
		if (response && response.data && response.data.success) {
			return response.data;
		} else {
			// Em caso de erro, tenta pegar mensagem do servidor
			const msg = response?.data?.message || 'Erro desconhecido';
			throw new Error(msg);
		}
	} catch (error) {
		console.error('Erro ao carregar conteúdo:', error);
		throw error;
	}
};

export const getContentTags = async (id) => {
	try {
		const response = await axios
			.get(`${BASE_URL}/getTags`, {
				params: { id },
			})
			.catch((err) => console.error(err));
		return response.data.tags;
	} catch (error) {
		console.error('Erro ao pegar as tags do conteudo:', error);
		throw error;
	}
};

export const deleteContent = async (id, token) => {
	try {
		// Supondo que delete também precise do token no header
		const response = await axios.post(
			`${API_URL}/delete`,
			{ id },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Erro ao deletar conteúdo:', error);
		throw error;
	}
};

export const createContent = async (title, content, tags, token) => {
	try {
		const response = await axios
			.post(
				`${API_URL}/save`,
				{ title, tags, content, token },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			)
			.catch((error) => console.error(error.response.data.message));
		console.log(response)
		return response.data;
	} catch (error) {
		console.error('Erro ao criar conteúdo:', error);
		throw error;
	}
};
