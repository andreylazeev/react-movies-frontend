import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string, options: object) => {
  const [response, setResponse] = useState<T | any>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async() => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
      setIsLoading(false)
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  return { response, error, fetchData, isLoading };
}