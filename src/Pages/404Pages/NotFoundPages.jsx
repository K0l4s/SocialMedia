import React from 'react'
import './NotFoundPages.css'
import { Button } from '@chakra-ui/react'
const NotFoundPages = () => {
  return (
    <div className='notfoundpage'>
      <img src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-realistic-illustration-of-a-floating-astronaut-illustrated-in-cartoon-style-for-png-image_9227109.png"
       alt="spaceman" className="spaceman" />
       <h1 className='title'>Oops! Có vẻ như chúng ta đã ra khỏi vũ trụ!</h1>
       <button className='returnButton'>Quay trở về Trái Đất ngay!</button>
    </div>
  )
}

export default NotFoundPages