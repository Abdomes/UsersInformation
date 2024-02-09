import { Routes, Route } from 'react-router-dom';

import routesConfig from '../../routes/routesConfig';

import styles from './App.module.css';

/*App с отображнием роутов */
function App() {
  return (
    <div className={styles.container}>
      <Routes>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
