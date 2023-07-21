import { useRef } from "react";
import classes from "./TaskForm.module.css";

const TaskForm = ({ onCommit, onLoading }) => {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (inputValue.length > 0) {
      onCommit(inputValue);
      inputRef.current.value = '';
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button>{!onLoading ? "Add task" : "Sending..."}</button>
    </form>
  );
};

export default TaskForm;
