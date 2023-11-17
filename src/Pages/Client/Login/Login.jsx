import { Box, ButtonGroup, Button, Input, useToast, Card } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import Cookies from 'js-cookie';
const Login = () => {
  const toast = useToast()
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const providerEmail = (event) => {
    setEmail(event.currentTarget.value)
  }
  const providerPassword = (event) => {
    setPassword(event.currentTarget.value)
  }
  const auth = getAuth();
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // Fetch user data from the server
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        axios.get('http://localhost:8081/users/' + user.uid, requestOptions)
          .then(response => {
            const userData = {
              "userID": response.data.userID,
              "address": response.data.address,
              "gender": response.data.gender,
              "dob": response.data.dob,
              "avatarURL": response.data.avatarURL,
              "firstName": response.data.firstName,
              "lastName": response.data.lastName,
              "userName": response.data.userName,
            };

            // Lưu dữ liệu vào localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userAvatar', user.avatarURL);
            localStorage.setItem('userID', user.uid);

            setData(userData);
            toast({
              position: 'bottom-right',
              title: 'Login successfully.',
              description: "You're login successfully.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            navigate("/home");
          })
          .catch(error => {
            toast({
              position: 'bottom-right',
              title: 'Login successfully.',
              description: "Error fetching user data.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authentication error:", errorCode, errorMessage);
        toast({
          position: 'bottom-right',
          title: 'Login successfully.',
          description: "Have error when login.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      });
  }


  return (
    <div className="cover">
      <div className="backdrop"></div>
      <div className="login">
        <div p={4} className="box">
          <p className="tittle">Login</p>
          <div className="signupBox">
            <p>Username</p>
            <Input className="input" onChange={providerEmail} className="input" placeholder='Input your username or email'></Input>
          </div>
          <div className="signupBox">
            <p>Password</p>
            <Input className="input" onChange={providerPassword} className="input" type="password" placeholder='Input your password'></Input>
          </div>
          <ButtonGroup>
            <Button className='button' onClick={login} colorScheme='blue'>Login</Button>
          </ButtonGroup>
          <p className="signup" onClick={() => navigate("/signup")}>Don't have account? Click here!</p>
        </div>

        <div className="logos">
          <img src="https://i.ibb.co/QkmDvRW/a1c08598-d175-48b4-a39e-2f9c66b0d55a.jpg" alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default Login