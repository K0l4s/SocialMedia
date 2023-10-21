import React, { useEffect, useState } from 'react';
import './SuggestFollowList.css';
import SuggestFollow from './SuggestFollow';
import { Button } from '@chakra-ui/react';
import { FcLeft, FcRight } from 'react-icons/fc';
import axios from 'axios';

const SuggestFollowList = () => {
  const [userListData, setUserListData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users/all');
        setUserListData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 5) % userListData.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [userListData.length]);

  const changeSlide = (step) => {
    const newIndex = (index + step) % userListData.length;
    setIndex(newIndex < 0 ? userListData.length - 1 : newIndex);
  };

  const displayedUsers = [];

  for (let i = 0; i < 5; i++) {
    const userIndex = (index + i) % userListData.length;
    displayedUsers.push(userListData[userIndex]);
  }

  return (
    <div className="sgList">
      <div>
        <Button className="slide-buttons" onClick={() => changeSlide(-1)}>
          <FcLeft />
        </Button>
        <Button className="slide-buttons right" onClick={() => changeSlide(1)}>
          <FcRight />
        </Button>
      </div>
      {userListData.length > 0 && displayedUsers.map((userData, i) => (
        <SuggestFollow key={i} userData={userData} />
      ))}
    </div>
  );
};

export default SuggestFollowList;
