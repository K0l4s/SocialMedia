import React from 'react'
import { ProfileUserDetail } from '../../Components/ProfileComponents/ProfileUserDetail'
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart'
import './Profile.css'
import ProfilePost from './ProfilePost'
import { Route, Routes } from 'react-router-dom'
import ProfileImages from './ProfileImages'
import ProfileVideo from './ProfileVideo'
export const Profile = () => {
    return (
        <div className="items">
            <ProfileUserDetail />
            <hr />
            <ReqUserPostPart />
            <Routes>
                <Route path="/" element={<ProfilePost/>}/>
                <Route path='/image' element={<ProfileImages/>}/>
                <Route path='/video' element={<ProfileVideo/>}/>
            </Routes>
        </div>
    )
}

export default Profile