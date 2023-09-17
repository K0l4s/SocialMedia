import React, { useState } from 'react'
import './ReqUserPostPart.css'
import { IoFileTrayStacked, IoFileTrayStackedOutline } from 'react-icons/io5'
import { AiFillCamera, AiFillFileImage, AiOutlineCamera, AiOutlineFileImage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const ReqUserPostPart = () => {

    const [activeTab, setActiveTab] = useState();
    const navigator = useNavigate();
    const handleTabClick = (title) => {
        setActiveTab(title);
        if(title === 'Post'){
            navigator('/username/');
        }
        else if(title === 'Images'){
            navigator('/username/image');
        }
        else if(title === 'Videos'){
            navigator('/username/video');
        }
    }
    
    const tabs = [
        {
            tabs: 'Post',
            icon: <IoFileTrayStackedOutline></IoFileTrayStackedOutline>,
            iactionIcon: <IoFileTrayStacked></IoFileTrayStacked>
        },
        {
            tabs: 'Images',
            icon: <AiOutlineFileImage></AiOutlineFileImage>,
            iactionIcon: <AiFillFileImage></AiFillFileImage>
        },
        {
            tabs: 'Videos',
            icon: <AiOutlineCamera></AiOutlineCamera>,
            iactionIcon: <AiFillCamera></AiFillCamera>
        }
    ]

    return (
        <div>

            <div className='tabs'>
                {tabs.map((item) => {
                    return (
                        <div className='items' onClick={()=>handleTabClick(item.tabs)}>
                            {activeTab === item.tabs ? item.iactionIcon : item.icon}
                            <p className={`${activeTab === item.tabs? 'font-bold': 'font-semibold'}`}>{item.tabs}</p> 
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default ReqUserPostPart