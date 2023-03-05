import React, {useRef, useState} from 'react';
import {SlPencil} from "react-icons/sl"
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/reselect';
import axios from '../../utils/axios';

const MyProfile = () => {

    const image = useRef();
    const {user} = useSelector(userSelector);

    const [cover, setCover] = useState('');

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
            </div>
        </section>
    );
};

export default MyProfile;