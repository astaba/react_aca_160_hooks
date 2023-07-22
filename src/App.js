import React, { Fragment, useState, useEffect, useCallback } from "react";
import NewTask from "./components/NewTask/NewTask.js";
import Tasks from "./components/Tasks/Tasks.js";
import useFetchTasks from "./hooks/useFetchTasks.js";

const url = "https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json";

const App = () => {
  const { isLoading, error, handleHttpRequest } = useFetchTasks(url);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    const data = await handleHttpRequest();
    let loadedTasks = [];
    for (let key in data) {
      loadedTasks.push({ id: key, text: data[key].text });
    }
    setTasks(loadedTasks);
  }, [handleHttpRequest]);

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
