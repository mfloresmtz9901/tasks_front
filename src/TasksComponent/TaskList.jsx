import { useState } from "react";
import NewTask from "./TaskForm/NewTask";

const TaskList = (props) => {
  const [tasks, setTasks] = useState("");
  const taskListSaveTask = (data) => {
    //comenzar aqui los requests
  };

  return (
    <div>
      <NewTask onSaveTaskData={taskListSaveTask} />
    </div>
  );
};

export default TaskList;
