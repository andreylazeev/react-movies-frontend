import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string, options: object) => {
  const [response, setResponse] = useState<T | any>(null);
  const [error, setError] = useState(null);

  const fetchData = async() => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [url])
  return { response, error, fetchData };
}