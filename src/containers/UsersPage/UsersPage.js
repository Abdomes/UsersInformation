import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import UsersList from '../../components/UsersPage/UsersList';
import UsersSearch from '../../components/UsersPage/UsersSearch';
import UsersSort from '../../components/UsersPage/UsersSort';
import Spinner from '../../components/Spinner';
import { setUrl, sortUsersList } from '../../services/services';
import { getApiResource } from '../../utils/network';
import { API_USERS } from '../../constants/api';
import { getLocalStorage } from '../../utils/localStorage';

import styles from './UsersPage.module.css';

/*UsersPage рендерит страницу с таблицей, сортировкой и поиском пользователей*/
const UsersPage = ({ setErrorApi }) => {

   const [users, setUsers] = useState(null);
   const [initialUsersList, setInitialUsersList] = useState(null);
   const [loading, setLoading] = useState(true);

   /*Запрос на сервер */
   const getResource = async (url) => {
      setUsers(null);
      setLoading(true);
      const res = await getApiResource(url);

      if (res) {
         let usersList = res.users.map(({ id, firstName, lastName, age, gender, phone, address: { address, city } }) => (
            { id, name: `${firstName} ${lastName}`, age, gender, phone, address: `${city} ${address}` }
         ));

         /*Если в local storage есть параметры по сортировке пользователей, то сортируем их*/
         if (getLocalStorage("sortby") && getLocalStorage("sortorder"))
            setUsers(sortUsersList([...usersList], getLocalStorage("sortby"), getLocalStorage("sortorder")));
         else
            setUsers(usersList);

         setLoading(false);
         setInitialUsersList(usersList);

         setErrorApi(false);
      }
      else
         setErrorApi(true);
   }

   useEffect(() => {
      /*Если в local storage есть параметры по поиску пользователей, 
      то отправляем запрос по этим параметрам, иначе по базовому урлу*/
      if (getLocalStorage("select") && getLocalStorage("input"))
         getResource(setUrl(getLocalStorage("select"), getLocalStorage("input")));
      else
         getResource(API_USERS);
   }, []);

   /*Если запрос еще не завершен, то рендерится спинер*/
   const spinner = loading ? <Spinner /> : null;
   const usersList = users ? <UsersList users={users} headers={['Full name', 'Age', 'Gender', 'Phone', 'Address']} /> : null;
   return (
      <>
         <h1 className={styles.header__text}>Users Information</h1>
         <div className={styles.wrapper}>
            <UsersSort
               users={users}
               setUsers={setUsers}
               initialUsersList={initialUsersList}
            />
            <UsersSearch
               getResource={getResource}
            />
         </div>
         {usersList}
         {spinner}
      </>
   )
}

UsersPage.propTypes = {
   setErrorApi: PropTypes.func
}


export default withErrorApi(UsersPage);