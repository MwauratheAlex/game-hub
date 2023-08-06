import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

  
interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const contoller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, { signal: contoller.signal })
        .then((res) => {
          setData(res.data.results)
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

    return () => contoller.abort();
    }, []);

    return {data, error, loading};
}

export default useData;