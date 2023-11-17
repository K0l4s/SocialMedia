import { Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import './AddLocation.css'
import { BsPinMap } from 'react-icons/bs'
import axios from 'axios'
const AddLocation = () => {
  const [cityName, setCityName] = useState("");
  const [cityURL, setCityURL] = useState("");
  const toast = useToast();

  const addCity = async () => {
    const newData = {
      "cityName": cityName,
      "cityMapURL": cityURL
    };

    try {
      const response = await axios.post('http://localhost:8081/city/add', newData);
      toast({
        title: "Thành công!",
        description: "Thêm vị trí mới thành công!",
        status: "success",
        duration: 3000,
        isClosable: true
    })
    } catch (error) {
      console.log(error);
    }
  };

  function providerCityName(event) {
    setCityName(event.target.value);
  }

  function providerCityURL(event) {
    setCityURL(event.target.value);
  }
  return (
    <div className='addlocation'>
      <h1>Thêm địa điểm</h1>
      <div className="input">
        <p>Tên Thành Phố/ Vị Trí</p>
        <input onChange={providerCityName} type='text' id='cityName' />
      </div>
      <div className="input">
        <p><BsPinMap />Link Bản Đồ</p>
        <input onChange={providerCityURL} type='text' id='link' />
      </div>
      <Button onClick={addCity} colorScheme='green' className='cha_button'>Gửi</Button>
    </div>
  )
}

export default AddLocation