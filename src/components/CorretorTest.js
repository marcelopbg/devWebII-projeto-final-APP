import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth.header';
import axios from 'axios';

function CorretorTest() {
    const [content, setContent] = useState(null);


    useEffect(() => {
    axios("http://localhost:8080/api/test/user", { headers: authHeader() }).then(response => {
            setContent(response.data);
        })
    }, []);

    return (
    <div>
        <h1> teste </h1>
        {content && (
            <div>
                {content}
            </div>
        )}
    </div>
    );
}

export default CorretorTest;