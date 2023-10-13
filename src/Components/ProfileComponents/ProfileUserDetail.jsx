import React, { useState, useEffect, useRef } from 'react';
import logo from '../../images/profile.jpg';
import './ProfileUserDetail.css';
import { Button, Card } from '@chakra-ui/react';
import axios from 'axios';

export const ProfileUserDetail = () => {
    const userID = window.location.href.split('/')[4];
    const [userData, setUserData] = useState(null);
    const avatarURL = useRef(logo);
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
                avatarURL.current = response.data.avatarURL;
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
    }, [userID]);
    if (!userData) {
        // Render loading or error message here while data is being fetched.
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card className="top">
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
            </Card>
        </div>
    );
};
