import { IMaintenance, IQuestion } from "../types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const questionsRequest = async (token: string, maintenance: string, business: string) => {
  const response = await fetch(`${BASE_URL}/questions?business=${business}&maintenance=${maintenance}&limit=100&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const questionsUpdateRequest = async (token: string, maintenance: string, business: string, data: IQuestion) => {
  const response = await fetch(`${BASE_URL}/questions/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      business,
      maintenance,
      ...data
    })
  });
  return response.json();

};

export const maintenanceGetRequest = async (token: string, business: string, building: string = '') => {
  let url = `${BASE_URL}/maintenances?business=${business}`;
  if(building) {
    url += `&building=${building}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const maintenanceRequest = async (token: string, maintenance: string, business: string) => {
  const response = await fetch(`${BASE_URL}/maintenances/${maintenance}?business=${business}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const maintenanceFinishRequest = async (token: string, maintenance: string, data: IMaintenance) => {
  const response = await fetch(`${BASE_URL}/maintenances/${maintenance}?`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      id: maintenance,
      ...data,
      is_completed: true,
    })
  });
  return response.json();
}