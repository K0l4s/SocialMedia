import React, { useEffect, useState } from 'react';
import './Post.css';
import { FaRegComments } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Button, Card, CardBody, CircularProgress, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostDetail from '../Form/PostDetail/PostDetail';
import LoadingPost from './LoadingPost';
import { auth } from '../../Components/firebase'
import { RiFlagLine } from 'react-icons/ri';

// const userID = auth.currentUser.uid ;

const Post = ({ like, postID, commentAvailable }) => {
    const userID = localStorage.getItem('userID');
    const [postUserID, setPostUserID] = useState(null);
    const toggleLike = () => {
        if (isLike) {
            unlikePost();

        } else {
            likePost();
        };
    }
    const likePost = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.post('http://localhost:8081/likePost/saves?postID=' + postID + '&userID=' + userID, requestOptions)
            .then(response => {
                if (response.data) {
                    setCurrentLikeCount(currentLikeCount + 1);
                    setIsLike(true);
                }
            })
            .catch(error => {
                toast({
                    title: "Lỗi",
                    description: "Thao tác quá nhanh, xin hãy thử lại sau!",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            });
    };
    const unlikePost = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.delete('http://localhost:8081/likePost/delete?postID=' + postID + '&userID=' + userID, requestOptions)
            .then(response => {
                if (response.data) {
                    setCurrentLikeCount(currentLikeCount - 1);
                    setIsLike(false);
                }
            })
            .catch(error => {
                toast({
                    title: "Lỗi",
                    description: "Thao tác quá nhanh, xin hãy thử lại sau!",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            });
    };
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/likePost/findTotal?postID=' + postID, requestOptions)
            .then(response => {
                if (Array.isArray(response.data)) {
                    // Dữ liệu trả về là Array, set likeCount bằng độ dài của Array
                    setCurrentLikeCount(response.data.length);

                } else {
                    setCurrentLikeCount(0);
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu like: ', error);
                return <LoadingPost></LoadingPost>;
            });

        axios.get('http://localhost:8081/likePost/isLike?postID=' + postID + '&userID=' + userID, requestOptions)
            .then(response => {
                if (response.data) {
                    setIsLike(response.data);
                    console.log(response.data);
                } else {
                    setIsLike(false);
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu like: ', error);
                return <LoadingPost></LoadingPost>;
            });

        axios.get('http://localhost:8081/posts/find/' + postID, requestOptions)
            .then(response => {
                if (response.data && response.data.user) {
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
                    setPostData(newPostData);
                    setPostUserID(user.userID)
                    if (response.data.city) {
                        const city = response.data.city;
                        setCityName(city.cityName);
                        setCityURL(city.cityMapURL);
                        console.log(city.cityMapURL);
                    }
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu postID: ', error);
            });
        axios.get('http://localhost:8081/comments/find/byPost?postID=' + postID, requestOptions)
            .then(response => {
                setCommentCount(response.data.length);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu commentID: ', error);
            });
    }, []);

    const toast = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const [isLike, setIsLike] = useState(like);
    const [currentLikeCount, setCurrentLikeCount] = useState();
    const [commentCount, setCommentCount] = useState(0);
    const [cityName, setCityName] = useState('');
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');
    const [postData, setPostData] = useState({
        userID: '',
        imageURL: '',
        content: '',
        createDay: []
    });
    const [cityURL,setCityURL] = useState('');
    if (!postData.userID || !postData.content)
        return <LoadingPost></LoadingPost>;
    else
        return (
            <div>

                <Card className="_post">
                    <Button className="reportPost">
                        <RiFlagLine className='rp_icon' />
                    </Button>
                    <div className="post_top">
                        <div className="post_avatar">
                            <img loading='lazy' onClick={() => navigate("/profile/" + userID)} src={avatarURL} alt="avatar" />
                        </div>
                        <div className="info">
                            <h3 onClick={() => navigate("/profile/" + postUserID)}>{postData.userID}</h3>
                            <p>Vào lúc: {postData.createDay[3]}:{postData.createDay[4] < 10 ? "0" + postData.createDay[4] : postData.createDay[4]} ngày {postData.createDay[2]}/{postData.createDay[1]}/{postData.createDay[0]}</p>
                            <p className='city'><a href={cityURL}> {cityName} </a></p>
                        </div>
                    </div>
                    <hr />
                    <CardBody className="_main">
                        <Text>{postData.content}</Text>
                        {postData.imageURL !== '' ? (<img src={postData.imageURL} alt="image" loading='lazy' />) : null}
                    </CardBody>
                    {commentAvailable ?
                        <div onClick={() => setIsOpen(true)} className="back"></div> : <div className="back"></div>}
                    <div className="action">

                        {isLike ?
                            (<Button colorScheme='pink' className="action_button" onClick={toggleLike}>
                                <AiFillHeart size={25} />
                                {currentLikeCount === 1 ? <p>Đã thích</p> :
                                    currentLikeCount <= 1000 ? <p>Bạn và {currentLikeCount - 1} người khác</p> :
                                        currentLikeCount <= 1000000 ? <p>Bạn và {Math.floor((currentLikeCount - 1) / 1000)}k người khác</p> :
                                            currentLikeCount <= 1000000000 ? <p>Bạn và {Math.floor((currentLikeCount - 1) / 1000000)}m người khác</p> :
                                                currentLikeCount <= 1000000000000 ? <p>Bạn và {Math.floor((currentLikeCount - 1) / 1000000000)}b người khác</p> :
                                                    <p>{currentLikeCount} lượt thích</p>}
                            </Button>) :
                            (<Button className="action_button" onClick={toggleLike}>
                                <AiOutlineHeart size={25} />
                                {currentLikeCount === 0 ? <p>Chưa có lượt thích nào</p> :
                                    currentLikeCount <= 1000 ? <p>{currentLikeCount} người thích</p> :
                                        currentLikeCount <= 1000000 ? <p>{Math.floor((currentLikeCount) / 1000)}k người thích</p> :
                                            currentLikeCount <= 1000000000 ? <p>{Math.floor((currentLikeCount) / 1000000)}m người thích</p> :
                                                currentLikeCount <= 1000000000000 ? <p>{Math.floor((currentLikeCount) / 1000000000)}b người thích</p> :
                                                    <p>{currentLikeCount} lượt thích</p>}
                            </Button>)}


                        {commentAvailable ?
                            <Button colorScheme='yellow' onClick={() => setIsOpen(true)} className="action_button">
                                <FaRegComments size={25} />
                                <p>{commentCount} bình luận</p>
                            </Button>
                            : <Button colorScheme='yellow' className="action_button">
                                <FaRegComments size={25} />
                                <p>{commentCount} bình luận</p>
                            </Button>}
                    </div>

                </Card>
                <PostDetail isOpen={isOpen} onClose={onClose} postID={postID} />
            </div>
        )
}

export default Post;
