import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('Danetoken') || null);
  const [clickedPostIndex, setClickedPostIndex] = useState(-1);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentsKey, setCommentsKey] = useState(0);
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts initially when component mounts

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://dane-test-backend.vercel.app/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const reversedPosts = response.data.reverse(); // Reverse the order of posts
      setPosts(reversedPosts); // Set posts state

      const likedPostsResponse = await axios.get('https://dane-connect.vercel.app/posts/liked', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const likedPostIds = likedPostsResponse.data.map(post => post._id);
      setLikedPosts(likedPostIds);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `https://dane-connect.vercel.app/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data.message); // Log success message
      fetchPosts(); // Refetch posts after liking/unliking
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleDelete = async (postId, index) => {
    try {
      const response = await axios.delete(`https://dane-connect.vercel.app/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message); // Log success message
      fetchPosts(); // Refetch posts after deletion
      setClickedPostIndex(-1); // Close the three dots menu
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleClick = (index) => {
    if (clickedPostIndex === index) {
      setClickedPostIndex(-1); // Toggle off if already clicked
    } else {
      setClickedPostIndex(index); // Set index of clicked post
    }
  };

  const handleCommentTextChange = (postId, text) => {
    setCommentTexts({
      ...commentTexts,
      [postId]: text
    });
  };

  const handleAddComment = async (postId) => {
    try {
      const response = await axios.post(
        `https://dane-connect.vercel.app/posts/${postId}/comments`,
        { text: commentTexts[postId] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log(response.data.message); // Log success message
  
      // Update the local comments state for the specific post
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, comments: [...post.comments, response.data.comment] } : post )
      );
  
      setCommentTexts({
        ...commentTexts,
        [postId]: '' // Clear comment text input for the specific post
      });
  
      // Trigger fetchComments in PostComments component by updating key
      setCommentsKey(prevKey => prevKey + 1);
  
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error, show error message, etc.
    }
  };
  

  return (
    <div>
      {posts.map((post, index) => (
        <div key={post._id} className="post w-full flex justify-center mt-10">
          <div className="w-[400px] h-[620px] lg:flex lg:w-[80%] lg:h-[510px] lg:gap-x-3 lg:relative">
            <div>
              <div>
                <div className="profile relative flex mb-3 justify-between">
                  <div className="flex gap-x-2">
                    <img src="/logoDane.jpg" className="h-[30px]" alt="" />
                    <p>{post.username}</p> {/* Display username */}
                  </div>
                  <BsThreeDots
                    onClick={() => handleClick(index)}
                    className="cursor-pointer text-xl mr-1"
                  />
                  {clickedPostIndex === index && (
                    <ul className="absolute right-0 top-4 p-3 flex flex-col gap-y-2 bg-black">
                      <Link to={`/editpost/${post._id}`}>
                        <li className="cursor-pointer">Edit</li>
                      </Link>
                      <li className="cursor-pointer" onClick={() => handleDelete(post._id, index)}>Delete</li>
                    </ul>
                  )}
                </div>
  
                {post.imageUrl ? (
                  <img className="lg:w-[600px]" src={`http://localhost:7000${post.imageUrl}`} alt="Post" />
                ) : (
                  <p className="text-center text-gray-500">No image available</p>
                )}
              </div>
              <div className="likes-comment my-2 flex gap-x-4 ml-1">
                {/* Toggle heart icon based on whether post is liked */}
                {likedPosts.includes(post._id) ? (
                  <FaHeart
                    className="text-2xl cursor-pointer text-red-500 hover:text-red-800"
                    onClick={() => handleLike(post._id)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-2xl cursor-pointer hover:text-gray-800"
                    onClick={() => handleLike(post._id)}
                  />
                )}
                <FaRegComment className="text-2xl cursor-pointer hover:text-gray-800" />
              </div>
            </div>
  
            <div className="">
              <p className="lg:border-b lg:pb-2">
                {post.content}
              </p>
              <div className="hidden lg:block">
                <PostComments key={commentsKey} username={post.username} postId={post._id} />
              </div>
              <p className="text-gray-500 cursor-pointer ml-1 hover:text-gray-400 lg:hidden">
                View comments
              </p>
              <div className="relative lg:absolute lg:bottom-20">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentTexts[post._id] || ''}
                  onChange={(e) => handleCommentTextChange(post._id, e.target.value)}
                  className="input-post border-b pb-4 mt-1 bg-transparent w-full lg:w-[400px] px-1"
                />
                <button
                  onClick={() => handleAddComment(post._id)} // Pass postId to handleAddComment
                  className="text-blue-600 font-bold absolute right-1 cursor-pointer bg-black p-1 pl-2 hover:text-blue-400"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
