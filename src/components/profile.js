import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";

function Profile() {

    const [redirect, setRedirect] = useState(null);
    const [userReady, setUserReady] = useState(false);
    const [currentUser, setCurrenUser] = useState({ username: false });

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (!currentUser) setRedirect({ redirect: "/login" });
        setCurrenUser(currentUser);
        setUserReady(true);
    }, []);

    return (
        <div className="container">
            {redirect && (
                <Redirect to={redirect} />
            )}
            {(userReady) ?
                <div>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </div> : null}
        </div>
    )
}

export default Profile;