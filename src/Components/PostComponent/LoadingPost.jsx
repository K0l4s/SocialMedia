import { CircularProgress } from '@chakra-ui/react'
import React from 'react'
import './LoadingPost.css'

const LoadingPost = () => {
    return (
        <div className='loading'>
            <div className="load">
            <p>Đang lấy thông tin bài viết...</p>
             <CircularProgress isIndeterminate color='green.300'/>
             </div>
            <div className="child">
                <div className="effect"></div>
                <div className="effect"></div>
                <div className="effect"></div>
                <div className="effect"></div>
            </div>
        </div>
    )
}

export default LoadingPost