import React, { useState, useRef, useEffect } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register, redirectIfUnauthenticated } from '../../services/auth.service'

function Register(props) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

    useEffect(() => {
      redirectIfUnauthenticated(props);
    }, [])
  const form = useRef(null);
  const checkBtn = useRef(null);

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo é Obrigatório
        </div>
      );
    }
  };

  const vEmail = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Email inválido
        </div>
      );
    }
  }

  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          O nome de usuário deve ter no mínimo 3 caractéres e no máximo 20
        </div>
      );
    }
  };

  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          A senha deve ter no mínimo 6 e no máximo 40 characters.
        </div>
      );
    }
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      register(username, email, password)
        .then(response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setSuccessful(false);
            setMessage(resMessage);
          });
    }
  }

  return(
  <div className="col-md-12">
    <div className="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <Form
        onSubmit={handleRegister}
        ref={form}
      >
        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="username">Nome de usuário</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, vEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block"> Cadastrar </button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={checkBtn}
        />
      </Form>
    </div>
  </div>
  )
}

export default Register;