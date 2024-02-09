import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { sortUsersList } from '../../../services/services';
import { setLocalStorage, getLocalStorage } from '../../../utils/localStorage';

import styles from './UsersSort.module.css';

/*Компонент UsersSort страницы UsersPage, отображает два выпадающих списка,
которые необходимы для сортировка*/
const UsersSort = ({ setUsers, users, initialUsersList }) => {
   const [selectSortByPanel, setSelectSortByPanel] = useState('');
   const [selectSortOrderPanel, setSelectSortOrderPanel] = useState('');

   /*При первом рендеринге, если в local storage есть параметры по поиску пользователей, 
   то устанавливаем их в select и input*/
   useEffect(() => {
      if (getLocalStorage("sortby") && getLocalStorage("sortorder")) {
         setSelectSortByPanel(getLocalStorage("sortby"));
         setSelectSortOrderPanel(getLocalStorage("sortorder"));
      }
   }, [])

   /*При изменении значений в выпадающих списках, сортирует пользователей по ним*/
   useEffect(() => {
      if (users && selectSortByPanel && selectSortOrderPanel)
         setUsers(sortUsersList([...users], selectSortByPanel, selectSortOrderPanel));
      else if (users)
         setUsers([...initialUsersList]);
   }, [selectSortByPanel, selectSortOrderPanel]);

   /*Устанвливает переданный в функцию state и localStorage, по ключу и значению select*/
   const setStateAndStorage = (setState, storageKey, sortValue) => {
      setState(sortValue);
      setLocalStorage(storageKey, sortValue);
   }

   /*Устанвливает значения, при изменении параметра сортировки*/
   const handleSortBySelectChange = (e) => {
      if (e.target.value === '')
         setStateAndStorage(setSelectSortOrderPanel, 'sortorder', '');
      setStateAndStorage(setSelectSortByPanel, 'sortby', e.target.value);
   }

   /*Устанвливает значения, при изменении способа сортировки*/
   const handleSortOrderSelectChange = (e) => {
      setStateAndStorage(setSelectSortOrderPanel, 'sortorder', e.target.value);
   }

   return (
      <div>
         <h2 className="subtitle">Sort</h2>
         <div className={styles.sort__wrapper}>
            <select value={selectSortByPanel} onChange={handleSortBySelectChange} className="select">
               <option value="">--Sort by--</option>
               <option value="name">Name</option>
               <option value="age">Age</option>
               <option value="gender">Gender</option>
               <option value="address">Address</option>
            </select>
            <select value={selectSortOrderPanel} disabled={selectSortByPanel ? false : true}
               onChange={handleSortOrderSelectChange}
               className="select">
               <option value="">Default</option>
               <option value="atoz">A to Z</option>
               <option value="ztoa">Z to A</option>
            </select>
         </div>
      </div>
   )
}

UsersSort.propTypes = {
   setUsers: PropTypes.func,
   users: PropTypes.array,
   initialUsersList: PropTypes.array
}

export default UsersSort;