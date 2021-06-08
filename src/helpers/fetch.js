const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = (endpoind, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoind}`;

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchConToken = (endpoind, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoind}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};
