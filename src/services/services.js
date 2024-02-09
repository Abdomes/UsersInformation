import { API_SEARCH, API_USERS } from '../constants/api';
/**
 * Составляет url, если параметры не пустые - отправляет запрос поиска, иначе - базовый запрос
 * @param {String} value - значение по которому осуществляется поиск 
 * @param {String} param - значение, которое вводит пользователь в input 
 * @returns {String} - url - либо базовый, либо с параметрами для поиска
 */
export const setUrl = (value, param = '') => {
   let url = API_SEARCH;
   switch (value) {
      case 'firstname':
         url += 'firstName&value=';
         break;
      case 'lastname':
         url += 'lastName&value=';
         break;
      case 'age':
         url += 'age&value=';
         break;
      case 'gender':
         url += 'gender&value=';
         break;
      default:
         url = API_USERS;
         param = '';
         break;
   }
   url = param === '' ? API_USERS : url;
   return url + param;
}
/**
 * Сортирует массив по определенному признаку и порядку
 * @param {Arra} usersList - массив, который необходимо отсортировать
 * @param {String} sortBy - признак, по которму осуществляется сортировка
 * @param {String} sortOrder - порядок сортировки
 * @returns {String} - отсортированный массив
 */
export const sortUsersList = (usersList, sortBy, sortOrder) => {
   if (sortOrder === "atoz")
      switch (sortBy) {
         case 'age':
            usersList.sort((a, b) => Number(a.age) - Number(b.age));
            break;
         case 'name':
            usersList.sort((a, b) => ('' + a.name).localeCompare(b.name));
            break;
         case 'gender':
            usersList.sort((a, b) => ('' + a.gender).localeCompare(b.gender));
            break;
         case 'address':
            usersList.sort((a, b) => ('' + a.address).localeCompare(b.address));
            break;
         default:
      }
   if (sortOrder === "ztoa")
      switch (sortBy) {
         case 'age':
            usersList.sort((a, b) => Number(b.age) - Number(a.age));
            break;
         case 'name':
            usersList.sort((a, b) => ('' + b.name).localeCompare(a.name));
            break;
         case 'gender':
            usersList.sort((a, b) => ('' + b.gender).localeCompare(a.gender));
            break;
         case 'address':
            usersList.sort((a, b) => ('' + b.address).localeCompare(a.address));
            break;
         default:
      }
   return usersList;
}