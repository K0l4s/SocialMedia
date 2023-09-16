import {AiFillBell, AiFillCompass, AiFillHome, AiFillMessage, AiFillPlusCircle, AiFillVideoCamera, AiOutlineBell, AiOutlineCompass, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch, AiOutlineVideoCamera} from 'react-icons/ai'
import { IoPersonCircleSharp, IoPersonOutline } from 'react-icons/io5'
export const menu=[
    {tittle:'Home',icon:<AiOutlineHome></AiOutlineHome>,iactiveIcon:<AiFillHome></AiFillHome>},

    {tittle:'Search',icon:<AiOutlineSearch></AiOutlineSearch>,iactiveIcon:<AiOutlineSearch></AiOutlineSearch>},
    
    {tittle:'Explore',icon:<AiOutlineCompass></AiOutlineCompass>,iactiveIcon:<AiFillCompass></AiFillCompass>},

    {tittle:'Reels',icon:<AiOutlineVideoCamera></AiOutlineVideoCamera>,iactiveIcon:<AiFillVideoCamera></AiFillVideoCamera>},

    {tittle:'Messages',icon:<AiOutlineMessage></AiOutlineMessage>,iactiveIcon:<AiFillMessage></AiFillMessage>},

    {tittle:'Nofication',icon:<AiOutlineBell></AiOutlineBell>,iactiveIcon:<AiFillBell></AiFillBell>},

    {tittle:'Create',icon:<AiOutlinePlusCircle></AiOutlinePlusCircle>,iactiveIcon:<AiFillPlusCircle></AiFillPlusCircle>},

    {tittle:'Profile',icon:<IoPersonOutline></IoPersonOutline>,iactiveIcon:<IoPersonCircleSharp></IoPersonCircleSharp>}
]