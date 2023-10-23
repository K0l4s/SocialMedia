import React from 'react'
import './UserLongCard.css'
import { LiaUserPlusSolid } from 'react-icons/lia'
import { Button } from '@chakra-ui/react';
const UserLongCard = ({userData}) => {
    if (!userData) {
        return <p>loading</p>;}
    else
    {
        userData.avatarURL = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    return (
        <div className='user_long_card'>
            <div className="user_long_card_avatar">
                <img src={userData.avatarURL} alt="" />
            </div>
            <div className="user_long_card_info">
                <div className="user_long_card_info_name">
                    <p>{userData.firstName} {userData.lastName}</p>
                </div>
                <div className="user_long_card_info_username">
                    <p>@{userData.userName}</p>
                </div>
            </div>
            <div className="user_long_card_follow">
                <Button className='user_long_card_button'>
                    <LiaUserPlusSolid />
                </Button>
            </div>
        </div>
    )}
}

export default UserLongCard