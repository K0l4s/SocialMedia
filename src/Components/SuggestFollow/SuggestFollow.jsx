import { Button, Card } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import './SuggestFollow.css'
import { BsPersonAdd } from 'react-icons/bs'
const SuggestFollow = (userData) => {
  if (userData.userData.userID === undefined)
    return (<p>Không tìm thấy người dùng</p>)
  else
  {
    if(userData.userData.avatarURL ==="" || 
    userData.userData.avatarURL === null || 
    userData.userData.avatarURL === undefined)
    userData.userData.avatarURL = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    return (
      <div >
        <div className='suggestFl'>

          <img src={userData.userData.avatarURL} alt="" />
          <div className="sfFill"></div>
          <div className="information">
            <p className="child">{userData.userData.firstName + " " + userData.userData.lastName}</p>
            <p className="child">{userData.userData.userName}</p>
          </div>
          <Button className='sgfButton'><BsPersonAdd></BsPersonAdd></Button>
        </div>
      </div>
    )
  }
}

export default SuggestFollow