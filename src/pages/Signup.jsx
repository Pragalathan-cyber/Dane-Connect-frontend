import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEyeOff, IoIosEye } from "react-icons/io"; // Import icons

const Signup = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [registerMsg, setRegisterMsg] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Password mismatch!!');
      return;
    }
    try {
      setLoading(true); // Start loading
      const response = await fetch('https://dane-connect-backend-klbokb7z5-pragalathan-cybers-projects.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setRegisterMsg(true);
        
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
     // console.error('Signup failed:', error);
      setError('An error occurred while signing up. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='flex relative items-center justify-center h-[98vh] '>
      {registerMsg && <p className='absolute bg-blue-600 top-14 py-1 px-2 rounded'>User registered!! Login to continue.</p>}
      <div className='border px-6 py-20 rounded-lg'>
        <div className='flex  w-[390px] mx-auto flex-col gap-y-16 '>

          <input
            type="text"
            placeholder='Email...'
            autoFocus
            className='input border-b-2 rounded p-1 bg-gray-900'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder='Username...'
            autoFocus
            className='input border-b-2 rounded p-1 bg-gray-900'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password...'
              className='input border-b-2 rounded p-1 bg-gray-900'
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

          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password...'
              className='input border-b-2 rounded p-1 bg-gray-900'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <IoIosEyeOff
              className='absolute top-1/2 right-3 cursor-pointer hover:text-black'
              onClick={toggleShowConfirmPassword}
              style={showConfirmPassword ? { display: 'none' } : {}} // Hide EyeOff when showConfirmPassword is true
            />
            <IoIosEye
              className='absolute top-1/2 right-3 cursor-pointer hover:text-black'
              onClick={toggleShowConfirmPassword}
              style={showConfirmPassword ? {} : { display: 'none' }} // Show Eye when showConfirmPassword is true
            />
          </div>

          <button  className='border border-white rounded p-1 hover:bg-white hover:text-black' onClick={e => handleSignup(e)}>
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
          {error && <p className='text-red-600 text-center relative bottom-[48px]'>{error}</p>}

        </div>
        <Link to='/login'>
          <p className='text-gray-500 text-center mt-8'>
            Already have an account ? <span style={registerMsg ?  {backgroundColor:'blue'} : {}} className='text-white p-1 rounded cursor-pointer'>Log in</span>
          </p>
        </Link>
       
      </div>
    </div>
  );
};

export default Signup;
