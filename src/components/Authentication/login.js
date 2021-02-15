import React, { useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login as loginFunction } from '../../services/auth.service'

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const checkBtn = useRef([]);
    const form = useRef(null);
    
    const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    O campo é obrigatório
                </div>
            );
        }
    };
    
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
            loginFunction(username, password).then(
                () => {
                    props.history.push("/houses");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                    setLoading(false);
                    setMessage(resMessage)
                }
            );
        } else {
            setLoading(false);
        }
    }
    
    
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleLogin}
                    ref={form}
                >
                    <div className="form-group">
                        <label htmlFor="username"> Nome de usuário </label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha </label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
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
        );
}

export default Login;