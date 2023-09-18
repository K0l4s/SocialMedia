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
} from '@chakra-ui/react';
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { AiOutlineSend } from 'react-icons/ai';
import './Create.css'

const Create = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <hr />
        <ModalBody>
          <div className="place">
            <Textarea className='newPost' name="newPost" id="1" cols="30" rows="10" placeholder="What's on your mind?"></Textarea>
            <hr />
            <div className="btn">
              <Button colorScheme='purple'>
                <IoDocumentAttachOutline></IoDocumentAttachOutline>
                <p>Images/Videos</p>
              </Button>
              <ModalCloseButton className='send' >
                <AiOutlineSend></AiOutlineSend>
                <p>Send</p>
                <div className="close">

                </div>
              </ModalCloseButton>
            </div>
          </div>
        </ModalBody>
      </ModalContent >
    </Modal >
  );
};

export default Create;
