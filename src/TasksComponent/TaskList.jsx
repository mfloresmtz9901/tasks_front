import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import Task from "./Task";
import TaskFilter from "./TaskFilter";

const TaskList = (props) => {
  const [tasks, setTasks] = useState("");
  const [filteredTasks, setFilteredTasks] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formMessageStyle, setformMessageStyle] = useState("");
  const [loading, setLoading] = useState(true);

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
    console.log(res);
    if (!res.message) {
      setformMessageStyle("alert-success");
      setFormMessage("Task added succesfully!");
      retrieveTasks();
    } else {
      setformMessageStyle("alert-warning");
      setFormMessage("All the fields are required!");
    }
  }

  async function retrieveTasks() {
    const response = await fetch(
      `http://127.0.0.1:5050/tasks/get-all/${props.user_id}`
    ).catch((err) => {
      console.log(err);
    });
    const data = await response.json();
    const info = data.map((element) => {
      return { date: new Date(element.createdAt), ...element };
    });
    setTasks(info);
    setFilteredTasks(info);
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

  async function editTask(data) {
    const response = await fetch(
      `http://127.0.0.1:5050/tasks/edit/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).catch((err) => {
      console.log(err);
    });
    const res = await response.json();

    if (!res.message) {
      retrieveTasks();
      setformMessageStyle("alert-success");
      setFormMessage("Task updated succesfully!");
    } else {
      setformMessageStyle("alert-warning");
      setFormMessage("All the fields are required!");
      console.log(res.message);
    }
  }

  const removeErrorMessageHandler = () => {
    setFormMessage("");
  };

  const filterTasksHandler = (filters) => {
    let tasksFiltered = tasks;

    if (filters.status !== "all") {
      tasksFiltered = tasksFiltered.filter((item) => {
        return item.status.toLowerCase().indexOf(filters.status) !== -1;
      });
    }

    if (filters.content) {
      tasksFiltered = tasksFiltered.filter((item) => {
        return item.description.toLowerCase().indexOf(filters.content) !== -1;
      });
    }

    if (filters.order === "ascending") {
      setFilteredTasks(() => {
        return [...tasksFiltered.sort((a, b) => a.date - b.date)];
      });
    } else {
      tasksFiltered = tasksFiltered.sort((a, b) => b.date - a.date);
    }

    console.log(tasksFiltered);

    setFilteredTasks(tasksFiltered);
  };

  useEffect(() => {
    retrieveTasks();
    setTimeout(() => {
      setLoading(false);
    }, "500");
  }, []);

  return (
    <div>
      {loading && (
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loading && (
        <div>
          <NewTask onSaveTaskData={taskListSaveTask} />
          {formMessage && (
            <div
              className={`alert alert-dismissible fade show mt-3 ${formMessageStyle}`}
            >
              {formMessage}
              <button
                className="btn-close float-right"
                onClick={removeErrorMessageHandler}
              ></button>
            </div>
          )}

          {}

          {tasks && (
            <div className="mt-4">
              <div className="row">
                <div className="col-2">
                  <TaskFilter onSetFilter={filterTasksHandler} />
                </div>
                <div className="col-10">
                  <ol className="list-group">
                    {filteredTasks.map((task) => (
                      <Task
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        date={task.date}
                        onRemoveTask={removeTask}
                        onEditTask={editTask}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
          {!tasks && (
            <div className="alert alert-info" role="alert">
              Ohh, looks like you don't have any task yet, try adding a new
              one!!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
