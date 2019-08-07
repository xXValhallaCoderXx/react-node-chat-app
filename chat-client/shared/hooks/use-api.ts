import { useState } from 'react';

const useApi = apiCall => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  async function callApi(body = null) {
    try {
      setLoading(true);
      setData(null);
      setError(false);
      const response = await apiCall(body);
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return [{ loading, data, error }, callApi];
};

export default useApi;
