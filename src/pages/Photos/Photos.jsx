import React, {useRef, useState} from 'react';
import { Button, Input, CloseButton } from '@chakra-ui/react';
import axios from '../../utils/axios';
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from '../../redux/reselect';
import { v4 as uuidv4 } from 'uuid';
import {fillUser} from "../../redux/reducers/user";



const Photos = () => {

    const image = useRef();

    const [photo, setPhoto] = useState('');
    const [desc, setDesc] = useState('');
    const {user} = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleImage = async (e)=>{
        try {
            const formData = new FormData();
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData).then(({data})=> setPhoto(data.url))
              
        } catch (err) {
            console.log(err, 'Ошибка');
            alert('Ошибка при загрузке файла')
        }
    }

    const resetHandler = ()=>{
        setPhoto('');
        setDesc('');
    }

    const addPhoto = async () => {
        try {
            const res = await axios.patch(`/users/${user._id}/addphoto`, {
                url: photo,
                description: desc,
                id: uuidv4()
            })
            dispatch(fillUser(res.data))

            setDesc('')
            setPhoto('')
            
        } catch (err) {
            console.log(err)
            alert('He удалосьь опубликовать картинку', err)
        }
       

    }

    const deletePhoto = async () =>{
        try {
            const res = await axios.patch(`/users/${user._id}/deletephoto`, {
                url: photo,
                description: desc,
                id: uuidv4()
            })
            dispatch(fillUser(res.data))
            
        } catch (err) {
            console.log(err)
            alert('He удалосьь удалить картинку', err)
        }
    }

    return (
        <section className='photos'>
            <div className="container">
                <div className="photos__content">
                    <div className='photos__top'>
                        <h2 className='photos__images'>Мои фотографии</h2>
                        <div className="photos__btns">
                            <Button colorScheme='gray'>Создать альбом</Button>
                            <Button onClick={()=> image.current.click()} colorScheme='facebook'>Добавить фотографию</Button>


                            <input  onChange={handleImage} ref={image} hidden type="file" id='image' />
                        </div>
                    </div>

                    {
                        photo.length ? 
                            <>
                                <div className='photos__row-block'>
                                    <div className='photos__image' >
                                        <CloseButton className='photos__image-close' onClick={resetHandler} />
                                        <img data-fancybox data-caption={desc} data-src={`${process.env.REACT_APP_URL}${photo}`} className='photos__image-img' src={`${process.env.REACT_APP_URL}${photo}`}  alt="" />
                                        <Input value={desc} onChange={(e)=> setDesc(e.target.value)}  className='photos__image-field' type="text"  placeholder='Добавить описание' width='300px'  />
                                    </div>
                                </div>
                              
                                <Button onClick={addPhoto} colorScheme='facebook' size='md'>
                                     Опубликовать на моей странице
                                </Button>
                            </>
                        : user.photos.length ? 
                        <div className='photos__row'>
                            {
                                user.photos.map( item => (
                                    <div className='photos__card' key={item.id}>
                                        <img  data-fancybox='gallery' data-caption={item.description} className='photos__row-img' src={`${process.env.REACT_APP_URL}${item.url}`} alt=""/>
                                        <p className='photos__row-desc'>{item.description}</p>
                                        <Button onClick={deletePhoto} className='photos__btn-delete' colorScheme='gray'>Удалить фото</Button>
                                    </div>
                                ))
                            }
                        </div>
                        :   <div className='photos__empty'>
                                Вы можете загружать тысячи фотографий в IT-web и помещать их в альбомы.
                            </div>
                    }
                    

                    


                </div>
            </div>  
        </section>
    );
};

export default Photos;