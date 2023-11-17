import { Button, Input } from '@chakra-ui/react'
import React from 'react'

const ResetPassword = () => {
  return (
    <div>
        <Input type='email' placeholder='Nhập Email Khôi Phục!'/>
        <Button>GỬI</Button>
        <p>Lưu ý: Form đổi mật khẩu sẽ được gửi về Email bạn đã đăng ký với chúng tôi. Vui lòng kiểm tra email!</p>
        <p>Nhấn vào đây để gửi lại email khôi phục!</p>
    </div>
  )
}

export default ResetPassword