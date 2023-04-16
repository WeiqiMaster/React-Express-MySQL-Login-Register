import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../api'

export default function HomePage() {

    // const onClickLogout = () => {
    //     logout();
    // }
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">welcome</h1>
            <Link to="/">
                <button className="primary-button" onClick={logout}>Log out</button>
            </Link>
        </div>
    )
}
