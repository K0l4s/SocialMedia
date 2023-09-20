import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  ModalFooter,
  Select,
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import './Create.css'
import { MdOutlineAddLocationAlt, MdOutlineAddPhotoAlternate } from 'react-icons/md';

const Create = ({ isOpen, onClose, image, newPostLoca }) => {

  return (

    <Modal isOpen={isOpen} onClose={onClose} image={image} newPostLoca={newPostLoca}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <hr />
        <ModalBody>
          <div className="place">
            <Textarea className='CnewPost' name="newPost" id="1" cols="100" rows="5" placeholder="What's on your mind?"></Textarea>
            {image ? (
              <div className="addPhoto">
                <img
                  src="https://play-lh.googleusercontent.com/qlIDfFiFKSeoawoihQlWv-BtnWrGphURKx3EfrnrqfO5toLDDvERs38E7AMqkX_euA"
                  alt="post"
                />
              </div>
            ) : null}
            <hr />
            {newPostLoca ? (
              <div className="checkin">
                <p>Location: </p>
                <p className="place_name"> <a href='https://maps.app.goo.gl/J1vtuRvGTaRJr2zY6'>Hanoi, VietNam</a></p>
                <Select placeholder='Select option'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
                <Button className='locationButton'>Không tìm thấy vị trí của bạn?</Button>
                <hr />
              </div>) : null}
            <div className="Cbutton">
              {image ? null : (
                <Button colorScheme='blue' className="Cbutton_2">
                  <MdOutlineAddPhotoAlternate size={25}></MdOutlineAddPhotoAlternate>
                  <p>Add Photo</p>
                </Button>)}
              {newPostLoca ? null : (
                <Button colorScheme='green' className="Cbutton_2">
                  <MdOutlineAddLocationAlt size={25}></MdOutlineAddLocationAlt>
                  <p >Check in</p>
                </Button>)}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' className="Cbutton_2" onClick={onClose}>
            <AiOutlineSend size={25}></AiOutlineSend>
            <p>Send</p>
          </Button>
        </ModalFooter>
      </ModalContent >
    </Modal >
  );
};

export default Create;
