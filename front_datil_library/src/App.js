import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BookComponent from './componets/pages/BookPage/Book';

import Login from './componets/pages/Login/Login';
import ProtectedRoute from './componets/pages/Protected/ProtectedRoute';
import { loginWithToken } from './services/login.service';

class App extends React.Component {
  state = {
    user : undefined,
    loading_user : true
  }

  setUserLogin (user) {
    this.setState({ user : user, loading_user : false})
  }

  async isLogin(){
    let userData = await loginWithToken();
    
    if(userData)
      this.setUserLogin(userData);
      
    this.setState({ loading_user : false });
  }

  componentDidMount() {
    this.isLogin();
  }
  
  render(){
    return (
      <BrowserRouter>
        <Route exact path="/">
          <Login setUserLogin={(user) => this.setUserLogin(user)} isLogin={() => this.isLogin()}/>
        </Route>
        {!this.state.loading_user && <ProtectedRoute
          exact
          path="/app"
          user={this.state.user}
          component={BookComponent}
          />}
      </BrowserRouter>
    );
  }
}

export default App;
