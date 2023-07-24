import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (request, processData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error("Sorry, data not found");
      }
      const data = await response.json();
      processData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { indicators: {isLoading, error}, sendRequest};
};

export default useHttp;
