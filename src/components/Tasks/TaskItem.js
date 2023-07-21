import classes from "./TaskItem.module.css";

const TaskItem = ({ text }) => {
  return <li className={classes.task}>{text}</li>;
};

export default TaskItem;
