import React from 'react';
import {useSelector} from "react-redux";

const Notifications = () => {

    const {user} = useSelector(store => store.user)



    console.log(user.notification)
    return (
        <section>
            <div className="container">

            </div>
        </section>
    );
};

export default Notifications;