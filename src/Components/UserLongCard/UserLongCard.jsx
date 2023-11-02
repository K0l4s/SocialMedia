import React, { useEffect, useState } from 'react'
import './UserLongCard.css'
import { LiaUserPlusSolid } from 'react-icons/lia'
import { Button, Toast, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { BiSolidUserCheck } from 'react-icons/bi';
const UserLongCard = ({ userData }) => {
    const toast = useToast();
    const [isFollow, setIsFollow] = useState(false)
    const userID = localStorage.getItem("userID")

    useEffect(() => {
        checkExist();
    }, []);
    const checkExist = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/follow/isFollow?followerID='+userID+"&targetID="+userData.userID, requestOptions)
        .then(response => {
            setIsFollow(response.data)
        })
    }
    
    const deleteFollow = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        return axios.delete('http://localhost:8081/follow/delete?followerID='+userID+"&targetID="+userData.userID, requestOptions);
    }
    const unfollowClick = () =>{
        setIsFollow(false);
        deleteFollow()
        .then(toast(
            {
                title: "Unfollowed",
                description: "Huỷ follow đối phương thành công!",
                status: "success",
                duration: 2000,
                isClosable: true,
            }
        ))
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu postID: ', error);
                setIsFollow(true);
            });
    }

    const followUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const data = ({
            "follower":
            {
                "userID": userID
            },
            "userTarget":
            {
                "userID": userData.userID
            }
        })
        const equal = axios.post('http://localhost:8081/follow/save', data, requestOptions);
        toast(
            {
                title: "Followed",
                description: "Follow đối phương thành công!",
                status: "success",
                duration: 2000,
                isClosable: true,
            }
        )
        return equal;
    }

    const followClick = () => {
        setIsFollow(true);
        followUser()
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu postID: ', error);
                setIsFollow(false);
            });
    }

    if (!userData) {
        return <p>loading</p>;
    }
    else {
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
                {isFollow ? (
                    <div className="user_long_card_follow">
                        <Button onClick={unfollowClick} className='user_long_card_button'>
                            <BiSolidUserCheck />
                        </Button>
                    </div>) : (
                    <div className="user_long_card_follow">
                        <Button onClick={followClick} className='user_long_card_button'>
                            <LiaUserPlusSolid />
                        </Button>
                    </div>)
                }
            </div>
        )
    }
}

export default UserLongCard