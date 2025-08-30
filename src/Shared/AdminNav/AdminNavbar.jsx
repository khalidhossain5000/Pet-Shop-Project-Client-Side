import React from 'react';
import logo from "../../assets/logo/logo-header.png"
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';
const AdminNavbar = () => {
    const {user}=useAuth()
    const {role}=useRole()
    return (
        <div className='bg-white shadow-md lg:flex items-center justify-between px-9 py-4'>
            <div className=''>
            <div className="flex items-center gap-3">
          <img className="block" src={logo} alt="sdgg" />
          <h2 className="font-secondary text-light-text text-xl lg:text-[26px]">
            Browse<span className="text-light-accent"> 4 </span>Pets
          </h2>
        </div>
            </div>
            <div className='lg:flex items-center gap-3'>
                <img src={user?.photoURL} alt="user-photo" className='w-14 h-14 rounded-full border-light-accent border-2 p-2'/>
                <div className="userinfo ">
                    <h2 className='text-xl text-light-text font-medium font-primary'>{user?.displayName}</h2>
                    <h5 className='text-sm text-light-text/60 font-secondary font-bold'>{role}</h5>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;