import React, { useEffect, useState } from 'react';
import './Post.css';
import { FaRegComments } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = ({ like, likeCount, commentCount, onImage,postID }) => {
    const [isLike, setIsLike] = useState(like);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
    const [userID, setUserID] = useState('');
    const [cityName, setCityName] = useState('');
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');
    const [postData, setPostData] = useState({
        userID: '',
        imageURL: '',
        content: '',
        createDay: []
    });

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        axios.get('http://localhost:8081/posts/find/'+postID, requestOptions)
            .then(response => {
                if (response.data && response.data.user ) {
                    const user = response.data.user;
                    const firstName = user.firstName || '';
                    const lastName = user.lastName || '';
                    const avatarURL = user.avatarURL || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
                    const imageURL = response.data.imageURL || '';
                    const content = response.data.content || '';
                    const createDay = response.data.createDay || [];

                    const newPostData = {
                        userID: `${firstName} ${lastName}`,
                        imageURL,
                        content,
                        createDay,
                    };
                    setAvatarURL(avatarURL);
                    setUserID(user.userID);
                    setPostData(newPostData);
                    if(response.data.city){
                        const city = response.data.city;
                        setCityName(city.cityName);
                    }
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu postID: ', error);
            });
    }, []);
    const toggleLike = () => {
        if (isLike) {
            setCurrentLikeCount(currentLikeCount - 1);
        } else {
            setCurrentLikeCount(currentLikeCount + 1);
        }
        setIsLike(!isLike);
    };
    return (
        <Card className="_post">
            <div className="post_top">
                <div className="post_avatar">
                    <img onClick={()=>navigate("/profile/"+userID)} src={avatarURL} alt="avatar" />
                </div>
                <div className="info">
                    <h3 onClick={()=>navigate("/profile/"+userID)}>{postData.userID}</h3>
                    <p>Vào lúc: {postData.createDay[3]}:{postData.createDay[4]<10? "0"+postData.createDay[4] : postData.createDay[4]} ngày {postData.createDay[2]}/{postData.createDay[1]}/{postData.createDay[0]}</p>
                    <p className='city'><a href='https://facebook.com'> {cityName} </a></p>
                </div>
            </div>
            <hr />
            <CardBody className="_main">
                <Text>{postData.content}</Text>
                {postData.imageURL !== '' ? (<img src={postData.imageURL} alt="image" loading='lazy' />) : null}
            </CardBody>
            <div className="action">
                <Button className="action_button" onClick={toggleLike}>
                    {isLike ? (<AiFillHeart size={25} />) : (<AiOutlineHeart size={25} />)}
                    <p>{currentLikeCount} lượt thích</p>
                </Button>
                <Button className="action_button">
                    <FaRegComments size={25} />
                    <p>{commentCount} bình luận</p>
                </Button>
            </div>
        </Card>
    )
}

export default Post;
