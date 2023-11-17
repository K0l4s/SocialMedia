import React from 'react'
import { ProfileUserDetail } from '../../../Components/ProfileComponents/ProfileUserDetail'
import ReqUserPostPart from '../../../Components/ProfileComponents/ReqUserPostPart'
import './Profile.css'
import { Route, Routes } from 'react-router-dom'
import ProfilePost from '../../../Components/ProfileComponents/ProfilePost'
import ProfileImages from '../../../Components/ProfileComponents/ProfileImages'
export const Profile = () => {
    return (
        <div className="items">
            <ProfileUserDetail />
            <ReqUserPostPart />
            <div className="content">
                <Routes>
                    <Route path="/:userID" element={<ProfilePost />} />
                    <Route path=':userID/image' element={<ProfileImages />} />
                </Routes>
            </div>
        </div>
    )
}

export default Profile