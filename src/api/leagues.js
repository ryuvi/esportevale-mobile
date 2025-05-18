import axios from 'axios';
import { API_URL } from '@env';

const BASE_URL = `${API_URL}/leagues`;

// Função genérica para GET requests com tratamento centralizado
async function fetchData(endpoint) {
	try {
		const response = await axios.get(`${BASE_URL}/${endpoint}`, {
			timeout: 5000, // 5 segundos timeout
		});
		return response.data;
	} catch (error) {
		console.error(`Erro ao carregar ${endpoint}:`, error.message || error);
		// Pode aqui fazer tratamento adicional, ex: mostrar mensagem, logar em serviço, etc.
		throw error; // repassa o erro para o chamador tratar se quiser
	}
}

export const getLeagues = () => fetchData('getLeagues');

export const getRounds = () => fetchData('getRounds');
