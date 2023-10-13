import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Profile from '../Profile/Profile';
import './Router.css';
import Messenger from '../Messenger/Messenger';
import ProfileTag from '../../Components/ProfileComponents/ProfileTag'
import ProfilePost from '../../Components/ProfileComponents/ProfilePost'
import ProfileImages from '../../Components/ProfileComponents/ProfileImages'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
const App = () => {
    const location = useLocation();
    const userDataJSON = localStorage.getItem('userData');
    let userName = null;
    if (userDataJSON) {
        // Parse dữ liệu JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);
        if (userData.userName != null)
            userName = userData.userName;
    }
    return (
        <div className="">
        {(location.pathname !== "/signup" && location.pathname !== "/signin") && (userName != null) ?
        <div className='flex'>
            <div className="side">
                <Sidebar />
            </div>
            <div className="content">
                <Routes>
                    <Route path='/home' element={<HomePage />}/>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/SocialMedia" element={<HomePage />} />
                    <Route path='/profile/' element={<Profile />}>
                        <Route path=":userID" element={<ProfilePost />} />
                        <Route path=":userID/image" element={<ProfileImages />} />
                        <Route path=":userID/tag" element={<ProfileTag />} />
                    </Route>
                    <Route path='messenger' element={<Messenger />} />
                </Routes>
            </div>
        </div> 
    :
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
    }
    </div>
    );
};


export default App;
