import React from 'react';
import {useNavigate} from "react-router-dom"
import {BiUserCircle} from "react-icons/bi"
import {HiOutlineUsers} from "react-icons/hi"
import {IoMdNotifications} from 'react-icons/io';
import {CiSquareQuestion} from 'react-icons/ci';

const HomeAside = () => {

    const navigate = useNavigate()

    return (
        <aside className="aside">
            <ul className="aside__menu">
                <li className="aside__item" onClick={() => navigate('/myprofile')}>
                    <BiUserCircle style={{fontSize: '20px'}}/>
                    My profile
                </li>
                <li className="aside__item" onClick={() => navigate('/friends')}>
                    <HiOutlineUsers style={{fontSize: '20px'}}/>
                    Friends
                </li> 
                <li className="aside__item" onClick={() => navigate('/notifications')}>
                    <IoMdNotifications style={{fontSize: '20px'}}/>
                    Notifications
                </li> 
                <li className="aside__item" onClick={() => navigate('/requests')}>
                    <CiSquareQuestion style={{fontSize: '20px'}}/>
                    Requests
                </li> 
                <li className="aside__item" onClick={() => navigate('/findfriends')}>
                    <HiOutlineUsers style={{fontSize: '20px'}}/>
                    Find friends
                </li> 
                <li className="aside__item" onClick={() => navigate('/friends')}>
                    <HiOutlineUsers style={{fontSize: '20px'}}/>
                    Friends
                </li> 
            </ul>
        </aside>
    );
};

export default HomeAside;