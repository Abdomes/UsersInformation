import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PropTypes } from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import { getApiResource } from '../../utils/network';
import UserModal from '../../components/ModalUserPage/UserModal/UserModal';
import Spinner from '../../components/Spinner';
import { API_USERS } from '../../constants/api';

import styles from './ModalUserPage.module.css';

/*Модальное окно с инорфмацией о пользователе,
 реализовал при помощи отдельной страницы ModalUserPage*/
const ModalUserPage = ({ setErrorApi }) => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      (async () => {
         const res = await getApiResource(`${API_USERS}/${id}`);
         if (res) {
            setUser(res);
            setLoading(false);
            setErrorApi(false);
         }
         else
            setErrorApi(true);
      })();
   }, []);

   const spinner = loading ? <Spinner /> : null;
   const userModal = user ? <UserModal user={user} /> : null;
   return (
      <>
         {spinner}
         {userModal}
      </>
   )
}

ModalUserPage.propTypes = {
   text: PropTypes.string
}

export default withErrorApi(ModalUserPage);