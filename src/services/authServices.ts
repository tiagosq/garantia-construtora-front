import cookies from 'react-cookies';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 200) {
    throw new Error('Dados de acesso incorretos.');
  } else {
    const data = await response.json();
    return data;
  }
};

export const logoutRequest = async (token: string) => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export const forgotPasswordRequest = async (email: string) => {
  const response = await fetch(`${BASE_URL}/auth/forget-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.status === 200;
};

export const resetPasswordRequest = async (password: string, password_confirmation: string, token: string) => {
  const response = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, password_confirmation, token }),
  });
  return response.status === 200;
};

export const refreshTokenRequest = async (token: string) => {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error('Token inválido.');
  } else {
    const data = await response.json();
    cookies.save('GC_JWT_AUTH', data.access_token, { path: '/', expires: new Date(Date.now() + 60 * 60 * 1000) });
    return data;
  }
};

export const getAuthData = async (token: string) => {
  const response = await fetch(`${BASE_URL}/users/own`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
