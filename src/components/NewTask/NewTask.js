import React, { useState } from "react";
import Section from "../UI/Section.js";
import TaskForm from "./TaskForm.js";

const NewTask = ({ onAddTask }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const commitNewTask = async (task) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://custom-hooks-bada2-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify({ text: task }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sorry, request failed!");
      }
      const data = await response.json();
      // console.log(data);
      onAddTask({ id: data.name, text: task });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <TaskForm onCommit={commitNewTask} onLoading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
