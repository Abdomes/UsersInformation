import { useLocation } from 'react-router';
import img from './img/not-found.png';
import styles from './NotFoundPage.module.css';

/*NotFoundPage рендерит страницу с ошибкой, если не нашелся подходящий роутинг*/
const NotFoundPage = () => {

   let location = useLocation();

   return (
      <div className={styles.wrapper}>
         <img className={styles.img} src={img} alt="Not Found" />
         <p className={styles.text}>No match for <u>{location.pathname}</u></p>
      </div>
   )
}

export default NotFoundPage;