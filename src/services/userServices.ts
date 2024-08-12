const BASE_URL = import.meta.env.VITE_BASE_URL;

type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  business?: string;
};

export const userSearchRequest = async (token: string, page = 1, limit = 25) => {
  const url = `${BASE_URL}/users?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const userGetRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/roles/${id}?id=${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const userCreateRequest = async (token: string, data: IUser) => {
  const url = `${BASE_URL}/user`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const userUpdateRequest = async (token: string, data: IUser, id: string) => {
  const url = `${BASE_URL}/user/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const userDeleteRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/user/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  return response.json();
};