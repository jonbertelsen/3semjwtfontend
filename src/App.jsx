import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import { useState } from 'react';
import facade from './util/apiFacade';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            loggedIn={loggedIn}
            logout={logout}
            login={login}
            facade={facade}
          />
        }
      >
        <Route path="user" element={<UserPage isAdmin={isAdmin} />} />
        <Route path="admin" element={<AdminPage isAdmin={isAdmin} />} />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
