import { useEffect, useState } from "react";

const EditTask = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredStatus, setEnteredStatus] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setEnteredStatus(event.target.value);
  };

  const stopEditingHandler = () => {
    props.onCancelEdit();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      title: enteredTitle,
      description: enteredDescription,
      status: enteredStatus,
    };
    stopEditingHandler();
    props.onTaskEdit(data);
  };

  async function retrieveTasks() {
    const response = await fetch(
      `http://127.0.0.1:5050/tasks/get/${props.taskId}`
    ).catch((err) => {
      console.log(err);
    });
    const data = await response.json();
    setEnteredTitle(data.title);
    setEnteredDescription(data.description);
    setEnteredStatus(data.status);
    console.log(data);
  }

  useEffect(() => {
    retrieveTasks();
  }, []);

  return (
    <div className="card mx-auto">
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              onChange={titleChangeHandler}
              value={enteredTitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              cols="10"
              rows="3"
              onChange={descriptionChangeHandler}
              value={enteredDescription}
            ></textarea>
          </div>
          <div className="mb-3">
            <select
              value={enteredStatus || "pending"}
              className="form-select"
              onChange={statusChangeHandler}
            >
              <option value="pending">Pending</option>
              <option value="on process">On Process</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
        <button className="btn btn-danger mt-3" onClick={stopEditingHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;
