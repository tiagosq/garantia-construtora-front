import { IBuilding } from '../types/types';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const buildingSearchRequest = async (token: string, business: string, page = 1, limit = 25) => {
  const url = `${BASE_URL}/buildings?business=${business}&page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const buildingGetRequest = async (token: string, id: string, business: string) => {
  const url = `${BASE_URL}/buildings/${id}?business=${business}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const buildingCreateRequest = async (token: string, data: IBuilding) => {
  const url = `${BASE_URL}/buildings`;
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

export const buildingUpdateRequest = async (token: string, data: IBuilding, id: string) => {
  const url = `${BASE_URL}/buildings/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, ...data }),
  });
  return response.json();
};

export const buildingDeleteRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/buildings/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};