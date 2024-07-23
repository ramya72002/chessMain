"use client"
import React from 'react';
 import './AdminHeader.scss'; // Import SCSS directly

const AdminHeader= () => {
    return (
        <header className="adminHeader">
            <nav>
                <ul className="menu">
                    <li className="menuItem">
                        <a href="/admin">
                            <p>Sessions</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin_assignments">
                            <p>Assignments</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin_score">
                            <p>Score</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin_tournaments">
                            <p>Tournaments</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin_news">
                            <p>News</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AdminHeader;
