import { PropTypes } from 'prop-types';

import UserLinkBack from '../UserLinkBack/UserLinkBack';

import styles from './UserModal.module.css';

/*Компонент UserModal страницы ModalUserPage,
который рендерит информацию о пользователе*/
const UserModal = ({ user }) => {
   return (
      <>
         <div className={styles.modal}>
            <div className={styles.modal__dialog}>
               <div className={styles.modal__content}>
                  <UserLinkBack />
                  <p><span>Full name: </span>{`${user.firstName} ${user.lastName}`}</p>
                  <p><span>Age: </span>{user.age}</p>
                  <p><span>Address: </span>{`${user.address.address} ${user.address.city}`}</p>
                  <p><span>Height: </span>{user.height}</p>
                  <p><span>Weight: </span>{user.weight}</p>
                  <p><span>Phone: </span>{user.phone}</p>
                  <p><span>Email: </span>{user.email}</p>
               </div>
            </div>
         </div>
      </>
   )
}

UserModal.propTypes = {
   text: PropTypes.string
}

export default UserModal;