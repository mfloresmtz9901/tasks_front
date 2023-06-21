import { useState } from "react";

import EditTask from "./EditTask";
import TaskDate from "./TaskDate";

const Task = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const startDeletingHandler = () => {
    setIsDeleting(true);
  };

  const stopDeletingHandler = () => {
    setIsDeleting(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const removeTaskHandler = () => {
    props.onRemoveTask(props.id);
  };

  const onTaskEditing = (data) => {
    data = { ...data, id: props.id };
    props.onEditTask(data);
  };

  return (
    <>
      <li className="list-group-item  justify-content-between align-items-start">
        <div className="row">
          <div className="col-8">
            <div className="ms-2 me-auto text-start text-break">
              <div className="fw-bold">{props.title.toUpperCase()}</div>
              {props.description}
              <TaskDate date={props.date} />
            </div>
          </div>

          <div className="col-2">
            <button
              className="ms-2 btn btn-warning"
              onClick={startEditingHandler}
            >
              Edit
            </button>
            <button
              onClick={startDeletingHandler}
              className="ms-2 btn btn-danger"
            >
              Delete
            </button>
          </div>

          <div className="col-2">
            <span className="badge bg-primary ms-5 align-middle">
              {props.status.toUpperCase()}
            </span>
          </div>
        </div>
      </li>
      {isDeleting && (
        <li className="list-group-item">
          <div className="card mx-auto">
            <div className="card-body">
              <p className="fw-bold">Are you sure?</p>
              <button
                className="btn btn-secondary me-2"
                onClick={stopDeletingHandler}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={removeTaskHandler}
              >
                Confirm
              </button>
            </div>
          </div>
        </li>
      )}
      {isEditing && (
        <li className="list-group-item">
          <EditTask
            taskId={props.id}
            onCancelEdit={stopEditingHandler}
            onTaskEdit={onTaskEditing}
          />
        </li>
      )}
    </>
  );
};

export default Task;
