import { useEffect, useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { debounce } from 'lodash';

import { API_USERS } from '../../../constants/api';
import { setUrl } from '../../../services/services';
import { setLocalStorage, getLocalStorage } from '../../../utils/localStorage';

import styles from './UsersSearch.module.css';

/*Компонент UsersSearch страницы UsersPage, отображает выпадающий список и строку для ввода,
которые необходимы для поиска*/
const UsersSearch = ({ getResource }) => {

   const [selectSearchPanel, setSelectSearchPanel] = useState('');
   const [inputSearchPanel, setInputSearchPanel] = useState('');

   /*debounce позволяет выполнить функцию debounceGetResource по отправке на сервер 1 раз за 300мс,*/
   const debounceGetResource = useCallback(debounce((url) => getResource(url), 300), [])

   /*При первом рендеринге, если в local storage есть параметры по поиску пользователей, 
   то устанавливаем их в select и input*/
   useEffect(() => {
      if (getLocalStorage("select") && getLocalStorage("input")) {
         setInputSearchPanel(getLocalStorage("input"));
         setSelectSearchPanel(getLocalStorage("select"));
      }
   }, [])

   /*Устанвливает переданный в функцию state и localStorage, по ключу и значению*/
   const setStateAndStorage = (setState, storageKey, inputValue) => {
      setState(inputValue);
      setLocalStorage(storageKey, inputValue);
   }

   /*Устанвливает значения и отправляет запрос, при изменении input*/
   const handleInputChange = (e) => {
      setStateAndStorage(setInputSearchPanel, 'input', e.target.value);
      debounceGetResource(setUrl(selectSearchPanel, e.target.value));
   }

   /*Устанвливает значения и отправляет запрос, при изменении select*/
   const handleSearchSelectChange = (e) => {
      setStateAndStorage(setSelectSearchPanel, 'select', e.target.value);
      if (e.target.value === '' && inputSearchPanel) {
         setStateAndStorage(setInputSearchPanel, 'input', '');
         debounceGetResource(API_USERS);
      }
      else if (inputSearchPanel)
         debounceGetResource(setUrl(e.target.value, inputSearchPanel));
   }

   return (
      <div>
         <h2 className="subtitle">Search</h2>
         <div className={styles.search__wrapper}>
            <select value={selectSearchPanel} onChange={handleSearchSelectChange} className="select">
               <option value="">--Select search column--</option>
               <option value="firstname">FirstName</option>
               <option value="lastname">LastName</option>
               <option value="age">Age</option>
               <option value="gender">Gender</option>
            </select>
            <input
               type="text"
               value={inputSearchPanel}
               onChange={handleInputChange}
               placeholder="At first, select the search column"
               className="search__input"
               disabled={selectSearchPanel ? false : true} />
         </div>
      </div>
   )
}

UsersSearch.propTypes = {
   getResource: PropTypes.func
}

export default UsersSearch;