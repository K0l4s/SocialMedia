import { Box, ButtonGroup, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
const Login = () => {
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
            localStorage.setItem('userData', JSON.stringify(userData));
            setData(userData);
            navigate("/home");
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authentication error:", errorCode, errorMessage);
      });
  }
  

  return (
    <div className="login">
      <Box p={4} className="box">
        <p className="tittle">Login</p>
        <div className="signupBox">
          <p>Username</p>
          <Input onChange={providerEmail} className="input" placeholder='Input your username or email'></Input>
        </div>
        <div className="signupBox">
          <p>Password</p>
          <Input onChange={providerPassword} className="input" type="password" placeholder='Input your password'></Input>
        </div>
        <ButtonGroup>
          <Button onClick={login} colorScheme='blue'>Login</Button>
        </ButtonGroup>
        <p className="signup" onClick={() => navigate("/signup")}>Don't have account? Click here!</p>
      </Box>
    </div>
  )
}

export default Login