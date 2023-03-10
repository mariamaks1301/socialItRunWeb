import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Input } from '@chakra-ui/react';
import HomeAside from '../../components/HomeAside/HomeAside';
import { userSelector } from '../../redux/reselect';
import EmojiPicker from 'emoji-picker-react';
import {FaRegSmileWink} from 'react-icons/fa';
import axios from '../../utils/axios';



const Chat = () => {

    const {user} = useSelector(userSelector);
    const [selectEmoji, setSelectEmoji] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(()=>{
        axios(`/users?friends=${user.friends.join(',')}`)
        .then(({data})=>setFriends(data))
    }, [])

    console.log(friends);

    
    return (
        <section className='chat'>
            <HomeAside/>
            <div className="chat__content">
                <div className="chat__sidebar">
                    <div className="chat__search">
                        <input type="text" />

                    </div>
                    <div className="chat__friends">
                        {
                            friends.map((item)=>(
                                <Avatar key={item._id} src={`${process.env.REACT_APP_URL}${item.image}`}/>
                            ))
                        }
                      
                 

                    </div>
                    <div className="chat__list">
                        <div className='header__popover-top chat__popover-item'>
                            <Avatar name={`${user.name}${user.surname}`} className='header__popover-img'   src={`${process.env.REACT_APP_URL}${user.image}`}/>
                            <div>
                                <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                <p className='header__popover-num'>Last message</p>
                            </div>
                        </div>
                        <div className='header__popover-top chat__popover-item'>
                            <Avatar name={`${user.name}${user.surname}`} className='header__popover-img'   src={`${process.env.REACT_APP_URL}${user.image}`}/>
                            <div>
                                <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                <p className='header__popover-num'>Last message</p>
                            </div>
                        </div>
                        <div className='header__popover-top chat__popover-item'>
                            <Avatar name={`${user.name}${user.surname}`} className='header__popover-img'   src={`${process.env.REACT_APP_URL}${user.image}`}/>
                            <div>
                                <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                <p className='header__popover-num'>Last message</p>
                            </div>
                        </div>
                        <div className='header__popover-top chat__popover-item'>
                            <Avatar name={`${user.name}${user.surname}`} className='header__popover-img'   src={`${process.env.REACT_APP_URL}${user.image}`}/>
                            <div>
                                <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                <p className='header__popover-num'>Last message</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="chat__block">
                    <div className="chat__block-top">
                        <div>Name Surname</div>
                        <Avatar/>
                    </div>

                    <div className="chat__block-bottom">
                        <Input className='chat__block-field' placeholder='Basic usage' />
                        {
                                selectEmoji ? 
                                <div onMouseLeave={()=> setSelectEmoji(false)} className='profile__emoji-block chat__block-emoji'>
                                    <EmojiPicker  className='profile__emoji-picker chat__emoji-picker'/> 
                                </div>
                                : 
                                <FaRegSmileWink style={{fontSize: '23px'}} onClick={()=> setSelectEmoji(true)} className='profile__emoji-icon chat__block-icon' />
                            }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chat;