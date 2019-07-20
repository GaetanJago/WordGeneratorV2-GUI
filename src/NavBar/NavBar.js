import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import Can from '../components/utils/Can';
import './NavBar.css';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <ul>
        <Link to="/">
          <li className="navbar-link navbar-left">
            Accueil
          </li>
        </Link>
        
          <Can
          role={auth0Client.getRole()}
          perform="admin-dashboard-page:visit"
          yes={() => (
            <Link to="/admin/dashboard">
              <li className="navbar-link navbar-left">
                Administration
              </li>
            </Link>
          )}
        />
      </ul>

      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);