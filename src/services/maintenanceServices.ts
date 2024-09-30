import { IMaintenance, IQuestion, IQuestionCreation } from "../types/types";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const questionsCreateRequest = async (token: string, maintenance: string, business: string, data: IQuestionCreation[]) => {
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

export const questionsUpdateRequest = async (token: string, maintenance: string, business: string, data: IQuestionCreation[]) => {
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
export const questionsAnswerRequest = async (
  token: string,
  maintenance: string,
  business: string,
  data: IQuestion & { filesDeleted?: string[] },
) => {
  const formData = new FormData();

  if (data.fiscal) {
    data.fiscal.forEach((item, i) => {
      // @ts-expect-error - Ignorar erro de tipagem pois é uma validação de tipos diferentes.
      if(!item.id) {
        formData.append(`fiscal[${i}]`, item as unknown as Blob);
      }
    });
    delete data.fiscal;
  }

  if (data.photos) {
    data.photos.forEach((item, i) => {
      // @ts-expect-error - Ignorar erro de tipagem pois é uma validação de tipos diferentes.
      if(!item.id) {
        formData.append(`photo[${i}]`, item as unknown as Blob);
      }
    });
    delete data.photos;
  }

  if (data.videos) {
    data.videos.forEach((item, i) => {
      // @ts-expect-error - Ignorar erro de tipagem pois é uma validação de tipos diferentes.
      if(!item.id) {
        formData.append(`video[${i}]`, item as unknown as Blob);
      }
    });
    delete data.videos;
  }

  if(data.filesDeleted) {
    data.filesDeleted.forEach((item, i) => {
      formData.append(`filesDeleted[${i}]`, item);
    });
    delete data.filesDeleted
  }

  // Adiciona outros dados ao FormData
  Object.keys(data).forEach((key) => {
    // @ts-expect-error - Ignorar erro de tipagem
    if (data[key]) {
      // @ts-expect-error - Ignorar erro de tipagem
      formData.append(key, data[key] as unknown as Blob);
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

export const maintenanceGetRequest = async (token: string, business: string, building: string = '', page = 1, limit = 25, sort = { column: 'end_date', order: 'desc' }, filters: string[]) => {
  let url = `${BASE_URL}/maintenances?business=${business}&page=${page}&limit=${limit}&${sort.column}-order=${sort.order}`;
  if(building) {
    url += `&building=${building}`;
  }
  if(filters.length > 0) {
    url += `&${filters.join('&')}`;
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