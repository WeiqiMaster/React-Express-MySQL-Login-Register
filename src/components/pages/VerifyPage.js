import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { verify } from '../api'
import '../../App.css'

export default function VerifyPage() {
    const naviagete = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");

    const handleVerificationCode = (event) => {
        setVerificationCode(event.target.value);
    }

    const handleVerify = () => {
        verify({verificationCode: verificationCode})
            .then((response) => {
                naviagete("/home");
            })
            .catch((error) => {
                console.error(error.response);
                alert(error.response.data.message);
            });
            // if (resp.status)
            // if (resp.data.message) {
            //     alert(resp.message);
            // } else {
            //     naviagete("/home");
            // }
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Verification Code has been sent to your email</h2>
            <div className="form">
                <p>
                    <label>Verification Code</label><br/>
                    <input value={verificationCode} type="text" name="verificationCode" onChange={handleVerificationCode} required />
                </p>
                <p>
                    <button id="sub_btn" onClick={handleVerify}>Submit</button>
                </p>
            </div>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
