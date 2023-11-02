import React, { useEffect, useState } from 'react'
import {
    Button,
    ButtonGroup,
    useToast,
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import Post from '../../Components/PostComponent/Post';
import Comment from '../../Components/Form/PostDetail/Comment';
import axios from 'axios';
import { auth } from '../../Components/firebase';
import './PostPage.css'
const PostPage = () => {
    // Get postID from URL
    const postID = window.location.href.split('/')[4];
    console.log(postID);
    const toast = useToast();
    const [commentData, setCommentData] = useState();
    const [inputComment, setInputComment] = useState();

    const providerInputComment = (event) => {
        setInputComment(event.currentTarget.value);
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        axios.get('http://localhost:8081/comments/find/byPost?postID=' + postID, requestOptions)
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu commentID: ', error);
            });
    }, []);

    const commentAction = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        if (auth.currentUser.uid == null)
            toast({
                position: 'bottom-right',
                title: 'Post created.',
                description: "Don't find your id, please login again!",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        else {

            const inputData = ({
                "user": {
                    "userID": auth.currentUser.uid
                },
                "post": {
                    "postID": postID
                },
                "content": inputComment
            });
            axios.post('http://localhost:8081/comments/save', inputData, requestOptions)
                .then(response => {
                    console.log(response);
                    console.log(commentData.length);
                    const newComment = response.data;
                    const localUser = JSON.parse(localStorage.getItem('userData'));
                    newComment.user = localUser;
                    setCommentData([...commentData, response.data])
                    setInputComment("");
                    document.getElementById("myInput").value = "";
                })

        }
    }
    return (

        <div>
            <div className='viewPost_all'>
                <div className='viewPost_body'>
                    <div className="place">
                        <Post commentAvailable={false} postID={postID} />
                    </div> <p>Không có bình luận!</p>
                    <div>
                        <p>Bình luận của bạn bè</p>
                        <p>Tất cả bình luận</p>
                        <div className="commentList">
                            {commentData ? ( // Check if commentData is defined
                                commentData.map((comment, index) => (
                                    <Comment key={index} comment={comment} />
                                ))
                            ) : (
                                <p>No comments available.</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="viewPost_footer">
                    <div className="input_view">
                        <input id="myInput" onChange={providerInputComment} type="text" placeholder="Nhập bình luận của bạn" />
                        <ButtonGroup>
                            <Button onClick={commentAction} colorScheme='green' className="Cbutton_1">
                                <AiOutlineSend size={25} />
                            </Button>
                        </ButtonGroup>
                    </div>

                </div>
            </div >
        </div >
    );
}

export default PostPage