import { Button, ButtonGroup, Card, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComments } from 'react-icons/fa'
import './PhotoCard.css'
import axios from 'axios'
const PhotoCard = ({postData}) => {
    const userID = localStorage.getItem('userID');
    const [isLike, setIsLike] = React.useState(false);
    const toast = useToast();
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/likePost/isLike?postID=' + postData.postID + '&userID=' + userID, requestOptions)
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
                return <p>Loading...</p>;
            });
    }, []);

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
        axios.post('http://localhost:8081/likePost/saves?postID=' + postData.postID + '&userID=' + userID, requestOptions)
            .then(response => {
                if (response.data) {
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
        axios.delete('http://localhost:8081/likePost/delete?postID=' + postData.postID + '&userID=' + userID, requestOptions)
            .then(response => {
                if (response.data) {
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
    if(postData === undefined) return (<div>Không có dữ liệu</div>)
    return (
        <div className="photoCard">
            <ButtonGroup className='buttonGroup'>
                
                    {isLike ? <Button onClick={toggleLike} colorScheme='pink' className='likeButton'><AiFillHeart size={25} /></Button> 
                    : <Button onClick={toggleLike} className='likeButton'><AiOutlineHeart size={25} /></Button>}
                
                <Button className='commentButton'>
                    <FaRegComments size={25} />
                </Button>
            </ButtonGroup>
            <img className="photo" src={postData.imageURL} alt={'Ảnh của: ' + postData.lastName} />
            <p className='lastName'>{postData.user.lastName}</p>
        </div>
    )
}

export default PhotoCard