import axios from 'axios';
import { getLocalStorage } from '../utils/storage';

export const api = axios.create({
  baseURL: 'https://api-sistema-financeiro.herokuapp.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const signIn = async (body) => {
  let response = {};
  try {
    const returnApi = await api.post('/signin', body);
    const { data } = returnApi;
    response = {
      userId: data.user.id,
      token: data.token,
      error: false,
    };
  } catch (error) {
    response = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return response;
};

export const registerClients = async (token, body) => {
  let dadosRecebidos = [];
  try {
    await api.post('/clients', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dadosRecebidos = {
      error: false,
    };
  } catch (error) {
    dadosRecebidos = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return dadosRecebidos;
};

export const getClient = async (token, id) => {
  let data = {};
  try {
    const response = await api.get(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.data;
  } catch (error) {
    data = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return data;
};

export const editClient = async (token, body, id) => {
  let data = {};
  try {
    const response = await api.patch(`/clients/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.data;
  } catch (error) {
    data = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return data;
};

export const detailUser = async (token) => {
  let data = {};
  try {
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = {
      nome: response.data.nome,
      email: response.data.email,
      cpf: response.data.cpf ? response.data.cpf : '',
      telefone: response.data.telefone ? response.data.telefone : '',
      error: false,
    };
  } catch (error) {
    data = {
      message: error.response.data,
      error: true,
    };
  }
  return data;
};

export const updateUser = async (token, body) => {
  let data = {};
  const { confirmacaoSenha, ...userData } = body;
  try {
    const response = await api.patch('/users', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.data;
  } catch (error) {
    data = {
      message: error.response.data,
      error: true,
    };
  }
  return data;
};

export const showAllClients = async (token, query) => {
  let data = [];
  try {
    const response = await api.get(`/clients?clients=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data = [...response.data];
  } catch (error) {
    data = [error.message];
  }
  return data;
};

export const showAllCharges = async (token, query) => {
  let data = [];
  try {
    const response = await api.get(`/charges?charges=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data = [...response.data];
  } catch (error) {
    data = [error.message];
  }
  return data;
};

export const registerCharges = async (body, clientId) => {
  const form = { ...body, valor: body.valor * 100 };
  let dadosRecebidos = {};
  const token = getLocalStorage('token');

  try {
    await api.post(`/clients/${clientId}/charges`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dadosRecebidos = {
      error: false,
    };
  } catch (error) {
    dadosRecebidos = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return dadosRecebidos;
};

export const updateCharge = async (body, chargeId) => {
  const form = { ...body, valor: body.valor * 100 };
  let dadosRecebidos = {};
  const token = getLocalStorage('token');

  try {
    await api.patch(`/charges/${chargeId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dadosRecebidos = {
      error: false,
    };
  } catch (error) {
    dadosRecebidos = {
      mensagem: error.response.data,
      error: true,
    };
  }
  return dadosRecebidos;
};

export const showStatusCharges = async (token) => {
  let data = {};
  try {
    const response = await api.get('/charges-status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.data;
  } catch (error) {
    data = {
      erro: true,
      message: error.message,
    };
  }
  return data;
};

export const showStatusClients = async (token) => {
  let data = {};
  try {
    const response = await api.get('/clients-status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = { ...response.data };
  } catch (error) {
    data = { error: true, message: error.message };
  }
  return data;
};

export const DeleteCharges = async (chargeId) => {
  let data = {};
  const token = getLocalStorage('token');

  try {
    await api.delete(`/charges/${chargeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = { error: false };
  } catch (error) {
    data = {
      error: true,
      mensagem: error.response.data,
    };
  }
  return data;
};
