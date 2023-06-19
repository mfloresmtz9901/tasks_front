import { useState } from "react";

const Task = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const startDeletingHandler = () => {
    setIsDeleting(true);
  };

  const stopDeletingHandler = () => {
    setIsDeleting(false);
  };

  const removeTaskHandler = () => {
    props.onRemoveTask(props.id);
  };

  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{props.title.toUpperCase()}</div>
          {props.description}
        </div>

        <button className="ms-2 btn btn-warning">Edit</button>
        <button onClick={startDeletingHandler} className="ms-2 btn btn-danger">
          Delete
        </button>

        <span className="badge bg-primary ms-5 align-middle">
          {props.status.toUpperCase()}
        </span>
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
    </>
  );
};

export default Task;
