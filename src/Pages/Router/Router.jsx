import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage'; 
import Profile from '../Profile/Profile';
import './Router.css';
import Messenger from '../Messenger/Messenger';
import ProfileTag from '../../Components/ProfileComponents/ProfileTag'
import ProfilePost from '../../Components/ProfileComponents/ProfilePost'
import ProfileImages from '../../Components/ProfileComponents/ProfileImages'
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
            <Route path="tag" element={<ProfileTag />} />
          </Route>
          <Route path='messenger' element={<Messenger/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
