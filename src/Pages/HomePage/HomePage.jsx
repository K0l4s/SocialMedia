import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import profileI from '../../images/profile.jpg'
import './HomePage.css'
import { MdOutlineAddPhotoAlternate, MdOutlineAddLocationAlt } from 'react-icons/md'
import Create from '../Form/Create/Create'
export const HomePage = () => {

    const [isOpen, setIsOpen] = useState();
    const onClose = () => {setIsOpen(false);}
    const [image, setImage] = useState(false);
    const [newPostLoca, setNewPostLoca] = useState(false);
    return (
        <div className='main'>
            <div className="NewPost">
                <div className="image_and_title">

                    <img className='p_images' src={profileI} alt="profile" />
                    <h1>CREATE YOUR NEW POST</h1>
                </div>
                <hr />
                <Button colorScheme='pink' className="action" onClick={()=>{setIsOpen(true); setImage(false); setNewPostLoca(false)}}>What's on your mind?</Button>
                <div className="actionButton">
                    <Button colorScheme='blue' className="btn_1" onClick={()=>{setIsOpen(true); setImage(true); setNewPostLoca(false)}}>
                        <MdOutlineAddPhotoAlternate size={25}></MdOutlineAddPhotoAlternate>
                        <p>Add Photo</p>
                    </Button>
                    <Button colorScheme='green' className="btn_1" onClick={()=>{setIsOpen(true); setImage(false); setNewPostLoca(true)}}>
                        <MdOutlineAddLocationAlt size={25}></MdOutlineAddLocationAlt>
                        <p >Check in</p>
                    </Button>
                </div>
            </div>
            <Create isOpen={isOpen} onClose={onClose} image={image} newPostLoca={newPostLoca} />
        </div>
    )
}

export default HomePage