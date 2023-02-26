import React from 'react';
import {IoMdNotifications} from 'react-icons/io';
import HeaderSearch from "./HeaderSearch";
import {BiChevronsDown} from 'react-icons/bi';
import SwitchLang from "./SwitchLang/SwitchLang";
import {Link} from "react-router-dom";
import {AiFillSetting} from 'react-icons/ai';
import {MdOutlineLanguage} from 'react-icons/md';
import {BsPaletteFill} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';

import {
    Avatar,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Icon
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../redux/reducers/user";
import { useTranslation } from 'react-i18next';

const Header = () => {

    const dispatch = useDispatch()
    const {t} = useTranslation();

    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <div className='header__left'>
                        <Link to={'/'}>
                            <h1 className='header__title'>IT-RUN web</h1>
                        </Link>

                        <HeaderSearch/>
                    </div>
                    <div className='header__right'>
                        <span className='header__notif'>
                            <IoMdNotifications/>
                        </span>


                        <Popover  placement='top-end'  isLazy>
                            <PopoverTrigger>
                                <Button  className='header__user'>
                                    <Avatar  name='Max Birimkulov' src=''/>
                                    <span className='header__user-icon'>
                                <BiChevronsDown/>
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent  bg='black'>
                                <PopoverCloseButton  />
                                <PopoverArrow   bg='black'/>
                                <div className='header__popover'>
                                    <div className='header__popover-top'>
                                        <Avatar bg={'red'} name="Maria Maks" className='header__popover-img'   src='https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'/>
                                        <div>
                                            <h3 className='header__popover-title'>Maria Maks</h3>
                                            <p className='header__popover-num'>+996 555 55 55 55</p>
                                        </div>
                                    </div>
                                    <ul className='header__popover-list'>
                                        <li className='header__popover-item'>
                                            <Icon  as={AiFillSetting}/>
                                            <span className='header__popover-text'>{t('header.popupSettings')}</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon  as={BsPaletteFill}/>
                                            <span className='header__popover-text'>{t('header.popupTheme')}</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon as={MdOutlineLanguage}/>
                                            <SwitchLang/>
                                        </li>
                                        <li className='header__popover-item' onClick={() => dispatch(logOutUser())}>
                                            <Icon  as={FiLogOut}/>
                                            <span className='header__popover-text'>{t('header.popupExit')}</span>
                                        </li>
                                    </ul>

                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;