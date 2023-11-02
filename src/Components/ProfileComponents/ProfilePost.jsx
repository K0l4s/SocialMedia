import React, { useEffect, useState } from 'react'
import Post from '../PostComponent/Post'
import axios from 'axios';



const ProfilePost = () => {
  const userID = window.location.href.split('/')[4];
  console.log(userID);

  const [postIDData, setPostIDData] = useState([]);
  const [indexPostPage, setIndexPostPage] = useState(0);
  const pageSize = 10;

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    console.log("Data: ", indexPostPage);
    return axios.get('http://localhost:8081/posts/recommnedPostByUser?start=' + indexPostPage + '&&pageSize=' + pageSize+
    '&&userID='+userID, requestOptions);
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
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu postID: ', error);
      });
  }

  // const [postIDData, setPostIDData] = useState([]);

 
  // useEffect(() => {
  //   const fetchData = () => {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     };
  //     return axios.get('http://localhost:8081/posts/findUserPost/' + userID, requestOptions);
  //   };
  //   fetchData()
  //     .then(response => {
  //       setPostIDData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Lỗi khi tải dữ liệu postID: ', error);
  //     });
  // }, [userID]);

  // console.log(postIDData);
  // const posts = [];
  // for (let i = 0; i < postIDData.length; i++) {
  //   posts.push(<Post loading="lazy" commentAvailable={true} commentCount={100} postID={postIDData[i]}></Post>)
  // };
  return (
    <div>
      <div className="post_List">
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
    </div>
  )
}

export default ProfilePost