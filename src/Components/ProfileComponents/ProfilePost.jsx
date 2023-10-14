import React, { useEffect, useState } from 'react'
import Post from '../PostComponent/Post'
import axios from 'axios';



const ProfilePost = () => {
  const [postIDData, setPostIDData] = useState([]);
  
  const userID = window.location.href.split('/')[4];
  console.log(userID);
  useEffect(() => {
    
    const fetchData = () => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      return axios.get('http://localhost:8081/posts/findUserPost/' + userID, requestOptions);
    };
    fetchData()
      .then(response => {
        setPostIDData(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu postID: ', error);
      });
  }, []);
  console.log(postIDData);
  const posts = [];
  for (let i = 0; i < postIDData.length; i++) {
    posts.push(<Post loading="lazy" like={false} postAuthor="Chương Dương" commentCount={100} likeCount={50} postID={postIDData[i]}></Post>)
  };
  return (
    <div>
      <div className="post_List">
        {postIDData.length===0 ? <h3 align="center">Không có bài viết nào</h3> : posts}
      </div>
    </div>
  )
}

export default ProfilePost