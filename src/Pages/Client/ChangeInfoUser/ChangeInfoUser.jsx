import React, { useEffect, useState } from 'react';
import './ChangeInfoUser.css';
import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';

const ChangeInfoUser = () => {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users/' + localStorage.getItem("userID"));
        setUserData(response.data);
        console.log("Dữ liệu lấy về: ", response.data);
  
        if (response.data.dob) {
          const dob = response.data.dob;
          const formattedDate = dob.map(function (item) {
            // Đảm bảo rằng tháng và ngày luôn có hai chữ số
            return item.toString().padStart(2, '0');
          }).join('-');
          setDOB(formattedDate);
        }
  
        setAddress(response.data.address);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserName(response.data.userName);
        setGender(response.data.gender);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  const updateData = async () => {
    const newData = {
      "userID": userData.userID,
      "firstName": firstName,
      "lastName": lastName,
      "userName": userName,
      "address": address,
      "dob": dateOfBirth, 
      "gender": gender
    };

    try {
      const response = await axios.post('http://localhost:8081/users/update', newData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (userData === null) {
    return <p>Đang tải dữ liệu...</p>;
  } else {
    return (
      <div className='changeInf'>
        <img src='https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' />
        <Button colorScheme='blue' className='cha_button'>Đổi Avatar</Button>
        <div className="input">
          <p>Họ</p>
          <input onChange={providerFirstName} type='text' id='firstName' value={firstName} />
        </div>
        <div className="input">
          <p>Tên</p>
          <input onChange={providerLastName} type='text' id='lastName' value={lastName} />
        </div>
        <div className="input">
          <p>Username</p>
          <input onChange={providerUserName} type='text' id='userName' value={userName} />
        </div>
        <div className="input">
          <p>Địa chỉ</p>
          <input onChange={providerAddress} type='text' id='address' value={address} />
        </div>
        <div className="input">
          <p>Giới Tính</p>
          <input onChange={providerGender} type='text' id='gender' value={gender} />
        </div>
        <div className="input">
          <p>Ngày Sinh (mm/dd/yyyy)</p>
          <input onChange={providerDOB} type='date' id='dob' value={dateOfBirth} />
        </div>
        <Button onClick={updateData} colorScheme='green' className='cha_button'>Lưu thông tin cá nhân</Button>
      </div>
    );
  }

  function providerFirstName(event) {
    setFirstName(event.target.value);
  }

  function providerLastName(event) {
    setLastName(event.target.value);
  }

  function providerUserName(event) {
    setUserName(event.target.value);
  }

  function providerAddress(event) {
    setAddress(event.target.value);
  }

  function providerDOB(event) {
    setDOB(event.target.value);
  }

  function providerGender(event) {
    setGender(event.target.value);
  }
};

export default ChangeInfoUser;
