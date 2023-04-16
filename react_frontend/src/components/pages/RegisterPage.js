import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'
import '../../App.css'

export default function SignUpPage() {
    const naviagete = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const handleRegister = () => {
        register({username: username, email: email, password: password}).then((resp) => {
            if (resp) {
                naviagete("/login");
            } else {
                alert("username or email already exists");
            }
        });
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <div className="form">
                <p>
                    <label>Username</label><br/>
                    <input value={username} type="text" name="username" onChange={handleUsername} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input value={email} type="email" name="email" onChange={handleEmail} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input value={password} type="password" name="password" onChange={handlePassword} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" onClick={handleRegister}>Register</button>
                </p>
            </div>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
