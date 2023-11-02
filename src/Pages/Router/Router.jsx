import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Profile from '../Profile/Profile';
import './Router.css';
import ProfilePost from '../../Components/ProfileComponents/ProfilePost'
import ProfileImages from '../../Components/ProfileComponents/ProfileImages'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Explore from '../PhotosNetwork/PhotosNetwork';
import Search from '../Search/Search';
import ResetPassword from '../Password/ResetPassword';
import ChangeInfoUser from '../ChangeInfoUser/ChangeInfoUser';
import PostPage from '../PostPage/PostPage';
import AddLocation from '../AddLocation/AddLocation';
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
        {(location.pathname !== "/signup" && location.pathname !== "/signin") ?
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
                    </Route>
                    <Route path='/post/:postID' element = {<PostPage/>}/>
                    <Route path='search' element={<Search />} />
                    <Route path='explore' element={<Explore />} />
                    <Route path="resetpass" element={<ResetPassword />} />
                    <Route path='changeinfo' element={<ChangeInfoUser/>}/>
                    <Route path='location' element={<AddLocation/>}/>
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
