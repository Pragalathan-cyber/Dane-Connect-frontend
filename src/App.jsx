import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddPosts from './pages/AddPosts';
import EditPost from './pages/EditPost';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Aboutus from './pages/Aboutus';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('Danetoken') || null);
  const [posts, setPosts] = useState([]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('Danetoken', newToken);
  };

  return (
    <div>
      <div className='flex'>
        <div className="content w-full md:3/4">
          <Routes>
            <Route path='/' element={token ? (
              <Home token={token} posts={posts} setPosts={setPosts} />
            ) : (
              <Login onLogin={handleLogin} />
            )} />
            <Route path='/addwork' element={<AddPosts token={token} />} />
            <Route path={`/editpost/:id`} element={<EditPost token={token} />} />
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/signup' element={<Signup onSignup={handleLogin} />} />
            <Route path='/aboutus' element={<Aboutus />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
