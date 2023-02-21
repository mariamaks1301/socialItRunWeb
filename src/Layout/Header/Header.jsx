import React from 'react';
import HeaderSearch from './HeaderSearch';
import {IoIosNotifications} from 'react-icons/io';
import {HiChevronDoubleDown} from 'react-icons/hi';
import noUser from '../../assets/noUser.png';
import SwitchLang from './SwitchLand/SwitchLang';

const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <nav className="header__nav">
                    <div className='header__left'>
                        <h1 className='header__title'>It-RUN web</h1>
                        <HeaderSearch/>
                    </div>
                    <div className='header__right'>
                        <span className='header__notif'>
                            <IoIosNotifications/>
                        </span>
                        <SwitchLang/>
                        <span className='header__user'>
                            <img className='header__user-photo' src={noUser} alt="noUser" />
                            <span className='header__user-icon'>
                                <HiChevronDoubleDown/>
                            </span>
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;