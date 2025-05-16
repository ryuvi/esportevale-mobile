import axios from 'axios'

const API_URL = 'http://192.168.15.6:8000/mobile';
const BASE_URL = API_URL + '/leagues'

export const getLeagues = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getLeagues`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar ligas:', error);
        throw error;
    }
}

export const getRounds = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getRounds`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar rodadas:', error);
        throw error;
    }
}
