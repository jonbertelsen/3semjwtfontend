import { NavLink, Outlet } from 'react-router-dom';
import LogIn from '../components/LogIn';
import LoggedIn from '../components/LoggedIn';

function MainLayout({ loggedIn, login, logout, facade }) {
  return (
    <div id="page">
      <div id="container">
        <NavLink to="/">Home</NavLink> | <NavLink to="user">User</NavLink> |
        <NavLink to="admin">Admin</NavLink>
        <h1>Welcome to the React Router Demo site</h1>
        <div>
          {!loggedIn ? (
            <LogIn login={login} />
          ) : (
            <div>
              <LoggedIn facade={facade} />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
