import { Button, Card } from '@chakra-ui/react';
import React, { useState } from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineAddLocationAlt } from 'react-icons/md'
import Create from '../../Components/Form/Create/Create'
import './CreatePost.css'
const CreatePost = () => {
    const [image, setImage] = useState(false);
    const [newPostLoca, setNewPostLoca] = useState(false);
    const [isOpen, setIsOpen] = useState();
    const onClose = () => { setIsOpen(false); };
    let avatarURL = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    let userName = null;
    

    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
        // Parse dữ liệu JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);

        // Truy cập thuộc tính 'avatarURL' trong userData
        avatarURL = userData.avatarURL;
        if (userData.userName != null)
            userName = userData.userName;
        if (avatarURL == null) { avatarURL = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' };
    }
    return (
        <div className='main'><Card className="NewPost">
            <div className="image_and_title">

                <img onClick={() => { setIsOpen(true); setImage(false); setNewPostLoca(false) }} className='p_images' src={avatarURL} alt="profile" />
                <h1 onClick={() => { setIsOpen(true); setImage(false); setNewPostLoca(false) }}>CREATE YOUR NEW POST</h1>
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
        </Card>
            <Create isOpen={isOpen} onClose={onClose} image={image} newPostLoca={newPostLoca} /></div>
    )
}

export default CreatePost