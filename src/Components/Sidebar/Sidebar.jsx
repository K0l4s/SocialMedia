import React, { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { menu } from './SidebarConfig'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
import Create from '../../Components/Form/Create/Create'
import Nofications from '../../Components/Form/Nofications/Nofications'
import { getAuth, signOut } from "firebase/auth";
import { useToast } from '@chakra-ui/react'
import MenuTab from '../MenuTab/MenuTab'

const Sidebar = () => {
  var newPostID;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const changeMenuIsOpen = () => {
    if (menuIsOpen == false)
      setMenuIsOpen(true);
    else
      setMenuIsOpen(false);
  }

  const toast = useToast();
  const currentURL = window.location.pathname; // Lấy phần path của URL hiện tại
  const urlSegments = currentURL.split('/'); // Chia path thành các phần tử trong mảng
  const currentSub = urlSegments[1];
  let currentTab = "Home";
  if (currentSub === "reels") {
    currentTab = "Reels"
  } else if (currentSub === "explore") {
    currentTab = "Explore"
  } else if (currentSub === "username") {
    currentTab = "Profile"
  }
  else if (currentSub === "search") {
    currentTab = "Search"
  }
  const [activeTab, setActiveTab] = useState(currentTab);



  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => { setIsOpen(false); setActiveTab(currentTab) };

  const [isOpenNof, setIsOpenNof] = useState(false);
  const onCloseNof = () => { setIsOpenNof(false); setActiveTab(currentTab) }
  let userID = null;
  const userDataJSON = localStorage.getItem('userData');
  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    if (userData.userID != null)
      userID = userData.userID;
  }
  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate("/profile/" + userID);
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Explore") {
      navigate("/explore");
    } else if (title === "Create") {
      setIsOpen(true);
    } else if (title === "Search") {
      navigate("/search");
    } else if (title === "Notification") {
      setIsOpenNof(true);
    } else if (title === "Logout") {

      const auth = getAuth();
      signOut(auth).then(() => {
        localStorage.removeItem("userData");
        localStorage.removeItem("userID");
        localStorage.removeItem("userAvatar");
        toast({
          position: 'bottom-right',
          title: 'Logout successfully.',
          description: "You're logout successfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,

        })
        navigate("/signin");
      }).catch((error) => {
      });

    }
  };

  return (
    <div className="left">
      {/* Container */}
      <div className="container">
        {/* Logo */}
        <div className="logo" onClick={() => handleTabClick("Home")}>
          <img className="w-20" src="https://i.ibb.co/QkmDvRW/a1c08598-d175-48b4-a39e-2f9c66b0d55a.jpg" alt="Logo" />
        </div>
        <hr />
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
      <div onClick={changeMenuIsOpen} className="config-more ">
        <FiSettings />
        <p className="ml-5">More</p>
      </div>
      <Nofications isOpen={isOpenNof} onClose={onCloseNof} />
      <Create isOpen={isOpen} onClose={onClose} onPostCreated={newPostID}  />
      <MenuTab isOpen={menuIsOpen} onClose={changeMenuIsOpen} />
    </div>
  );
};

export default Sidebar;
