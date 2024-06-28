import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset previous messages
        setMessage('');
        setError('');

        // Validate email
        if (!email) {
            setError('Please fill in the email field.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:7000/forgot-password', { email });
            setMessage('Check your email for password reset instructions.');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Network Error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='border relative border-white w-[390px] mx-auto rounded-lg px-5 mt-40 py-24'>
            {message && <p className='absolute top-2 left-1 bg-blue-600 py-1 px-3 rounded'>{message}</p>}
            {error && <p className='absolute top-1 left-20 text-red-600 py-1 px-3 rounded'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-y-14'>
                    <input
                        type="email"
                        placeholder='Email...'
                        className='input border-b-2 rounded py-1 px-2 bg-gray-900'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className='border border-white rounded p-1 hover:text-black hover:bg-white'>
                        {loading ? 'Loading...' : 'Send OTP'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
