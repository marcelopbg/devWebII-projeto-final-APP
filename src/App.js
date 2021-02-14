import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { logout as logoutFunction, getCurrentUser } from "./services/auth.service";
import  Register from './components/Authentication/register'
import  Login from './components/Authentication/login'

const home = () => (<h1> teste </h1>);

const logout = () => {
  logoutFunction();
}

function App() {

  const [showModeratorBoard, setshowModeratorBoard] = useState(false);
  const [showAdminBoard, setshowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setshowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setshowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Gerenciador de Aluguéis
      </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
          </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
            </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
            </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
            </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
            </a>
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
            </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
            </Link>
              </li>
            </div>
          )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={home} />
          <Route path="/user" component={() => {return (<h1>user</h1>)}} />
          <Route path="/mod" component={() => {return (<h1>mod</h1>)}} />
          <Route path="/admin" component={() => {return (<h1>admin</h1>)}} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
