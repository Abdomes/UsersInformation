const ROOT = 'https://dummyjson.com/';
const USERS = 'users';
const SEARCH = 'filter?key=';
/*Базовый ul, по которому находится информация о всех пользователях*/
export const API_USERS = ROOT + USERS;
/*url по поиску пользователей, к которому добавляются параметры, установленные пользователем*/
export const API_SEARCH = API_USERS + '/' + SEARCH;