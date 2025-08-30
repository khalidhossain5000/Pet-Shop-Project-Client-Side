import React from 'react';
import { Outlet } from 'react-router';
import AdminNavbar from '../../Shared/AdminNav/AdminNavbar';

const AdminDashboard = () => {
    return (
        <div className='bg-light-secondary'>
            <header>
                <AdminNavbar></AdminNavbar>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminDashboard;