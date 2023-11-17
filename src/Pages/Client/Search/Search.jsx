import React, { useEffect, useState } from 'react'
import './Search.css'
import { BiSearchAlt } from 'react-icons/bi'
import UserLongCard from '../../../Components/UserLongCard/UserLongCard'

const Search = () => {

    const [keyWord, setKeyWord] = useState('')
    const [userDataList, setUserDataList] = useState([]); // Sử dụng useState để khởi tạo userDataList

    const setProviderKeyWord = (event) => {
        setKeyWord(event.target.value);
    }
    useEffect(() => {
        fetchUser();
    }, [keyWord]);
    const fetchUser = async () => {
        const response = await fetch('http://localhost:8081/users/search?keyWord=' + keyWord)
        const data = await response.json();
        // Sử dụng filter để loại bỏ phần tử có userID bằng userID từ localStorage
        const filteredData = data.filter(userData => userData.userID !== localStorage.getItem("userID"));

        // Cập nhật giá trị của userDataList bằng setData với mảng đã lọc
        setUserDataList(filteredData.map(userData => (
            <UserLongCard userData={userData} />
        )));
    }

    return (
        <div className='search'>
            <div className="search_Nav">
                <div className="input">
                    <BiSearchAlt onClick={fetchUser} className="search_icon" />
                    <input onInput={setProviderKeyWord} onChange={null} type="text" placeholder="Search" />
                </div>
            </div>
            <div className="search_content">
                <p>Search result</p>
                <div className="search_result_list">
                    {userDataList}
                </div>
            </div>
        </div>
    )
}

export default Search
