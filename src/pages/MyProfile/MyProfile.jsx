import React, {useRef, useState} from 'react';
import {SlPencil} from "react-icons/sl"
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/reselect';
import axios from '../../utils/axios';
import { Button } from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import {FaRegSmileWink} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { fillUser } from '../../redux/reducers/user';


const MyProfile = () => {

    const image = useRef();
    const {user} = useSelector(userSelector);
    const [cover, setCover] = useState('');
    const [selectEmoji, setSelectEmoji] = useState(false);
    const [post, setPost] = useState('');
    const dispatch = useDispatch();

    const handleCover = async (e)=>{
        try {
            const formData = new FormData();
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData).then(({data})=> setCover(data.url))
              
        } catch (err) {
            console.log(err, 'Ошибка');
            alert('Ошибка при загрузке файла')
        }
    }

    const addPost = async ()=>{
        try {
            const res = await axios.patch(`/users/${user._id}/addpost`, {
                text: post,
                owner: user._id,
                id: uuidv4(),
                date: Date.now()
            })

            dispatch(fillUser(res.data));
            setPost('');
            
        } catch (err) {
            console.log(err);
            alert('He удалось добавить пост', err);
            
        }


    }
            

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__info" >
                    <img src={`${process.env.REACT_APP_URL}${cover}`}   alt="" className='profile__info-coverImage' />  
                    <div className="profile__info-top">
                        <button onClick={()=> image.current.click()} ref={image}  className="profile__info-cover" >
                            <SlPencil/>
                            Change cover
                        </button>
                        <input  onChange={handleCover} ref={image} hidden type="file" id='image' />
                    </div>
                    <div className="profile__info-bottom">
                        <div className="profile__info-avatar">
                            <img src={`${process.env.REACT_APP_URL}${user.image}`} alt="" className="profile__info-image"/>
                        </div>
                        <div className="profile__info-user">
                            <h3 className="profile__info-name">
                                {user.name} {user.surname}
                            </h3>
                            <a href="#" className="profile__info-about">
                                Enter information about yourself <span></span>
                            </a>
                        </div>
                        <button className="profile__info-change">
                            Change profile
                        </button>
                    </div>
                </div>
                <div className="profile__addPost">
                    <div className='profile__addPost-top'>
                        <textarea value={post} onChange={(e)=> setPost(e.target.value)} placeholder='Что у Вас нового?' className='profile__addPost-field' type="text" />
                        <div className='profile__addPost-emoji'>
                            {
                                selectEmoji ? 
                                <div onMouseLeave={()=> setSelectEmoji(false)} className='profile__emoji-block'>
                                    <EmojiPicker  onEmojiClick={(emoji)=> setPost(prev => post + emoji.emoji)} className='profile__emoji-picker'/> 
                                </div>
                                : 
                                <FaRegSmileWink style={{fontSize: '23px'}} onMouseEnter={()=> setSelectEmoji(true)} className='profile__emoji-icon'/>
                            }
                        </div>
                    </div>
                    <div className='profile__addPost-btns'>
                        <Button className="profile__addPost-btn" colorScheme='facebook'>Отменить</Button>
                        <Button onClick={addPost} className="profile__addPost-btn" colorScheme='facebook'>Опубликовать</Button>
                    </div>
                </div>
                <div className='profile__posts'>
                        <div className="profile__posts-top">
                            <Button className='profile__posts-btn' colorScheme='gray'>Все записи</Button>
                            <Button className='profile__posts-btn' colorScheme='gray'>Мои записи</Button>
                            <Button className='profile__posts-btn' colorScheme='gray'>Архив записей</Button>
                        </div>
                        <div className='profile__posts-row'>
                            {
                                
                            }
                        </div>
                    </div>
            </div>
        </section>      
    );
};

export default MyProfile;