import React, { useEffect, useState } from 'react'
import PhotoCard from '../../Components/PhotoCard/PhotoCard'
import axios from 'axios';
const ProfileImages = () => {
  const userID = window.location.href.split('/')[4];
  const [imagePostData, setImagePostData] = useState();
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    axios.get('http://localhost:8081/posts/findAllPhotoByUserID?userID='+userID, requestOptions)
      .then(response => { setImagePostData(response.data); console.log(response.data);})
      .catch(error => { console.error('Lỗi khi tải dữ liệu: ', error); });
  }, []);

  return (

    <div className='photosNetwork'>
      <div className="_text">
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

export default ProfileImages