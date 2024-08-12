const BASE_URL = import.meta.env.VITE_BASE_URL;

type IRole = {
  id?: string;
  name: string;
  management: boolean;
  status: boolean;
  permissions: string;
};

export const roleSearchRequest = async (token: string, page = 1, limit = 25) => {
  const url = `${BASE_URL}/roles?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const roleGetRequest = async (token: string, id: string) => {
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

export const roleCreateRequest = async (token: string, data: IRole) => {
  const url = `${BASE_URL}/roles`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, order: 0 }),
  });
  return response.json();
};

export const roleUpdateRequest = async (token: string, data: IRole, id: string) => {
  const url = `${BASE_URL}/roles/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, order: 0 }),
  });
  return response.json();
};

export const roleDeleteRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/roles/${id}`;
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