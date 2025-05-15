import axios from 'axios';

const API_URL = 'http://192.168.15.6:8000/mobile';

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};


export const getContent = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar conteúdo:', error);
    throw error;
  }
};

export const createContent = async (title, content, tags, token) => {
  try {
    const response = await axios.post(`${API_URL}/save`, {title, tags, content, token}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch(error => console.error(error.response.data.message));
  } catch (error) {
    console.error('Erro ao criar conteúdo:', error);
    throw error;
  }
};

export const getContentTags = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/getTags`,  {
      params: {id},
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).catch(error => console.error(error.response.data.message));
    return response.data
  } catch (error) {
    console.error('Erro ao pegar as tags do conteudo:', error);
    throw error;
  }
}

export const deleteContent = async (id, token) => {
  try {
    // Supondo que delete também precise do token no header
    const response = await axios.post(`${API_URL}/delete`, { id }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar conteúdo:', error);
    throw error;
  }
};
