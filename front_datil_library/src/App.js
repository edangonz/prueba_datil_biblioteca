import React from 'react';

import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import BookComponent from './componets/pages/BookPage/Book';
import BorrowedBookComponent from './componets/pages/BookPage/Borrowed';
import ReservedBookComponent from './componets/pages/BookPage/Reserved';

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
        {!this.state.loading_user &&
          <div className="main-container main-container-flex">
            <div className="menu-container">
              <Link to="/app">Libros</Link>
              <Link to="/reserved">Libros reservados</Link>
              <Link to="/borrowed">Libros prestados</Link>
            </div>
            <div className="content-container">
              <ProtectedRoute
                exact
                path="/app"
                user={this.state.user}
                component={BookComponent}
              />

              <ProtectedRoute
                exact
                path="/reserved"
                user={this.state.user}
                component={ReservedBookComponent}
              />

              <ProtectedRoute
                exact
                path="/borrowed"
                user={this.state.user}
                component={BorrowedBookComponent}
              />
            </div>
          </div>
          }
      </BrowserRouter>
    );
  }
}

export default App;
