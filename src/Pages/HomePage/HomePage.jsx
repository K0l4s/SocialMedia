import { Button, Card } from '@chakra-ui/react'
import React, { useState } from 'react'
import profileI from '../../images/profile.jpg'
import './HomePage.css'
import { MdOutlineAddPhotoAlternate, MdOutlineAddLocationAlt } from 'react-icons/md'
import Create from '../../Components/Form/Create/Create'
import Post from '../../Components/PostComponent/Post'
export const HomePage = () => {

    const [isOpen, setIsOpen] = useState();
    const onClose = () => { setIsOpen(false); }
    const [image, setImage] = useState(false);
    const [newPostLoca, setNewPostLoca] = useState(false);

    let avatarURL = profileI;
    let userName = null;
    const posts = [];
    for (let i = 0; i < 100; i++) {
        posts.push(<Post key={i} onImage={true} likeCount={100} commentCount={1000} />)
    };
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
            {userName !=null ?
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

                {posts}


                <Post like={false} postAuthor="Chương Dương" commentCount={100} likeCount={50}></Post>
                <Post like={false} onImage={true} postAuthor="Nghệ Hà" commentCount={10000} likeCount={10}></Post>
            </div>
            <Button colorScheme='green' padding={5} margin={5}>Load more...</Button>
        </div>
    )
}

export default HomePage