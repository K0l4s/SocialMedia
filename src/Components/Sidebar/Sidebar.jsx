import React from 'react'
import logo from '../../images/logo.png'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { menu } from './SidebarConfig'

const Sidebar = () => {
  return (
    <div>
      <div>
        <div>
          <img className='w-40' src={logo} alt="Logo" />
        </div>
        <div className='mt-10'>
          {menu.map((item) => <div className='flex items-center mb-5 cursor-pointer text-lg'>
            <p>{item.tittle}</p>
            {item.icon}
          </div> )}
        </div>
      </div>

      <div className='flex items-center cursor-pointer'>
        <IoReorderThreeOutline />
        <p className="ml-5">More</p>
      </div>
    </div>
  )
}

export default Sidebar