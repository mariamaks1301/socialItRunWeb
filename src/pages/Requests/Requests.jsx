import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCancelRequestMutation, useGetRequestsQuery } from '../../redux/reducers/requests';
import { Image, Button } from '@chakra-ui/react';
import { fillUser } from '../../redux/reducers/user';
import { userSelector } from '../../redux/reselect';


const Requests = () => {

        
    const {user} = useSelector(userSelector);
    const dispatch = useDispatch();
    
    const [cancelRequest, obj] = useCancelRequestMutation();

    if(obj.data){
        dispatch(fillUser(obj.data))
    }

    const {data = [], isLoading} = useGetRequestsQuery(obj.data ? obj.data.requests : user.requests);
    
    const handleCancelRequest = async (id) => {
        await cancelRequest({ senderId: user._id, recieverId: id }).unwrap()
        
        
    }
 
    

    if(isLoading){
        return <h2 style={{color: 'red'}}>Loading...</h2>
    }


    return (
        <div className='requests'>
            <div className="container">
                <div className="requests__row requests__content">
                    <h2 className='requests__title'>Запросы</h2>
                    {
                        data.map((item) => (
                            <div key={item._id} className='notification__card'>
                                    <div className='notification__card-row'>
                                        <Image
                                            fallbackSrc='https://via.placeholder.com/100'
                                            borderRadius='full'
                                            boxSize='100px'
                                            src={`${process.env.REACT_APP_URL}${item.image}`}
                                            alt={`${item.name}${item.surname}`}
                                        />
                                        <div className='notification__info'>
                                            <p className='notification__info-name'>{item.name} {item.surname}</p>
                                            <p className='notification__info-action'>Хочет добавить Вас в друзья</p>
                                            <p className='notification__info-city'>{`Город ${item.city}`}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='notification__btns'>
                                        <Button onClick={()=> handleCancelRequest(item._id)}  className='notification__btn notification__btn-reject' colorScheme='gray'>Отменить</Button>
                                        
                                    </div>
                                    
                                </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Requests;