import React, { useEffect, useState } from 'react';
import './Comment.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Button, Card, useToast } from '@chakra-ui/react';
import axios from 'axios';

// import { auth } from '../../Components/firebase'
// const userID = auth.currentUser.uid ;

// const userID = '5VssvFRgXsTP2QVQl2oERMFKBLJ2';

const Comment = ({ comment }) => {
  const userID = localStorage.getItem('userID');
  const toast = useToast();
  const [currentLikeCount, setCurrentLikeCount] = useState(0);

  const [isLiked, setIsLiked] = useState(false);

  const likeComment = () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    axios.post('http://localhost:8081/likeComment/saves?commentID=' + comment.commentID + '&userID=' + userID, requestOptions)
        .then(response => {
            if (response.data) {
                setCurrentLikeCount(currentLikeCount + 1);
                setIsLiked(true);
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
const unlikeComment = () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    axios.delete('http://localhost:8081/likeComment/delete?commentID=' + comment.commentID + '&userID=' + userID, requestOptions)
        .then(response => {
            if (response.data) {
                setCurrentLikeCount(currentLikeCount - 1);
                setIsLiked(false);
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
  const toggleLike = () => {
    if (isLiked) {
      unlikeComment();
    }
    else {
      likeComment();
    }
  };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    axios.get('http://localhost:8081/likeComment/findTotal?commentID=' + comment.commentID, requestOptions)
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
      });

    axios.get('http://localhost:8081/likeComment/isLike?commentID=' + comment.commentID + '&userID=' + userID, requestOptions)
      .then(response => {
        if (response.data) {
          setIsLiked(response.data);
        } else {
          setIsLiked(false);
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu like: ', error);
      });
  }, []);

  if (!comment || !comment.user) {
    return null;
  } else {
    const navigateToProfile = () => {
      window.location.href = "/profile/" + comment.user.userID;
    };

    return (
      <Card className='comment_eff'>
        <div className='comment'>
          <div className='comment__avatar'>
            <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt='avatar' />
          </div>
          <div className='comment__content'>
            <div className='comment__content__name'>
              <p onClick={navigateToProfile}>{comment.user.firstName + " " + comment.user.lastName}</p>
            </div>
            <div className='comment__content__text'>
              <p>{comment.content}</p>
            </div>
            {comment.imageURL === "" || comment.imageURL === null ? null : (
              <div className="comment__content__image">
                <img src={comment.imageURL} alt="picture" />
              </div>
            )}
          </div>
          <div className="react">

            {isLiked ? (
              <Button colorScheme='pink' className="like" onClick={toggleLike}>
                <AiFillLike size={30}></AiFillLike>
              </Button>
            ) : (
              <Button className="like" onClick={toggleLike}>
                <AiOutlineLike size={30}></AiOutlineLike>
              </Button>
            )}

            <p>{currentLikeCount}</p>
          </div>
        </div>
      </Card>
    );
  }
};

export default Comment;
