import type { AxiosError } from 'axios';
import axios from 'axios';

import { useCallback } from 'react';

export default useReminder;
export type { APIInput, APIResponse, FailedAPIResponse };

type APIInput = {
  date: number;
  description: string;
  city?: string;
  color?: string;
};

type APIResponse = {
  description: string;
  city: string | null;
  color: string;
  date: string;
};

type FailedAPIResponse = {
  message: string;
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/reminder`,
});

function useReminder() {
  const onAddReminder = useCallback(async (data: APIInput) => {
    try {
      const { data: response } = await api.post<APIResponse>('/', data);

      return {
        error: null,
        response,
      };
    } catch (err) {
      const axiosError = err as AxiosError<FailedAPIResponse>;
      const statusCode = axiosError.response?.status || 404;

      if (statusCode > 199 && statusCode < 500) {
        return {
          error: 'Failed to add reminder, try again!',
          response: null,
        };
      }

      return {
        error: axiosError.response?.data.message || 'Unknown Error',
        response: null,
      };
    }
  }, []);

  return {
    onAddReminder,
  };
}
