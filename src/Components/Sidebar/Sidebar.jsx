import React, { useState } from 'react'
import logo from '../../images/logo.png'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { menu } from './SidebarConfig'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
import Create from '../../Pages/Form/Create/Create'
import Nofications from '../../Pages/Form/Nofications/Nofications'
const Sidebar = () => {
  const currentURL = window.location.pathname; // Lấy phần path của URL hiện tại
  const urlSegments = currentURL.split('/'); // Chia path thành các phần tử trong mảng

  const currentSub = urlSegments[1];
  let currentTab = "Home";
  if(currentSub==="messenger"){
    currentTab="Messages"
  } else if(currentSub==="reels"){
    currentTab="Reels"
  }else if(currentSub==="explore"){
    currentTab="Explore"
  }else if(currentSub==="username"){
    currentTab="Profile"
  }
  const [activeTab, setActiveTab] = useState(currentTab);

 

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => { setIsOpen(false); setActiveTab(currentTab) };

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate("/username");
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Messages") {
      navigate("/messenger");
    } else if (title === "Reels") {
      navigate("/reels");
    } else if (title === "Explore") {
      navigate("/explore");
    } else if (title === "Create") {
      setIsOpen(true);
    }
  };

  return (
    <div className="left">
      {/* Container */}
      <div className="container">
        {/* Logo */}
        <div className="logo" onClick={() => handleTabClick("Home")}>
          <img className="w-20" src={logo} alt="Logo" />
        </div>
        <hr></hr>
        {/* Menu */}
        <div className="mt-10">
          {menu.map((item) => (
            <div
              onClick={() => handleTabClick(item.title)}
              className="config-items"
            >
              {activeTab === item.title ? item.iactiveIcon : item.icon}
              <p className={`${activeTab === item.title ? "font-bold" : "font-semibold"}`}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* More */}
      <div className="config-more ">
        <IoReorderThreeOutline />
        <p className="ml-5">More</p>
      </div>
      <Nofications/>
      <Create isOpen={isOpen} onClose={onClose} />

    </div>
  );
};

export default Sidebar;
