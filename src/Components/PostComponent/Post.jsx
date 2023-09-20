import React, { useState } from 'react';
import './Post.css';
import { FaRegComments } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Button } from '@chakra-ui/react';

const Post = ({like, onImage, post_content, post_image, likeCount, commentCount,postAuthor}) => {
    const [isLike, setIsLike] = useState(like);
    const toggleLike = () => {
        setIsLike(!isLike);
    }

    return (
        <div className="_post">
            <div className="post_top">
                <div className="post_avatar">
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar" />
                </div>
                <div className="info">
                    <h3><a href="https://www.facebook.com/">{postAuthor}</a></h3>
                    <p>1 giờ trước</p>
                    <p><a href="https://www.facebook.com/">HaNoi, VietNam</a></p>
                </div>
            </div>
            <hr />
            <div className="_main">
                <p>Đây là nội dung bài viết</p>
                {onImage===true? (<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="avatar" />):null}
                
            </div>
            <div className="action">
                <Button  className="action_button" onClick={toggleLike}>
                    {isLike ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25}/>}
                    <p>{likeCount} lượt thích</p>
                </Button>
                <Button className="action_button">
                    <FaRegComments size={25} />
                    <p>{commentCount} bình luận</p>
                </Button>
            </div>
        </div>
    )
}

export default Post;
