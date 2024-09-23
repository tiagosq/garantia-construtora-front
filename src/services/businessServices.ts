const BASE_URL = import.meta.env.VITE_BASE_URL;

type IBusiness = {
  id?: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  status: boolean;
};

export const businessSearchRequest = async (token: string, page = 1, limit = 25, sort = { column: 'name', order: 'asc' }, filters: string[]) => {
  let url = `${BASE_URL}/businesses?page=${page}&limit=${limit}&${sort.column}-order=${sort.order}`;
  if(filters.length > 0) {
    url += `&${filters.join('&')}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const businessGetRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/businesses/${id}?id=${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const businessCreateRequest = async (token: string, data: IBusiness) => {
  const url = `${BASE_URL}/businesses`;
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

export const businessUpdateRequest = async (token: string, data: IBusiness, id: string) => {
  const url = `${BASE_URL}/businesses/${id}`;
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

export const businessDeleteRequest = async (token: string, id: string) => {
  const url = `${BASE_URL}/businesses/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};