import { AxiosError, CanceledError } from 'axios';
import axios from 'axios';

import { useRef, useState, useEffect } from 'react';

export default useReminderList;
export type { APIInput, APIResponse, FailedAPIResponse };

type APIInput = {
  starts_at: number;
  ends_at: number;
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

type UseReminderListOptions = {
  startsAt: number;
  endsAt: number;
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/reminder`,
});

function useReminderList({ startsAt, endsAt }: UseReminderListOptions) {
  const abortController = useRef<AbortController>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [reminders, setReminders] = useState<APIResponse[]>([]);

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current?.abort();
    };
  }, []);

  useEffect(() => {
    async function main() {
      setError(null);

      try {
        const { data: response } = await api.get<APIResponse[]>('/', {
          signal: abortController.current?.signal,
          params: {
            starts_at: startsAt,
            ends_at: endsAt,
          },
        });

        setReminders(response);
      } catch (err) {
        if (err instanceof CanceledError) {
          return;
        }

        const axiosError = err as AxiosError<FailedAPIResponse>;
        const statusCode = axiosError.response?.status || 404;

        if (statusCode > 199 && statusCode < 500) {
          setError({
            message:
              'Failed to list reminders in this range, reload to try again!',
          });
          return;
        }

        setError({
          message: axiosError.response?.data.message || 'Unknown Error',
        });
      }

      setIsFetching(false);
    }

    main();
  }, [startsAt, endsAt]);

  return {
    isFetching,
    error,
    reminders,
  };
}
