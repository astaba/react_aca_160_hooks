import React from "react";
import Section from "../UI/Section.js";
import TaskForm from "./TaskForm.js";
import useFetchTasks from "../../hooks/useFetchTasks.js";

const url = "https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json";

const NewTask = ({ onAddTask }) => {
  const { isLoading, error, handleHttpRequest } = useFetchTasks(url);

  const commitNewTask = async (task) => {
    const data = await handleHttpRequest(task);
    // console.log(data)
    if (data?.name) onAddTask({ id: data.name, text: task });
  };

  return (
    <Section>
      <TaskForm onCommit={commitNewTask} onLoading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
