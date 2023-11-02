import React, { useState, useEffect } from 'react';
import './ProfileUserDetail.css';
import { Button, Card, CircularProgress, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FiUserPlus } from 'react-icons/fi';
import { FaUserCheck } from 'react-icons/fa';
import { RiUserHeartFill, RiUserReceivedLine } from 'react-icons/ri'
const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
export const ProfileUserDetail = () => {
    const userID = window.location.href.split('/')[4];
    const currentLoginID = localStorage.getItem("userID");
    const [userData, setUserData] = useState(null);
    let avatarURL = avatarDefault;
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        axios.get('http://localhost:8081/users/' + userID, requestOptions)
            .then(response => {
                setUserData({
                    "userID": response.data.userID,
                    "address": response.data.address,
                    "gender": response.data.gender,
                    "dob": response.data.dob,
                    "avatarURL": response.data.avatarURL,
                    "firstName": response.data.firstName,
                    "lastName": response.data.lastName,
                    "userName": response.data.userName,
                })
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
    }, [userID]);
    const toast = useToast();
    const [isFollow, setIsFollow] = useState(false)
    const [targetIsFollowYou, setTargetIsFollowYou] = useState(false)
    useEffect(() => {
        checkExist();
        checkExistTarget();
    }, []);
    const checkExistTarget = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/follow/isFollow?followerID=' + userID + "&targetID=" + currentLoginID, requestOptions)
            .then(response => {
                setTargetIsFollowYou(response.data)
            })
    }
    const checkExist = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/follow/isFollow?followerID=' + currentLoginID + "&targetID=" + userID, requestOptions)
            .then(response => {
                setIsFollow(response.data)
            })
    }

    const deleteFollow = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        return axios.delete('http://localhost:8081/follow/delete?followerID=' + localStorage.getItem('userID') + "&targetID=" + userID, requestOptions);
    }
    const unfollowClick = () => {
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
                "userID": currentLoginID
            },
            "userTarget":
            {
                "userID": userID
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
        // Render loading or error message here while data is being fetched.
        return <CircularProgress className='loading' isIndeterminate color='green.300' />;
    }


    if (userData.avatarURL === null)
        avatarURL = avatarDefault;
    else
        avatarURL = userData.avatarURL;
    return (
        <div>


            <Card className="top">
                {userID === localStorage.getItem("userID") ? null :
                    (
                        isFollow ?
                            (targetIsFollowYou ?
                                (<div onClick={unfollowClick} className="followButton"><RiUserHeartFill /></div>) :
                                    (<div onClick={unfollowClick} className="followButton"><FaUserCheck /></div>)) :
                            (targetIsFollowYou ? 
                                (<div onClick={followClick} className="followButton"><RiUserReceivedLine /></div>) :
                                (<div onClick={followClick} className="followButton"><FiUserPlus /></div>))

                    )
                }
                <div className="image">
                    <img src={avatarURL} alt="profile" />
                </div>
                <div className="row">
                    <div className="row_1">
                        {userData.userName === undefined ? <p className="username">Người dùng không tồn tại!</p> : null}
                        <p className="username">{userData.userName}</p>
                    </div>
                    <div className="row_2">
                        <div className="row_2">
                            <Button className="ac_inf">
                                <span className='number'>10</span>
                                <span>Posts</span>
                            </Button>
                            <Button className="ac_inf">
                                <span className='number'>10</span>
                                <span>Followers</span>
                            </Button>
                            <Button className="ac_inf">
                                <span className='number'>10</span>
                                <span>Following</span>
                            </Button>
                        </div>
                    </div>
                    <div className="name_and_bio">
                        <p className="name">{userData.firstName} {userData.lastName}</p>
                        <p className="bio">Lorem Ipsum is simply dummy text...</p>
                    </div>
                </div>
            </Card >
        </div >
    );
};
