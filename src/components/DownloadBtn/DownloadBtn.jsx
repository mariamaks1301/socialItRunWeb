import React, {useRef} from 'react';
import axios from "../../utils/axios";
import {Button} from "@chakra-ui/react";
import {BsTrash} from 'react-icons/bs';

const DownLoadBtn = ({images,setImages}) => {
    const image = useRef()

    const handleChangeImage1 = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            await axios.post('/upload', formData).then(({data}) =>  setImages(data.url))

        } catch (err){
            console.log(e)
            console.log(err, 'Ошибка')
            alert('Ошибка при загрузке файла')
        }

    }

    return (
        <li className='downloadBtn__item'>
            <Button className='downloadBtn__add' onClick={() => image.current.click()} type='button' variant="contained" color="success">
                Загрузить картинку
            </Button>
            <input ref={image}  hidden  type="file" onChange={handleChangeImage1} id='image'/>
            {
                images && (
                    <>
                        <img  className='downloadBtn__img' src={`http://localhost:4444${images}`} alt="Uploaded"/>

                        <Button className='downloadBtn__del' onClick={() => setImages('')} type='button' variant="contained">
                           <BsTrash/>
                        </Button>
                    </>
                )
            }
        </li>
    );
};

export default DownLoadBtn;