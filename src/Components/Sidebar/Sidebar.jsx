import React, { useState } from 'react'
import logo from '../../images/logo.png'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { menu } from './SidebarConfig'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
     const [activeTab, setActiveTab] = useState();
     const navigate = useNavigate();

     const handleTabClick = (title) => {
          setActiveTab(title);
          if (title === "Profile") {
               navigate("/username");
          }
          else if (title === "Home") {
               navigate("/");
          }
          else if (title === "Messages") {
               navigate("/messages");
          }
          else if (title === "Reels") {
               navigate("/reels");
          }
          else if (title === "Explore") {
               navigate("/explore");
          }
     }

     return (
          <div className="left">

               {/* Container */}
               <div className="container">

                    {/* Logo */}
                    <div className="logo" onClick={()=>handleTabClick("Home")}>
                         <img className="w-20" src={logo} alt="Logo" />
                    </div>
                    <hr></hr>
                    {/* Menu */}
                    <div className="mt-10">
                         {menu.map((item) =>
                              <div onClick={() => handleTabClick(item.title)} className="config-items">
                                   {activeTab === item.title? item.iactiveIcon: item.icon}
                                   <p className={`${activeTab === item.title? "font-bold": "font-semibold"}`}>{item.title}</p> 
                              </div>)}
                    </div>
               </div>

               {/* More */}
               <div className="config-more ">
                    <IoReorderThreeOutline />
                    <p className="ml-5">More</p>
               </div>
          </div>
     )
}

export default Sidebar