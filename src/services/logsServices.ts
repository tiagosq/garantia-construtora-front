const BASE_URL = import.meta.env.VITE_BASE_URL;

export type ISearch = {
  search: {
    user: string;
    startDate: string;
    endDate: string;
  };
  sort: {
    column: string;
    order: string;
  };
}

export const logRequest = async (token: string, page = 1, limit = 25, filters: ISearch) => {
  const url = `${BASE_URL}/logs?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const logExport = async (token: string, page = 1, limit = 25) => {
  const response = await fetch(`${BASE_URL}/logs/export?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.blob();
}