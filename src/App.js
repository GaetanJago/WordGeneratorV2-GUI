import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Question from './Question/Question';
import Questions from './Questions/Questions';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import auth0Client from './Auth';
import AdminDashboard from './pages/admin/dashboard';
import AdminLanguages from './pages/admin/languages';
import AdminCategories from './pages/admin/categories';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/new-question'
                  component={NewQuestion}
                  checkingSession={this.state.checkingSession} />
        <SecuredRoute path='/admin/dashboard'
                  component={AdminDashboard}
                  checkingSession={this.state.checkingSession} />
        <SecuredRoute path='/admin/languages'
                  component={AdminLanguages}
                  checkingSession={this.state.checkingSession} />
        <SecuredRoute path='/admin/categories'
                  component={AdminCategories}
                  checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}

export default withRouter(App);