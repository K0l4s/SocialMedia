import { Button, Card, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import './HomePage.css'
import Post from '../../../Components/PostComponent/Post'
import axios from 'axios'
import CreatePost from '../../../Components/CreatePost/CreatePost'


export const HomePage = () => {

  const toast = useToast();
  const [postIDData, setPostIDData] = useState([]);
  const [newPostList, setNewPostList] = useState([]);
  const [indexPostPage, setIndexPostPage] = useState(0);
  const pageSize = 10;

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    console.log("Data: ", indexPostPage);
    if (postIDData.length === 0)
      setIndexPostPage(0);
    return axios.get('http://localhost:8081/posts/recommnedPost?start=' + indexPostPage + '&&pageSize=' + pageSize, requestOptions);
  };

  useEffect(() => {
    fetchData()
      .then(response => {
        setPostIDData(response.data);
        setIndexPostPage(indexPostPage + 1);
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu postID: ', error);
      });
  }, []);

  const nextPost = () => {
    fetchData()
      .then(response => {
        setPostIDData([...postIDData, ...response.data]);
        setIndexPostPage(indexPostPage + 1);
        if (response.data === undefined || response.data.length === 0) {
          toast({
            title: "No more post",
            description: "No more post to load",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu postID: ', error);
      });
  }



  let userName = null;


  const userDataJSON = localStorage.getItem('userData');
  if (userDataJSON) {
    // Parse dữ liệu JSON thành đối tượng JavaScript
    const userData = JSON.parse(userDataJSON);
    if (userData.userName != null)
      userName = userData.userName;
  }
  const handlePostCreated = (newPost) => {
    setNewPostList([newPost, ...newPostList]);
  };
  return (
    <div className="main">
      {userName != null ?
        <CreatePost onPostCreated={handlePostCreated} />
        : null}
        <div className="post_list">
          {newPostList.length === 0 ? null :
            (<div className="main_Tittle">
        
            <h1 >Bài viết mới của bạn</h1>
          </div>) }
            {(newPostList.map((postID, index) => (
              <Post
                key={index}
                loading="lazy"
                commentAvailable={true}
                commentCount={100}
                postID={postID}
              />
            ))
          )} </div>
      <div className="main_Tittle">
        
        <h1 >Các bài viết nổi bật</h1>
      </div>
      <div className="post_list">
        {postIDData.length === 0 ? <h3 align="center">Không có bài viết nào</h3> : (
          postIDData.map((postID, index) => (
            <Post
              key={index}
              loading="lazy"
              commentAvailable={true}
              commentCount={100}
              postID={postID}
            />
          ))
        )}
      </div>
      <Button colorScheme='green' onClick={nextPost} padding={5} margin={5}>Load more...</Button>
    </div>
  )
}

export default HomePage