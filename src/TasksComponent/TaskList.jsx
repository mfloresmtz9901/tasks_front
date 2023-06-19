import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import Task from "./Task";

const TaskList = (props) => {
  const [tasks, setTasks] = useState("");
  const [formError, setFormError] = useState();

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
    const res = await response.json();
    if (res.ok) {
      retrieveTasks();
    } else {
      if (res.message.includes("description")) {
        setFormError(
          "Ohh, looks like you forgot to fill the description field!"
        );
      } else {
        setFormError("Ohh, looks like you forgot to fill the title field!");
      }
    }
  }

  async function retrieveTasks() {
    const response = await fetch(
      `http://127.0.0.1:5050/tasks/get-all/${props.user_id}`
    ).catch((err) => {
      console.log(err);
    });
    const data = await response.json();
    console.log(data);
    setTasks(data);
  }

  async function removeTask(id) {
    const response = await fetch(`http://127.0.0.1:5050/tasks/delete/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      console.log(err);
    });
    await response.json();
    retrieveTasks();
  }

  const removeErrorMessageHandler = () => {
    setFormError();
  };

  useEffect(() => {
    retrieveTasks();
  }, []);

  return (
    <div>
      <NewTask onSaveTaskData={taskListSaveTask} />
      {formError && (
        <div className="alert alert-warning alert-dismissible fade show mt-3">
          {formError}
          <button
            className="btn-close float-right"
            onClick={removeErrorMessageHandler}
          ></button>
        </div>
      )}

      {}
      {tasks && (
        <div className="mt-4">
          <ol className="list-group">
            {tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
                onRemoveTask={removeTask}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default TaskList;
