import classes from "./Tasks.module.css";
import TaskItem from "./TaskItem.js";
import Section from "../UI/Section.js";

const Tasks = ({ error, tasks, onFetchTasks, onLoading }) => {
  const switcher = (() => {
    if (onLoading) return "LOADING_UI";
    else if (error) return "TRY_AGAIN";
    else if (tasks.length > 0) return "TASK_LIST";
    return "DEFAULT_UI";
  })();

  return (
    <Section>
      <div className={classes.container}>
        {
          {
            DEFAULT_UI: <h2>No task found. Start adding some!</h2>,
            LOADING_UI: "Loading tasks...",
            TRY_AGAIN: <button onClick={onFetchTasks}>Try again</button>,
            TASK_LIST: (
              <ul>
                {tasks.map((item) => (
                  <TaskItem key={item.id} text={item.text} />
                ))}
              </ul>
            ),
          }[switcher]
        }
      </div>
    </Section>
  );
};

export default Tasks;
