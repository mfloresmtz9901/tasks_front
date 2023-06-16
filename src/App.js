import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";

import Login from "./LoginComponent/Login";
import Navbar from "./NavbarComponent/Navbar";
import Register from "./LoginComponent/Register";
import TaskList from "./TasksComponent/TaskList";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [cookie, setCookie] = useState(Cookies.get("token"));
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState("");
  // Login methods
  const setCookieHandler = (data) => {
    setUserInfo(data);
    setError("");
    setCookie(Cookies.set("token", data._id, { expires: 1 }));
  };

  const removeCookie = () => {
    setUserInfo("");
    Cookies.remove("token");
    setCookie();
  };

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const errorHandler = (err) => {
    console.log(err);
    setError(err);
  };

  return (
    <div className="App">
      {cookie ? (
        <div>
          <Navbar onCloseSession={removeCookie} />
          <div className="container pt-3">
            <TaskList user={userInfo} />
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
