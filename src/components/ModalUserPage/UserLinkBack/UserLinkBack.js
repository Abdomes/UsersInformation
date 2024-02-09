import { useNavigate } from "react-router-dom";
import iconBack from './img/back.svg';

import styles from './UserLinkBack.module.css';

/*Компонент UserLinkBack страницы ModalUserPage, который рендерит,
 введущую на предыдущую страницу при помощю useNavigate()*/
const UserLinkBack = () => {

   const navigate = useNavigate();
   const handleGoBack = e => {
      e.preventDefault();
      navigate(-1);
   }

   return (
      <a href='#' onClick={handleGoBack} className={styles.link}>
         <img src={iconBack} alt='Go back' className={styles.link__img} />
         <span > Go back</span>
      </a >
   )
}


export default UserLinkBack;