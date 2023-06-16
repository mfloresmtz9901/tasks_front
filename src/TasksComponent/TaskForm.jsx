import { useState } from "react";

const TaskForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const stopEditingHandler = () => {
    props.stopEditing();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      title: enteredTitle,
      description: enteredDescription,
      status: "pending",
    };

    setEnteredTitle("");
    setEnteredDescription("");
    props.stopEditing();
    props.onSaveTask(data);
  };

  return (
    <div>
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

        <button className="btn btn-primary">Submit</button>
      </form>
      <button className="btn btn-danger mt-3" onClick={stopEditingHandler}>
        Cancel
      </button>
    </div>
  );
};

export default TaskForm;
