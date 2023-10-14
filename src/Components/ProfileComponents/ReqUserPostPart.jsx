import React, { useState } from 'react'
import './ReqUserPostPart.css'
import { IoFileTrayStacked, IoFileTrayStackedOutline } from 'react-icons/io5'
import {  AiFillFileImage, AiOutlineFileImage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { PiTag, PiTagFill } from 'react-icons/pi'

const ReqUserPostPart = () => {

    const [activeTab, setActiveTab] = useState();
    const navigator = useNavigate();
    const handleTabClick = (title) => {
        setActiveTab(title);
        const currentURL = window.location.href;
        const userID = currentURL.split('/')[4];
        if(title === 'Posts'){
            navigator('/profile/'+userID+'/');
        }
        else if(title === 'Images'){
            navigator('/profile/'+userID+'/image');
        }
        else if(title === 'Tags'){
            navigator('/profile/'+userID+'/tag');
        }
    }
    
    const tabs = [
        {
            tabs: 'Posts',
            icon: <IoFileTrayStackedOutline></IoFileTrayStackedOutline>,
            iactionIcon: <IoFileTrayStacked></IoFileTrayStacked>
        },
        {
            tabs: 'Images',
            icon: <AiOutlineFileImage></AiOutlineFileImage>,
            iactionIcon: <AiFillFileImage></AiFillFileImage>
        },
        {
            tabs: 'Tags',
            icon: <PiTag></PiTag>,
            iactionIcon: <PiTagFill></PiTagFill>
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