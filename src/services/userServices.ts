const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userSearchRequest = async (token: string, page = 1, limit = 25) => {
  const url = `${BASE_URL}/users`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};