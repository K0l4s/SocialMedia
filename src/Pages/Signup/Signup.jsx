import React, { useState } from 'react';
import './Signup.css';
import { Box, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import app from '../../Components/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Sử dụng useState để quản lý trạng thái email
    const [password, setPassword] = useState(''); // Sử dụng useState để quản lý trạng thái password
    const [firstName, setFirstName] = useState(''); // Sử dụng useState để quản lý trạng thái firstName
    const [lastName, setLastName] = useState(''); // Sử dụng useState để quản lý trạng thái lastName
    const [username, setUsername] = useState(''); // Sử dụng useState để quản lý trạng thái username
    const [data, setData] = useState([]);
    const providerEmail = (event) => {
        setEmail(event.currentTarget.value);
    }

    const providerPassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const providerFirstName = (event) => {
        setFirstName(event.currentTarget.value);
    }

    const providerLastName = (event) => {
        setLastName(event.currentTarget.value);
    }

    const providerUsername = (event) => {
        setUsername(event.currentTarget.value);
    }

    const auth = getAuth();
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                let layload = {
                    "userID": user.uid,
                    "firstName": firstName,
                    "lastName": lastName,
                    "userName": username,
                    "address": null,
                    "gender": null,
                    "dob": null,
                    "avatarURL": null,
                }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(layload)
                };
                axios.post('http://localhost:8081/users/saves', layload, requestOptions)
                    .then(response => setData(response.data))
                    .then(data => console.log(data));

                localStorage.setItem('userData', JSON.stringify(layload));
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <div className="login">
            <Box p={4} className="box">
                <p className="tittle">Signup</p>
                <div className="signupBox">
                    <p>First Name</p>
                    <Input onChange={providerFirstName} className="input" />
                </div>
                <div className="signupBox">
                    <p>Last Name</p>
                    <Input onChange={providerLastName} className="input" />
                </div>
                <div className="signupBox">
                    <p>Username</p>
                    <Input onChange={providerUsername} className="input" />
                </div>
                <div className="signupBox">
                    <p>Email</p>
                    <Input onChange={providerEmail} className="input" type="text" />
                </div>
                <div className="signupBox">
                    <p>Password</p>
                    <Input onChange={providerPassword} className="input" type="password" />
                </div>
                <Button colorScheme='blue' onClick={register}>Register</Button>
                <p className="signup" onClick={() => navigate("/signin")}>You have an account? Login here!</p>
            </Box>
        </div>
    );
}

export default Signup;
