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

    
    <nav className="nav-bar navbar-dark fixed-top">
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
        {
        !auth0Client.isAuthenticated() &&
        <li className="navbar-link navbar-right" onClick={auth0Client.signIn}>Connexion</li>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="navbar-right">{auth0Client.getProfile().name}</label>
          <li className="navbar-link navbar-right" onClick={() => { signOut() }}>Déconnexion</li>
        </div>
      }
      </ul>
    </nav>
  );
}

export default withRouter(NavBar);