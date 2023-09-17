import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage'; 
import Profile from '../Profile/Profile';
import './Router.css';
import ProfileImages from '../Profile/ProfileImages';
import ProfileVideo from '../Profile/ProfileVideo';
import ProfilePost from '../Profile/ProfilePost';
const App = () => {
  return (
    <div className='flex'> 
      <div className="side">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/username' element={<Profile/>}>
            <Route path="" element={<ProfilePost />} />
            <Route path="image" element={<ProfileImages />} />
            <Route path="video" element={<ProfileVideo />} />
          </Route>

        </Routes>
      </div>
    </div>
  );
};

export default App;
