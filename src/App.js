import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Login from "./LoginComponent/Login";
import Navbar from "./NavbarComponent/Navbar";
import Register from "./LoginComponent/Register";
import TaskList from "./TasksComponent/TaskList";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [cookie, setCookie] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cookie) {
      setCookie(Cookies.get("user"));
    }
  }, [cookie]);
  // Login methods
  const setCookieHandler = (data) => {
    setError("");
    setCookie(Cookies.set("user", data._id, { expires: 1 }));
  };

  const removeCookie = () => {
    Cookies.remove("user");
    setCookie();
  };

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const errorHandler = (err) => {
    setError(err);
  };

  return (
    <div className="App">
      {cookie ? (
        <div>
          <Navbar onCloseSession={removeCookie} />
          <div className="container pt-3">
            <TaskList user_id={Cookies.get("user")} />
          </div>
        </div>
      ) : (
        <div className="container pt-5">
          {currentForm === "login" ? (
            <Login
              onFormSwitch={toggleForm}
              onSetCookie={setCookieHandler}
              onError={errorHandler}
            />
          ) : (
            <Register
              onFormSwitch={toggleForm}
              onSetCookie={setCookieHandler}
              onError={errorHandler}
            />
          )}
          {error && (
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <div className="alert alert-danger mt-3">
                  {error["message"]}
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
