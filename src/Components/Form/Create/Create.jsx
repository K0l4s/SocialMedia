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
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const toast = useToast();

  const toggleCheckin = () => {
    setIsCheckingIn(!isCheckingIn);
    console.log(isCheckingIn);
  };

  const toggleImage = () => {
    setIsImage(!isImage);
    console.log(isImage);
  };

  const providerContent = (event) => {
    setContent(event.target.value);
  };

  const providerCity = (event) => {
    setSelectedCity(event.target.value);
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
        city:{
          cityID: selectedCity
        }
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

  
  const fetchCity = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    axios.get('http://localhost:8081/city/all', requestOptions)
      .then(response => {
        if (Array.isArray(response.data)) {
          setCity(response.data);
          console.log('Dữ liệu like: ', response.data);
        } 
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu like: ', error);
      });
  };
  useEffect(() => {
    fetchCity();
  }, []);
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
              {image === true || isImage === true ? (
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
              {newPostLoca === true || isCheckingIn === true ? (
                <div className="checkin">
                  <p>Location: </p>
                  <Select onChange={providerCity} placeholder='Select option'>
                    {city.map((item) => (
                      <option key={item.cityID} value={item.cityID}>{item.cityName}</option>
                    ))}

                  </Select>
                  <Button className='locationButton'>Không tìm thấy vị trí của bạn?</Button>
                  <hr />
                </div>) : null}
              <div className="Cbutton">
                {isImage ? null : (
                  <Button onClick={toggleImage} colorScheme='blue' className="Cbutton_2">
                    <MdOutlineAddPhotoAlternate size={25}></MdOutlineAddPhotoAlternate>
                    <p>Add Photo</p>
                  </Button>)}
                {isCheckingIn ? null : (
                  <Button onClick={toggleCheckin} colorScheme='green' className="Cbutton_2">
                    <MdOutlineAddLocationAlt size={25}></MdOutlineAddLocationAlt>
                    <p >Check in</p>
                  </Button>)}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {content === "" || content === null ? (
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
