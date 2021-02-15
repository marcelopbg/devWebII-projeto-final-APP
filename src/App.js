import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import { logout as logoutFunction, getCurrentUser } from "./services/auth.service";
import Register from './components/Authentication/register'
import Login from './components/Authentication/login'
import CorretorTest from './components/CorretorTest'
// import Profile from './components/profile'

function App(props) {

  
const logout = () => {
  logoutFunction();
}

  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showAdminBoard, setshowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.roles.includes("ROLE_CORRETOR"));
      setshowAdminBoard(user.roles.includes("ROLE_ADMINISTRADOR"));
    }

  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Gerenciador de Aluguéis
      </Link>
        <div className="navbar-nav mr-auto">
          {(showUserBoard || showAdminBoard) && (

            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Tela do Corretor
            </Link>
            </li>
          )}
        </div>
        <div className="navbar-nav ml-auto">
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Cadastrar Corretor
            </Link>
            </li>
          )}
          {currentUser ? (
            <React.Fragment>
              {/* <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li> */}
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
                  Deslogar
                </a>
              </li>
            </React.Fragment>
          ) : ""}
          {!currentUser && (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          )}
        </div>

      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                currentUser ?
                  <Redirect to="/user" /> :
                  <Redirect to="/login" />
              )
            }}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/user" component={CorretorTest} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
