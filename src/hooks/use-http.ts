import { useCallback, useState } from "react";

interface OptionsType {
  method?: "GET" | "POST";
  body?: BodyInit;
  headers?: Headers;
}

// Must specify format of expected response as type
const useHttp = <T>(URL: string, requestOptions?: OptionsType) => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [isAwaiting, setIsAwaiting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async () => {
    setIsAwaiting(true);
    setError(null);

    try {
      const response = await fetch(URL, {
        method: requestOptions?.method ?? "GET",
        ...requestOptions,
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const data = (await response.json()) as T;
      setResponseData(data);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else if (typeof e === "string") setError(e);
      else console.log(e);
    } finally {
      setIsAwaiting(false);
    }
  }, [URL, requestOptions]);

  return {
    data: responseData,
    isAwaiting,
    error,
    sendRequest,
  };
};

export default useHttp;
