import { useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3003"

const LoginForm = ({onLogin, onError}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send the login request to the backend, store the token if successful
        const response = await axios.post(`${baseUrl}/api/login`, {username, password})
        // console.debug(response);
        if (response.status === 200) {
            onLogin(response.data)
        }
        else {
            onError("Login Failed");
        }
    }
    return (<div>
        <h2>Login to view this page</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={handleChangeUsername} />
            <input type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
            <button type="submit">Login</button>
        </form>
    </div>);
}

export default LoginForm;