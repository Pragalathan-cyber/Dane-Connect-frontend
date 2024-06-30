import React, { useState } from 'react';
import axios from 'axios';
import Sidenav from '../components/Sidenav';
import { useNavigate } from 'react-router-dom';

const AddPosts = ({ token }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSavePost = async (e) => {
    e.preventDefault();

    // Check if content field is filled
    if (!content) {
      setError('Please fill the content field!');
      return;
    }

    try {
      // Send POST request to backend API
      const response = await axios.post('https://your-backend-api/posts', { content }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Post created:', response.data);
      // Optionally, you can update state or perform other actions after successful post creation

      // Clear form field after successful submission
      setContent('');
      navigate('/'); // Navigate to home or another page after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="flex">
      <Sidenav /> {/* Assuming Sidenav is your sidebar component */}
      <div className="w-full">
        <p className='my-2 mx-4 font-bold text-xl'>Create Post</p>
        <form className='flex relative mt-20 flex-col gap-y-20 w-3/4 mx-auto border p-4 rounded-xl h-[400px]' onSubmit={handleSavePost}>
          {error && <p className='text-red-600 absolute top-[-2rem] left-[10rem]'>{error}</p>}
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Type Something...' className='input border-b bg-transparent p-1 my-1 rounded' name="content" id="content" />

          <button className='mt-10 text-blue-400 border border-white rounded-md mx-auto p-1 w-2/4' type='submit'>Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPosts;
