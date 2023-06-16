import { useState } from "react";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const newTaskSaveTask = (data) => {
    props.onSaveTaskData(data);
  };

  return (
    <div>
      <div className="card mx-auto text-bg-light">
        <div className="card-body">
          {!isEditing && (
            <button className="btn btn-primary" onClick={startEditingHandler}>
              Add New Task
            </button>
          )}
          {isEditing && (
            <TaskForm
              stopEditing={stopEditingHandler}
              onSaveTask={newTaskSaveTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewTask;
