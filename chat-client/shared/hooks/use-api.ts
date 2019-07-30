import { useState } from 'react';

const useApi = apiCall => {
  return new Promise((resolve, reject) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const callApi = async (body = null) => {
      try {
        setLoading(true);
        setData(null);
        setError(false);
        const response = await apiCall(body);
        setData(response);
        resolve(response);
      } catch (e) {
        setError(e);
        reject(e);
      } finally {
        setLoading(false);
        reject();
      }
    };

    resolve([{ loading, data, error }, callApi]);
  });
};

export default useApi;
