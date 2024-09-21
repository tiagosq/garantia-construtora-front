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

export const questionsCreateRequest = async (token: string, maintenance: string, business: string, data: IQuestion[]) => {
  const requests = data.map((item) => {
    return fetch(`${BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...item,
        business,
        maintenance,
        observations: '',
        status: 0,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      })
    });
  });
  return Promise.all(requests);        
};

export const questionsUpdateRequest = async (token: string, maintenance: string, business: string, data: IQuestion[]) => {
  const requests = data.map((item) => {
    return fetch(`${BASE_URL}/questions/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...item,
        business,
        maintenance,
      })
    });
  });
  return Promise.all(requests);
};
export const questionsAnswerRequest = async (token: string, maintenance: string, business: string, data: IQuestion) => {
  // Faz a requisição PUT com o FormData
  const formData = new FormData();

  [...data.photos || [], ...data.docs || []].forEach((item, index) => {
    // @ts-expect-error - Não é possível garantir que a chave exista
    formData.append(`attachments_to_add[${index}]`, item);
  });

  delete data.photos;
  delete data.docs;
  data.status = 1;

  Object.keys(data).forEach((key) => {
    // @ts-expect-error - Não é possível garantir que a chave exista
    if(data[key]) {
      // @ts-expect-error - Não é possível garantir que a chave exista
      formData.append(key, data[key]);
    }
  });

  formData.append('business', business);
  formData.append('maintenance', maintenance);

  const response = await fetch(`${BASE_URL}/questions/${data.id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
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

export const maintenanceCreateRequest = async (token: string, data: IMaintenance) => {
  const response = await fetch(`${BASE_URL}/maintenances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export const maintenanceUpdateRequest = async (token: string, data: IMaintenance, id: string) => {
  const response = await fetch(`${BASE_URL}/maintenances/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id, ...data }),
  });
  return response.json();
}

export const maintenanceDeleteRequest = async (token: string, maintenance: string) => {
  const response = await fetch(`${BASE_URL}/maintenances/${maintenance}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}