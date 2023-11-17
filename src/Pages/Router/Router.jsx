import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './Router.css';
import HomePage from '../Client/HomePage/HomePage';
import Profile from '../Client/Profile/Profile';
import ProfilePost from '../../Components/ProfileComponents/ProfilePost';
import ProfileImages from '../../Components/ProfileComponents/ProfileImages';
import PostPage from '../Client/PostPage/PostPage';
import Search from '../Client/Search/Search';
import Explore from '../Client/PhotosNetwork/PhotosNetwork';
import ResetPassword from '../Client/Password/ResetPassword';
import ChangeInfoUser from '../Client/ChangeInfoUser/ChangeInfoUser';
import AddLocation from '../Client/AddLocation/AddLocation';
import Login from '../Client/Login/Login';
import Signup from '../Client/Signup/Signup';
import Sidebar from '../../Components/Sidebar/Sidebar';
import NotFoundPages from '../404Pages/NotFoundPages';
const App = () => {
    
    const userDataJSON = localStorage.getItem('userData');
    let userName = null;
    if (userDataJSON) {
        // Parse dữ liệu JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);
        if (userData.userName != null)
            userName = userData.userName;
    }
    const location = useLocation();
    return (
        (location.pathname !== "/signup" && location.pathname !== "/signin") ? 
                (<div className='flex'>
                    <div className="side">
                        <Sidebar />
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path='/home' element={<HomePage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/SocialMedia" element={<HomePage />} />
                            <Route path='/profile/' element={<Profile />}>
                                <Route path=":userID" element={<ProfilePost />} />
                                <Route path=":userID/image" element={<ProfileImages />} />
                            </Route>
                            <Route path='/post/:postID' element={<PostPage />} />
                            <Route path='search' element={<Search />} />
                            <Route path='explore' element={<Explore />} />
                            <Route path="resetpass" element={<ResetPassword />} />
                            <Route path='changeinfo' element={<ChangeInfoUser />} />
                            <Route path='addlocation' element={<AddLocation />} />
                            {/* Đặt Route cho trang 404 cuối cùng để nó hoạt động khi không có Route nào khớp */}
                            <Route path="*" element={<NotFoundPages />} />
                        </Routes>
                    </div>
                </div>)
             : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>)
            
    );
};



export default App;


