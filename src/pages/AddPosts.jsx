import React, { useState } from 'react';
import axios from 'axios';
import Sidenav from '../components/Sidenav';
import { useNavigate } from 'react-router-dom';

const AddPosts = ({ token, onAdd }) => {
  const [postImg, setPostImg] = useState(null);
  const [postDesc, setPostDesc] = useState('');
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const handleSavePost = async (e) => {
    e.preventDefault();
    if(!postImg || !postDesc){
        setError('Please fill all fileds!!')
        return
    }
    try {
      const formData = new FormData();
      formData.append('image', postImg);
      formData.append('content', postDesc);

      const response = await axios.post('http://localhost:7000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // Replace 'http://localhost:5000/api/posts' with your actual backend API endpoint
     // const response = await axios.post('http://localhost:7000/posts', formData, config);

      console.log('Post created:', response.data);
      // Optionally, you can call `onAdd` to update state or perform other actions after successful post creation

      // Clear form fields after successful submission
      setPostImg(null);
      setPostDesc('');
      navigate('/')
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error, show error message to user, etc.
    }
  };

  const handleFileChange = (e) => {
    setPostImg(e.target.files[0]);
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="w-full ">

        <p className='my-2 mx-4 font-bold text-xl'>Post :</p>
        <form className='flex relative mt-20 flex-col gap-y-20 w-3/4 mx-auto  border p-4 rounded-xl h-[400px]' onSubmit={handleSavePost}>
          {error && <p className='text-red-600 top-[-2rem] left-[10rem] absolute'>{error}</p>}
          <input type="file" name="image" id="image" onChange={handleFileChange} />
          <input type="text" value={postDesc} onChange={(e) => setPostDesc(e.target.value)} placeholder='Type Something...' className='input border-b bg-transparent p-1 my-1 rounded' name="task" id="task" />

          <button className='mt-10 text-blue-400 border border-white rounded-md mx-auto p-1 w-2/4' type='submit'>Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPosts;
