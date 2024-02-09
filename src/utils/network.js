/**
 * Отправляет запрос Fetch
 * @param {String} url - url для запроса 
 * @returns {Promise} - promise с результатом запроса
 */
export const getApiResource = async (url) => {
   try {
      const res = await fetch(url);

      if (!res.ok) {
         console.error('Could not fetch.', res.status);
         return false;
      }

      return await res.json();
   } catch (error) {
      console.error('Could not fetch.', error.message);
   }
}
