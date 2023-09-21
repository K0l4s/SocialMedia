import {AiFillBell, AiFillCompass, AiFillHome, AiFillMessage, AiFillPlusCircle, AiFillVideoCamera, AiOutlineBell, AiOutlineCompass, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch, AiOutlineVideoCamera} from 'react-icons/ai'
import { IoPersonCircleSharp, IoPersonOutline} from 'react-icons/io5'
import {RiFileSearchFill} from 'react-icons/ri'
import './Sidebar.css'
export const menu=[
    {title:'Home',icon:<AiOutlineHome className='jsconfig'></AiOutlineHome>,iactiveIcon:<AiFillHome className='jsconfig'></AiFillHome>},

    {title:'Search',icon:<AiOutlineSearch className='jsconfig'></AiOutlineSearch>,iactiveIcon:<RiFileSearchFill className='jsconfig'></RiFileSearchFill>},
    
    {title:'Explore',icon:<AiOutlineCompass className='jsconfig'></AiOutlineCompass>,iactiveIcon:<AiFillCompass className='jsconfig'></AiFillCompass>},

    {title:'Reels',icon:<AiOutlineVideoCamera className='jsconfig'></AiOutlineVideoCamera>,iactiveIcon:<AiFillVideoCamera className='jsconfig'></AiFillVideoCamera>},

    {title:'Messages',icon:<AiOutlineMessage className='jsconfig'></AiOutlineMessage>,iactiveIcon:<AiFillMessage className='jsconfig'></AiFillMessage>},

    {title:'Notification',icon:<AiOutlineBell className='jsconfig'></AiOutlineBell>,iactiveIcon:<AiFillBell className='jsconfig'></AiFillBell>},

    {title:'Create',icon:<AiOutlinePlusCircle className='jsconfig'></AiOutlinePlusCircle>,iactiveIcon:<AiFillPlusCircle className='jsconfig'></AiFillPlusCircle>},

    {title:'Profile',icon:<IoPersonOutline className='jsconfig'></IoPersonOutline>,iactiveIcon:<IoPersonCircleSharp className='jsconfig'></IoPersonCircleSharp>}
]