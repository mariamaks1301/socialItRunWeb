import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../redux/reselect';
import {SlPencil} from "react-icons/sl"
import axios from '../../utils/axios';
import { useTranslation } from 'react-i18next';
import { day, months, year} from '../../utils/birthday';



const EditMyProfile = () => {

    const image = useRef();
    const {user} = useSelector(userSelector);
    const [cover, setCover] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();

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
        <section className='editMyProfile'>
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
                                
                            </div>
                            <button onClick={()=> navigate('/editmyprofile')} className="profile__info-change">
                                Change profile
                            </button>
                        </div>
                </div>
                <div className="editMyProfile__content">
                    <div className='editMyProfile__card'>
                            <label className='editMyProfile__label' htmlFor="info">
                                Краткая информация
                            </label>
                            <textarea className='editMyProfile__field' id='info'/>   
                    </div>
                    <div className='editMyProfile__card'>
                            <label className='editMyProfile__label' htmlFor="family">
                                Семейное положение
                            </label>
                            <select className='editMyProfile__select'  id="family">
                                <option value="">Не выбрано</option>
                                <option value="single">Не женат/замужем</option>
                                <option value="married">Женат/Замужем</option>
                                <option value="meeting">Встречаюсь</option>
                                <option value="fallinlove">Влюблен</option>
                                <option value="engaged">Помолвлен/Помолвлена</option>
                                <option value="dificult">Все сложно</option>
                                <option value="searching">В активном поиске</option>
        
                            </select>  
                    </div>
                    <div className='editMyProfile__card'>
                            <label className='editMyProfile__label' htmlFor="birthday">
                                Дата рождения
                            </label>
                            <select  id="birthday" className='editMyProfile__select'>
                                {
                                    day.map((item)=>(
                                        <option aria-hidden className='editMyProfile__option' key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>  
                            <select  id="birthday" className='editMyProfile__select'>
                                {
                                    months.map((item)=>(
                                        <option className='editMyProfile__option' key={item.en} value={item.en}>{i18n.language === 'ru' ? item.ru : item.en}</option>
                                    ))
                                }
                            </select>  
                            <select  id="birthday" className='editMyProfile__select'>
                                {
                                    year.map((item)=>(
                                        <option className='editMyProfile__option' key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>  
                    </div>
                    
                </div>

            </div>  
        </section>
    );
};

export default EditMyProfile;