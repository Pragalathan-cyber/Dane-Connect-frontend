import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidenav from '../components/Sidenav';

const EditPost = ({ token }) => {
  const { id } = useParams();
  const [postDesc, setPostDesc] = useState('');
  const [postImg, setPostImg] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { content, imageUrl } = response.data; // Assuming API response directly provides content and imageUrl
      setPostDesc(content); // Set post description from fetched data
      setPostImg(imageUrl); // Set post image URL from fetched data if needed
    } catch (error) {
      console.error('Error fetching post details:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7000/posts/${id}`, {
        content: postDesc,
        imageUrl: postImg
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message);
      // Redirect or show success message after update
      navigate('/')
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="w-full">
        <p className="my-2 mx-4 font-bold text-xl">Edit Post:</p>
        <form
          className="flex relative flex-col gap-y-20 w-3/4 mx-auto mt-20 border p-4 rounded-xl h-[400px]"
          onSubmit={handleSavePost}
        >
          <input
            type="text"
            value={postDesc} // Bind input value to postDesc state
            onChange={(e) => setPostDesc(e.target.value)}
            placeholder="Type Something..."
            className="input mt-4 border-b bg-transparent p-1 my-1 rounded"
            name="postDesc"
            id="postDesc"
          />

          {/* Add input field for image upload/edit if needed */}
          {/* <input
            type="file"
            onChange={(e) => setPostImg(e.target.files[0])}
            className="input mt-4 border-b bg-transparent p-1 my-1 rounded"
            name="postImg"
            id="postImg"
          /> */}

          <button
            className="mt-10 text-blue-400 border border-white rounded-md mx-auto p-1 w-2/4"
            type="submit"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
