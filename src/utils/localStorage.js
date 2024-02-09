/*Получает данные из local storage по ключю*/
export const getLocalStorage = (key) => {
   const data = localStorage.getItem(key);

   if (data !== null)
      return JSON.parse(data);

   return false;
}

/*Установка данных в local storage по ключю */
export const setLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
}