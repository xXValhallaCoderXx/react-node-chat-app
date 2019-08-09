import { useState } from 'react';

interface UseApiCall {
  callApi: any;
}

interface Response {
  state: {
    success: boolean;
    loading: boolean;
    error: string;
    data: any;
  };
  useApi: any;
}

const useApiCall = ({ callApi }: UseApiCall): Response => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  async function useApi(data?: any) {
    setLoading(true);
    try {
      const response = await callApi(data);
      setLoading(false);
      setSuccess(true);
      setData(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error.data);
      return error.data;
    }
  }

  return {
    state: {
      success,
      loading,
      error,
      data,
    },
    useApi,
  };
};

export default useApiCall;
