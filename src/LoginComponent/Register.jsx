import { useState } from "react";

import "./styles.css";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const toggleLoginFormHandler = () => {
    props.onFormSwitch("login");
  };

  async function submitHandler(event) {
    event.preventDefault();
    const body = {
      username: name,
      email: email,
      password: password,
    };
    const response = await fetch("http://127.0.0.1:5050/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.log(err);
    });
    const data = await response.json();
    if (response.status === 200) {
      props.onSetCookie(data);
    } else {
      console.log(data);
      if (data.message.includes("email")) {
        data.message = "Looks like this emails is already in use!";
      } else if (data.message.includes("username")) {
        data.message = "Looks like this username is already in use!";
      }
      props.onError(data);
    }
  }

  return (
    <div className="card mx-auto">
      <div className="card-body">
        <form className="pb-3" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <button className="btn btn-danger" onClick={toggleLoginFormHandler}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};

export default Register;
