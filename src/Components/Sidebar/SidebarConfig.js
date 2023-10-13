import {AiFillBell, AiFillCompass, AiFillHome, AiFillMessage, AiFillPlusCircle, AiOutlineBell, AiOutlineCompass, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch} from 'react-icons/ai'
import { IoPersonCircleSharp, IoPersonOutline} from 'react-icons/io5'
import {BiLogOutCircle} from 'react-icons/bi'
import {RiFileSearchFill} from 'react-icons/ri'
import './Sidebar.css'
export const menu=[
    {title:'Home',icon:<AiOutlineHome className='jsconfig'></AiOutlineHome>,iactiveIcon:<AiFillHome className='jsconfig'></AiFillHome>},

    {title:'Search',icon:<AiOutlineSearch className='jsconfig'></AiOutlineSearch>,iactiveIcon:<RiFileSearchFill className='jsconfig'></RiFileSearchFill>},
    
    {title:'Explore',icon:<AiOutlineCompass className='jsconfig'></AiOutlineCompass>,iactiveIcon:<AiFillCompass className='jsconfig'></AiFillCompass>},

    {title:'Messages',icon:<AiOutlineMessage className='jsconfig'></AiOutlineMessage>,iactiveIcon:<AiFillMessage className='jsconfig'></AiFillMessage>},

    {title:'Notification',icon:<AiOutlineBell className='jsconfig'></AiOutlineBell>,iactiveIcon:<AiFillBell className='jsconfig'></AiFillBell>},

    {title:'Create',icon:<AiOutlinePlusCircle className='jsconfig'></AiOutlinePlusCircle>,iactiveIcon:<AiFillPlusCircle className='jsconfig'></AiFillPlusCircle>},

    {title:'Profile',icon:<IoPersonOutline className='jsconfig'></IoPersonOutline>,iactiveIcon:<IoPersonCircleSharp className='jsconfig'></IoPersonCircleSharp>},

    {title:'Logout',icon:<BiLogOutCircle className='jsconfig'></BiLogOutCircle>,iactiveIcon:<IoPersonCircleSharp className='jsconfig'></IoPersonCircleSharp>}
]