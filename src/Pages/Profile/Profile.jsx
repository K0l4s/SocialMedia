import React from 'react'
import { ProfileUserDetail } from '../../Components/ProfileComponents/ProfileUserDetail'
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart'
import './Profile.css'
export const Profile = () => {
    return (
        <div className="items">
            <ProfileUserDetail />
            <hr />
            <ReqUserPostPart />
        </div>
    )
}

export default Profile