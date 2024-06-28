import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [token,setToken] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const tokenFromUrl = location.pathname.split('/').pop();
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
    
  }, [location.search]); 

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the token state or directly extract it from URL as needed
      // const token = tokenState;
      const response = await axios.post('http://localhost:7000/reset-password', { token, newPassword: password });
      setSuccessMessage(response.data.message);
      setError('');
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Network Error. Please try again.');
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-[98vh]'>
      <div className='border border-white w-[390px] mx-auto rounded-lg px-5 py-24'>

        {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-14'>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='New Password...'
                className='input border-b-2 rounded py-1 px-2 bg-gray-900'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IoIosEyeOff
                className='absolute top-1/2 right-3 cursor-pointer'
                onClick={toggleShowPassword}
                style={showPassword ? { display: 'none' } : {}}
              />
              <FaEye
                className='absolute top-1/2 right-3 cursor-pointer'
                onClick={toggleShowPassword}
                style={showPassword ? {} : { display: 'none' }}
              />
            </div>

            <button type="submit" className='border border-white rounded p-1 hover:text-black hover:bg-white'>
              Submit
            </button>

          </div>
        </form>

        <Link to='/login'>
          <p className='text-gray-500 text-center mt-8'>
            Remember your password?{' '}
            <span className='text-white cursor-pointer'>Log in</span>
          </p>
        </Link>

      </div>
    </div>
  );
};

export default ResetPassword;
