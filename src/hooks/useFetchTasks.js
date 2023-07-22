import { useState, useCallback } from "react";

const useFetchTasks = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = useCallback(async (payload) => {
    setError(null);
    setIsLoading(true);
    try {
      let response;
      if (!payload) {
        response = await fetch(url);
      } else {
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ text: payload }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (!response.ok) {
        throw new Error("Sorry, data not found");
      }
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { isLoading, error, handleHttpRequest: fetchTasks };
};

export default useFetchTasks;
