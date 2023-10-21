import React, { useState, useEffect } from 'react';
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
  useToast,
  Input,
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import './Create.css';
import { MdOutlineAddLocationAlt, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import axios from 'axios';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

const Create = ({ isOpen, onClose, image, newPostLoca }) => {
  const userID = localStorage.getItem('userID');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const providerContent = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'images/' + Date.now() + selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      setIsUploading(true);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading: ', error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageURL(downloadURL);
              console.log(downloadURL);
              setIsUploading(false);
              console.log(imageURL);
            })
            .catch((error) => {
              console.error('Error getting download URL: ', error);
              setIsUploading(false);
            });
        }
      );
    }
  };
  if (selectedFile != null) {
    handleFileUpload();
    setSelectedFile(null);
  }
  const submitPost = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var hours = today.getHours().toString().padStart(2, '0');
    var minutes = today.getMinutes().toString().padStart(2, '0');
    var seconds = today.getSeconds().toString().padStart(2, '0');
    var dateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    console.log(dateTime);

    try {
      let payload = {
        user: {
          userID: userID,
        },
        imageURL: imageURL,
        createDay: dateTime,
        content: content,
      };
      console.log(imageURL);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };

      axios.post('http://localhost:8081/posts/saves', payload, requestOptions)
        .then(response => {
          if (response.status === 200) {
            console.log('Gửi bài viết thành công');
            toast({
              position: 'bottom-right',
              title: 'Post created.',
              description: 'Your post was posted. View it in your profile.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            onClose();
          } else {
            console.log('Lỗi khi gửi bài viết');
            toast({
              position: 'bottom-right',
              title: 'Post created.',
              description: "Your post wasn't posted.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi gửi bài viết', error);
          toast({
            position: 'bottom-right',
            title: 'Post created.',
            description: "Your post wasn't posted.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log('Lỗi trong quá trình gửi bài viết', error);
      toast({
        position: 'bottom-right',
        title: 'Post created.',
        description: "Your post wasn't posted.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose} image={image} newPostLoca={newPostLoca}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new post</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <div className="place">
              <Textarea onChange={providerContent} className='CnewPost' name="newPost" id="1" cols="100" rows="5" placeholder="What's on your mind?"></Textarea>
              {image ? (
                <div className="addPhoto">
                  {imageURL == null ? <input className="addPhotoInput" onChange={handleFileChange} type='file' /> : null  
                  }
                  {isUploading ? (
                    <span>Uploading...</span>
                  ) : (
                    <img src={imageURL} />
                  )}
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
            {content === "" || content ===null ? (
            <Button cursor={'not-allowed'} colorScheme='gray' className="Cbutton_2">
              <AiOutlineSend size={25}></AiOutlineSend>
              <p>Đăng bài</p>
            </Button>) : (
            <Button onClick={submitPost} colorScheme='green' className="Cbutton_2">
              <AiOutlineSend size={25}></AiOutlineSend>
              <p>Đăng bài</p>
            </Button>)}
          </ModalFooter>
        </ModalContent >
      </Modal >
    </div>
  );
};

export default Create;
