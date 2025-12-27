import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { APIError } from "./errors";
import { hashObject } from "./hash";

type RequestArgs = {
  key: string;
  url: string;
  input?: RequestInit;
  longPolling?: boolean;
};

export const POLL_INTERVAL = 3000;

export const useRequest = <T>({
  url,
  input,
  key,
  longPolling,
}: RequestArgs) => {
  const {
    data,
    isLoading,
    error,
    failureCount,
    isError,
    isFetching,
    isPending,
  } = useSuspenseQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const response = await fetch(url, input);

      if (!response.ok) {
        Promise.reject(
          APIError(
            `[requesting ${url}]`,
            `Response error received: ${response.status}`
          )
        );
      }
      return response.json();
    },
    refetchInterval: longPolling ? POLL_INTERVAL : false,
    retry: 3,
  });

  if (error && !isFetching) {
    throw APIError(
      `[requesting ${url}]`,
      `Response error received: ${error.message}`
    );
  }

  return {
    data,
    isLoading,
    error,
    failureCount,
    isError,
    isFetching,
    isPending,
  };
};

type RequestResponseArgs = {
  url: string;
};
export const useRequestResponse = <T extends {}, R>({
  url,
}: RequestResponseArgs) => {
  const {
    isError,
    isPending,
    isSuccess,
    mutate: send,
  } = useMutation({
    mutationFn: (body: T) => {
      return hashObject(body).then((hash) => {
        fetch(url, {
          method: "post",
          body: JSON.stringify({ ...body, hash }),
        }).then((response) => {
          if (response.ok) {
            return response.json() as R;
          }
        });
      });
    },
  });

  return { isError, isSuccess, isPending, send };
};
