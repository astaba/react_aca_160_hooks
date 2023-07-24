import React, { Fragment, useState, useEffect, useCallback } from "react";
import NewTask from "./components/NewTask/NewTask.js";
import Tasks from "./components/Tasks/Tasks.js";
import useHttp from "./hooks/useHttp.js";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const {
    indicators: { isLoading, error },
    sendRequest: fetchTasks,
  } = useHttp();

  const request = new Request("https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json");
  const buildTasks = (data) => {
    let loadedTasks = [];
    for (let key in data) {
      loadedTasks.push({ id: key, text: data[key].text });
    }
    setTasks(loadedTasks);
    // console.log(loadedTasks);
  };
  const fetchTasksBound = useCallback(
    fetchTasks.bind(null, request, buildTasks),
    [fetchTasks]
  );

  useEffect(() => {
    fetchTasksBound();
  }, [fetchTasksBound]);

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
        onFetchTasks={fetchTasksBound}
      />
    </Fragment>
  );
};

export default App;
