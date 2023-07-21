import classes from "./Tasks.module.css";
import TaskItem from "./TaskItem.js";
import Section from "../UI/Section.js";

const Tasks = ({ error, tasks, onFetchTasks, onLoading }) => {
  const SWITCHER = (() => {
    if (onLoading) return "LOADING";
    else if (error) return "TRY_AGAIN";
    else if (tasks.length > 0) return "TASK_LIST";
    return "DEFAULT";
  })();

  return (
    <Section>
      <div className={classes.container}>
        {
          {
            DEFAULT: <h2>No task found. Start adding some!</h2>,
            LOADING: "Loading tasks...",
            TRY_AGAIN: <button onClick={onFetchTasks}>Try again</button>,
            TASK_LIST: (
              <ul>
                {tasks.map((item) => (
                  <TaskItem key={item.id} text={item.text} />
                ))}
              </ul>
            ),
          }[SWITCHER]
        }
      </div>
    </Section>
  );
};

export default Tasks;
