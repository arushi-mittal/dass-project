import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard(){
    return (
        <div>
            <ul>
            <li className="nav-item">
                <Link to="/admin/profile">
                    Profile
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/records">
                    Records
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/violations">
                    Violations
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/bookmarked">
                    Bookmarked
                </Link>
                </li>
            </ul>
        </div>
    )
}

export default Dashboard