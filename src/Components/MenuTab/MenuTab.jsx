import React from 'react'
import './MenuTab.css'
import { Button, CloseButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Menu = (isOpen) => {
  const navigate = useNavigate();
  console.log(isOpen);
  if (isOpen.isOpen == false)
    return (null
    )
  else
    return (
      <div className="menuTab">
        <div onClick={()=>navigate("/changeinfo")} className="tabChild">Đổi thông tin</div>
        <div  className="tabChild">Đổi mật khẩu</div>
      </div>
    )
}

export default Menu