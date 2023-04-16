import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, checkIfAlreadyLoggedin } from '../api'
import '../../App.css'

export default function SignInPage() {
    const naviagete = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        checkIfAlreadyLoggedin()
            .then((response) => {
                naviagete("/home");
            })
            .catch((error) => {
                console.error(error.response);
            });
    }, []);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        login({username: username, password: password})
            .then((response) => {
                naviagete("/verify");
            })
            .catch((error) => {
                console.error(error.response);
                alert(error.response.data.message);
            });
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <div className={"form"}>
                <p>
                    <label>Username</label><br/>
                    <input value={username} type="text" name="username" onChange={handleUsername} required />
                </p>
                <p>
                    <label>Password</label>
                    <div></div><Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input value={password} type="password" name="password" onChange={handlePassword} required />
                </p>
                <p>
                    <button id="sub_btn" onClick={handleLogin}>Login</button>
                </p>
            </div>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
