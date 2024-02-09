import styles from './ErrorMessage.module.css';

/*Компонент ErrorMessage рендерится, если произошла ошибка при запросе на сервер*/
const ErrorMessage = () => {
   return (
      <>
         <p className={styles.text}>
            Something went wrong.<br />
            Please try again later.
         </p>
      </>
   )
}

export default ErrorMessage;