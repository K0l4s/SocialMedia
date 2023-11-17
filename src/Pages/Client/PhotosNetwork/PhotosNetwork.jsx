import React, { useEffect, useState } from 'react'
import './PhotosNetwork.css'
import PhotoCard from '../../../Components/PhotoCard/PhotoCard'
import axios from 'axios';
const Explore = () => {
  const [imagePostData, setImagePostData] = useState();
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    axios.get('http://localhost:8081/posts/findAllPhoto', requestOptions)
      .then(response => { setImagePostData(response.data); console.log(response.data);})
      .catch(error => { console.error('Lỗi khi tải dữ liệu: ', error); });
  }, []);

  return (

    <div className='photosNetwork'>
      <div className="_text">
        <h1>PHOTOS NETWORK</h1>
        <p className='welcome'>Welcome to Photos Network! On these pages, we will showcase the very best images from our users!</p>
        <div className="photoList">
        {imagePostData ? ( // Check if commentData is defined
                  imagePostData.map((image, index) => (
                    <PhotoCard key={index} postData={image} />
                  ))
                ) : (
                  <p>No comments available.</p>
                )}
        </div>
      </div>
    </div>
  )
}

export default Explore