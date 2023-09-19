import React from 'react'
import logo from '../../images/profile.jpg'
import './ProfileUserDetail.css'
import { AiOutlineSetting } from 'react-icons/ai'

export const ProfileUserDetail = () => {
    return (
        <div>
            <div className="top">
                <div className="image">
                    <img src={logo} alt="profile" />
                </div>
                <div className="row">
                    <div className="row_1">
                        <p className="username">username</p>
                        <button className="edit">EditProfile</button>
                        <div className="setting">
                            <AiOutlineSetting />
                        </div>
                    </div>
                    <div className="row_2">
                        <div className="ac_inf">
                            <span className='number'>10</span>
                            <span>posts</span>
                        </div>
                        <div className="ac_inf">
                            <span className='number'>10</span>
                            <span>followers</span>
                        </div>
                        <div className="ac_inf">
                            <span className='number'>10</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div className="name_and_bio">
                        <p className="name">Huỳnh Trung Kiên</p>
                        <p className="bio">Lorem Ipsum is simply dummy text of like Aldus PageMaker including versions of Lorem Ipsum</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
