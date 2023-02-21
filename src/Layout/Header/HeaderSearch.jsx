import React from 'react';
import { useTranslation } from 'react-i18next';
import {FiSearch} from 'react-icons/fi';



const HeaderSearch = () => {
    const {t} = useTranslation();
    return (
        <label htmlFor="" className='header__search'>
                            <span className='header__search-icon'>
                                <FiSearch/>
                            </span>
                            <input placeholder={t('header.field')} className='header__search-field' type="text" />
                        </label>
    );
};

export default HeaderSearch;