import { useEffect, useState } from "react";
import NewTask from "./NewTask";

const TaskList = (props) => {
  const [tasks, setTasks] = useState("");

  async function taskListSaveTask(data) {
    data = { user_id: props.user_id, ...data };
    const response = await fetch("http://127.0.0.1:5050/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      console.log(err);
    });

    await response.json();
    retrieveTasks();
  }

  async function retrieveTasks() {
    const response = await fetch(
      `http://127.0.0.1:5050/tasks/get-all/${props.user_id}`
    ).catch((err) => {
      console.log(err);
    });
    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    retrieveTasks();
  });

  return (
    <div>
      <NewTask onSaveTaskData={taskListSaveTask} />
      {tasks && (
        <div className="list-group">
          {tasks.map((task) => (
            <div>{task.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
