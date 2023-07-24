import React from "react";
import Section from "../UI/Section.js";
import TaskForm from "./TaskForm.js";
import useHttp from "../../hooks/useHttp.js";

const NewTask = ({ onAddTask }) => {
  const {
    indicators: { isLoading, error },
    sendRequest: postTask,
  } = useHttp();

  const commitNewTask = (task) => {
    const request = new Request(
      "https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify({ text: task }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updateTask = (data) => {
      // console.log(data);
      onAddTask({ id: data.name, text: task });
    };
    postTask(request, updateTask);
  };

  return (
    <Section>
      <TaskForm onCommit={commitNewTask} onLoading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
