import { useState } from "react";

import "./styles.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const toggleRegisterFormHandler = () => {
    props.onFormSwitch("register");
  };

  async function submitHandler(event) {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    const response = await fetch("http://127.0.0.1:5050/users/get-user", {
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
      props.onError(data);
    }
  }

  return (
    <div className="card mx-auto">
      <div className="card-body">
        <form className="pb-3" onSubmit={submitHandler}>
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
        <button className="btn btn-danger" onClick={toggleRegisterFormHandler}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};

export default Login;
