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
                        <a href="/admin/admin_image_puzzles">
                            <p>Image Puzzle</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin/admin_tournaments">
                            <p>Tournaments</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin/admin_news">
                            <p>News</p>
                        </a>
                    </li>
                    <li className="menuItem">
                        <a href="/admin/StudentDetails">
                            <p>Student Details</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AdminHeader;
