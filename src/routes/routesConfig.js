import UsersPage from '../containers/UsersPage';
import ModalUserPage from '../containers/ModalUserPage';
import NotFoundPage from '../containers/NotFoundPage';

/*Масив объктов с путями и элементами, которые показываются по нему*/
const routesConfig = [
   {
      path: '/',
      element: <UsersPage />
   },
   {
      path: '/users/:id',
      element: <ModalUserPage />
   },
   {
      path: '*',
      element: <NotFoundPage />
   }
];

export default routesConfig;