import React from "react";
import { Link, Redirect } from "react-router-dom";

import Can from "../../components/utils/Can";

import auth0Client from '../../Auth';


function Dashboard() {

    return (
          <Can
            role={auth0Client.getRole()}
            perform="dashboard-page:visit"
            yes={() => (
              <div>
                <h2>Admin Dashboard</h2>
                <ul>
                  <Link to="/admin/languages"><li>Gestion des langues</li></Link>
                </ul>
              </div>
            )}
            no={() => <Redirect to="/" />}
          />
    );
};

export default Dashboard;