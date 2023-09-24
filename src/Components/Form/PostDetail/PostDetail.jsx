import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import Post from '../../PostComponent/Post';

const PostDetail = ({ isOpen, onClose}) => {

  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <hr />
        <ModalBody>
          <div className="place">
           <Post/>
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

export default PostDetail;
