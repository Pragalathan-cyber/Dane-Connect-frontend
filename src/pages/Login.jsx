import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEyeOff, IoIosEye } from "react-icons/io"; // Import icons

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('https://dane-test-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLogin(data.token);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
      //console.error('Login failed:', error);
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center h-[98vh]'>
      <div className='border border-white w-[390px] mx-auto rounded-lg px-5 py-24'>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-y-14'>
            <input
              type="text"
              placeholder='Email...'
              className='input border-b-2 rounded py-1 px-2 bg-gray-900'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password...'
                className='input border-b-2 rounded py-1 px-2 bg-gray-900'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IoIosEyeOff
                className='absolute top-1/2 right-3 cursor-pointer hover:text-black'
                onClick={toggleShowPassword}
                style={showPassword ? { display: 'none' } : {}} // Hide EyeOff when showPassword is true
              />
              <IoIosEye
                className='absolute top-1/2 right-3 cursor-pointer hover:text-black'
                onClick={toggleShowPassword}
                style={showPassword ? {} : { display: 'none' }} // Show Eye when showPassword is true
              />
            </div>

            <button className='border border-white rounded p-1 hover:text-black hover:bg-white'>
              {loading ? 'Logging in' : 'Log in'}
            </button>
          </div>
        </form>

        <Link to='/signup'>
          <p className='text-gray-500 text-center mt-8'>
            Don't have an account ? <span className='text-white cursor-pointer'>Sign Up</span>
          </p>
        </Link>

        <Link to='/forgotpassword'>
          <button className='text-center mt-4 text-gray-500 cursor-pointer w-full hover:text-white'>
            Forgot Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
