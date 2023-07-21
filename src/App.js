import React, { Fragment, useState, useEffect, useCallback } from "react";
import NewTask from "./components/NewTask/NewTask.js";
import Tasks from "./components/Tasks/Tasks.js";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json"
      );
      if (!response.ok) {
        throw new Error("Sorry, data not found");
      }
      const data = await response.json();
      let loadedTasks = [];
      for (let key in data) {
        loadedTasks.push({ id: key, text: data[key].text });
      }
      setTasks(loadedTasks);
      // console.log(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={handleAddTask} />
      <Tasks
        onLoading={isLoading}
        error={error}
        tasks={tasks}
        onFetchTasks={fetchTasks}
      />
    </Fragment>
  );
};

export default App;
