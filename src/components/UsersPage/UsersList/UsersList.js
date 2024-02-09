import { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UsersList.module.css';

/*Возвращает массив объектов заголовков таблицы*/
const createHeaders = (headers) => {
   return headers.map((item) => ({
      text: item,
      ref: useRef(),
   }));
}

/*Компонент UsersList страницы UsersPage, отображает таблицу с пользователями, 
и позволяет изменять ширину ее столбцов*/
const UsersList = ({ users, headers }) => {
   const [tableHeight, setTableHeight] = useState("auto");
   const [activeIndex, setActiveIndex] = useState(null);
   const tableElement = useRef(null);
   const columns = createHeaders(headers);

   useEffect(() => {
      setTableHeight(tableElement.current.offsetHeight);
   }, []);

   const mouseDown = (index) => {
      setActiveIndex(index);
   };

   const mouseMove = useCallback(
      (e) => {
         const gridColumns = columns.map((col, i) => {
            if (i === activeIndex) {
               const width = e.clientX - col.ref.current.offsetLeft;
               if (400 >= width && width >= 50)
                  return `${width}px`;
            }
            return `${col.ref.current.offsetWidth}px`;
         });
         tableElement.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
      },
      [activeIndex, columns]
   );

   const removeListeners = useCallback(() => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", removeListeners);
   }, [mouseMove]);

   const mouseUp = useCallback(() => {
      setActiveIndex(null);
      removeListeners();
   }, [setActiveIndex, removeListeners]);

   useEffect(() => {
      if (activeIndex !== null) {
         window.addEventListener("mousemove", mouseMove);
         window.addEventListener("mouseup", mouseUp);
      }

      return () => {
         removeListeners();
      };
   }, [activeIndex, mouseMove, mouseUp, removeListeners]);

   return (
      <>
         <div className={styles.table__wrapper}>
            <table className={styles.table} ref={tableElement}>
               <thead>
                  <tr>
                     {columns.map(({ ref, text }, i) => (
                        <th ref={ref} key={text}>
                           <span>{text}</span>
                           <div
                              style={{ height: tableHeight }}
                              onMouseDown={() => mouseDown(i)}
                              className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
                           />
                        </th>
                     ))}
                  </tr>
               </thead>
               {
                  users.length ?
                     (<tbody>
                        {users.map(({ id, name, age, gender, phone, address }) =>
                           <tr key={id}>
                              <td><Link to={`/users/${id}`} ><span>{name}</span></Link></td>
                              <td><Link to={`/users/${id}`} ><span>{age}</span></Link></td>
                              <td><Link to={`/users/${id}`} ><span>{gender}</span></Link></td>
                              <td><Link to={`/users/${id}`} ><span>{phone}</span></Link></td>
                              <td><Link to={`/users/${id}`} ><span>{address}</span></Link></td>
                           </tr>
                        )}
                     </tbody>)
                     : null
               }
            </table >
         </div>
         {!users.length ? <h3 className={styles.descr}>There's no data.</h3> : null}
      </>
   )
}

UsersList.propTypes = {
   users: PropTypes.array,
   headers: PropTypes.array
}

export default UsersList;