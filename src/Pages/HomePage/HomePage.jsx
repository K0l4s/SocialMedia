import { Button, Card } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import './HomePage.css'
import { MdOutlineAddPhotoAlternate, MdOutlineAddLocationAlt } from 'react-icons/md'
import Create from '../../Components/Form/Create/Create'
import Post from '../../Components/PostComponent/Post'
import axios from 'axios'
const  profileI ='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
  
    return axios.get('http://localhost:8081/posts/findAllPostID', requestOptions);
  };
  

export const HomePage = () => {
    const [postIDData, setPostIDData] = useState([]);

    useEffect(() => {
      fetchData()
        .then(response => {
          setPostIDData(response.data);
        })
        .catch(error => {
          console.error('Lỗi khi tải dữ liệu postID: ', error);
        });
    }, []);
    console.log(postIDData);
    const posts = [];
    for (let i = 0; i < postIDData.length; i++) {
        posts.push(<Post loading="lazy" like={false} postAuthor="Chương Dương" commentCount={100} likeCount={50} postID={postIDData[i]}></Post>)
    };

    const [isOpen, setIsOpen] = useState();
    const onClose = () => { setIsOpen(false); };
    const [image, setImage] = useState(false);
    const [newPostLoca, setNewPostLoca] = useState(false);

    let avatarURL = profileI;
    let userName = null;
    
    
    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
        // Parse dữ liệu JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);

        // Truy cập thuộc tính 'avatarURL' trong userData
        avatarURL = userData.avatarURL;
        if (userData.userName != null)
            userName = userData.userName;
        if (avatarURL == null) { avatarURL = profileI };
    }
    return (
        <div className="main">
            {userName != null ?
                <Card className="NewPost">
                    <div className="image_and_title">

                        <img className='p_images' src={avatarURL} alt="profile" />
                        <h1>CREATE YOUR NEW POST</h1>
                    </div>
                    <hr />
                    <Button colorScheme='pink' className="action" onClick={() => { setIsOpen(true); setImage(false); setNewPostLoca(false) }}>What's on your mind?</Button>
                    <div className="actionButton">
                        <Button colorScheme='blue' className="btn_1" onClick={() => { setIsOpen(true); setImage(true); setNewPostLoca(false) }}>
                            <MdOutlineAddPhotoAlternate size={25}></MdOutlineAddPhotoAlternate>
                            <p>Add Photo</p>
                        </Button>
                        <Button colorScheme='green' className="btn_1" onClick={() => { setIsOpen(true); setImage(false); setNewPostLoca(true) }}>
                            <MdOutlineAddLocationAlt size={25}></MdOutlineAddLocationAlt>
                            <p>Check in</p>
                        </Button>
                    </div>
                </Card> : null}
            <Create isOpen={isOpen} onClose={onClose} image={image} newPostLoca={newPostLoca} />
            <div className="main_Tittle">
                <h1 >Các bài viết nổi bật</h1>
            </div>
            <div className="post_list">
            {postIDData.length===0 ? <h3 align="center">Không có bài viết nào</h3> : posts}
            </div>
            <Button colorScheme='green' padding={5} margin={5}>Load more...</Button>
        </div>
    )
}

export default HomePage