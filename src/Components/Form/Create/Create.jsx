import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import './Create.css'
import { MdOutlineAddLocationAlt, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import axios from 'axios';


const Create = ({ isOpen, onClose, image, newPostLoca }) => {
  const toast = useToast()
  const [content, setContent] = useState('');
  const [data, setData] = useState([]);

  const providerContent = (event) => {
    setContent(event.currentTarget.value);
  }
  const submitPost = (content) => {
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
        "user": {
          "userID": "5VssvFRgXsTP2QVQl2oERMFKBLJ2"
        },
        "createDay": dateTime, // Lấy ngày hiện tại
        "content": content
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };
      
      axios.post('http://localhost:8081/posts/saves', payload, requestOptions)
        .then(response => {
          if (response.status === 200) {
            console.log("Gửi bài viết thành công");
            toast({
              position:'bottom-right',
              title: 'Post created.',
              description: "Your post was posted.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            // Xử lý dữ liệu hoặc thực hiện hành động khác ở đây
          } else {
            console.log("Lỗi khi gửi bài viết");
            toast({
              position:'bottom-right',
              title: 'Post created.',
              description: "Your post wasn't posted.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          }
        })
        .catch(error => {
          console.error("Lỗi khi gửi bài viết", error);
          toast({
            position:'bottom-right',
            title: 'Post created.',
            description: "Your post wasn't posted.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        });
        onClose();
    } catch (error) {
      console.log("Lỗi trong quá trình gửi bài viết", error);
      toast({
        position:'bottom-right',
        title: 'Post created.',
        description: "Your post wasn't posted.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };


  return (

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
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1829/1829589.png"
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
          <Button onClick={() => submitPost(content)} colorScheme='green' className="Cbutton_2">
            <AiOutlineSend size={25}></AiOutlineSend>
            <p>Send</p>
          </Button>
        </ModalFooter>
      </ModalContent >
    </Modal >
  );
};

export default Create;
