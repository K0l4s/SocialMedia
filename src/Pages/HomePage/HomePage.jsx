import { Button, Card } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import './HomePage.css'
import Post from '../../Components/PostComponent/Post'
import axios from 'axios'
import { auth } from '../../Components/firebase.jsx'
import CreatePost from '../../Components/CreatePost/CreatePost'
import LoadingPost from '../../Components/PostComponent/LoadingPost'
import SuggestFollow from '../../Components/SuggestFollow/SuggestFollow'
import SuggestFollowList from '../../Components/SuggestFollow/SuggestFollowList'
const fetchData = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return axios.get('http://localhost:8081/posts/findAllPostID', requestOptions);
};


export const HomePage = () => {
  const [postIDData, setPostIDData] = useState([]);

  useEffect(() => {
    fetchData()
      .then(response => {
        setPostIDData(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu postID: ', error);
      });
  }, []);
  const posts = [];
  for (let i = 0; i < postIDData.length; i++) {
    posts.push(<Post loading="lazy" commentAvailable={true} commentCount={100} postID={postIDData[i]}></Post>)
  };


  let userName = null;


  const userDataJSON = localStorage.getItem('userData');
  if (userDataJSON) {
    // Parse dữ liệu JSON thành đối tượng JavaScript
    const userData = JSON.parse(userDataJSON);
    if (userData.userName != null)
      userName = userData.userName;
  }

  return (
    <div className="main">

      {userName != null ?
        <CreatePost></CreatePost> : null}
      <div className="main_Tittle">
        <h1>Gợi ý follow</h1>
        <div className="suggestFlList">
          <SuggestFollowList/>
        </div>
      </div>
      <div className="main_Tittle">
        <h1 >Các bài viết nổi bật</h1>
      </div>
      <div className="post_list">
        {postIDData.length === 0 ? <h3 align="center">Không có bài viết nào</h3> : posts}
      </div>
      <Button colorScheme='green' padding={5} margin={5}>Load more...</Button>
    </div>
  )
}

export default HomePage