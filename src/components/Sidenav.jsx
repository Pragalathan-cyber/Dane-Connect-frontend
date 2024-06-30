import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import {RiLogoutBoxFill} from "react-icons/ri"
import axios from 'axios';


const Sidenav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        // Send a POST request to the server to logout
        await axios.post('https://dane-test-backend.vercel.app/logout');
  
        // Remove token from localStorage
        localStorage.removeItem('Danetoken');
  
        // Redirect to the login page
        navigate('/login');
  
        // You might want to reload the page after logout
        // window.location.reload();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <div className='w-1/4 border-r-2  h-[99vh]  relative  hidden  md:block'>

    <ul className='mt-10 grid gap-y-10 '>
      <Link to='/'>
        <li className='flex gap-x-2 py-3 px-2 cursor-pointer border-b rounded-md hover:border-b-2 hover:border-b-black'>
          <CiHome className='text-xl  mt-[2px]' />
          <span>Home</span>
        </li>
      </Link>
      <Link to='/addwork'>
      <li className='flex gap-x-2 py-3 px-2 cursor-pointer border-b rounded-md hover:border-b-2 hover:border-b-black'>
        <CiCirclePlus className='text-2xl mt-[1px] cursor-pointer rounded-full shadow-xl hover:bg-black hover:text-white' />
        <span>Create</span>
      </li>
      </Link>
      <Link to='/aboutus'>
        <li className='flex gap-x-2 py-3 px-2 cursor-pointer border-b rounded-md hover:border-b-2 hover:border-b-black'>
          <MdGroups className='text-xl mt-[2px]' />
          <span>About Us</span>
        </li>
      </Link>
    </ul> 
     <p className='flex absolute bottom-5 w-full gap-x-2 py-3 px-2 cursor-pointer border-b rounded-md hover:border-b-2 hover:border-b-black' onClick={handleLogout}>
        <RiLogoutBoxFill className='text-xl mt-[2px]' />
        <span >Log Out</span>
      </p>
  </div>
  )
}

export default Sidenav
