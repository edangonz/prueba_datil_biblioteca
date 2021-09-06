import React from 'react';
import { Container } from 'react-bootstrap';

import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import NavbarComponent from './componets/Navbar/Navbar';
import AdminComponent from './componets/pages/BookPage/Admin';
import BookComponent from './componets/pages/BookPage/Book';
import BorrowedBookComponent from './componets/pages/BookPage/Borrowed';
import BorrowedAdminBookComponent from './componets/pages/BookPage/BorrowedAdmin';
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
          <div className="main-container main-container-flex" style={{display : !this.state.user ? "none" : ""}}>
            {this.state.user && <div className="menu-container">
              <Link to="/app">Libros</Link>
              {!this.state.user.is_superuser && <Link to="/reserved">Libros reservados</Link>}
              {!this.state.user.is_superuser && <Link to="/borrowed">Libros prestados</Link>}
              {this.state.user.is_superuser && <Link to="/borrowedadmin">Libros prestados</Link>}
              {this.state.user.is_superuser && <Link to="/admin">Administrar libros</Link>}
            </div>}
            <div className="content-container">
              {this.state.user && <NavbarComponent user={this.state.user} closeSesion={() => this.setState({ user : undefined, loading_user : true})}/>}
              <Container>
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

                <ProtectedRoute
                  exact
                  path="/borrowedadmin"
                  user={this.state.user}
                  only_admin={true}
                  component={BorrowedAdminBookComponent}
                />

                <ProtectedRoute
                  exact
                  path="/admin"
                  user={this.state.user}
                  only_admin={true}
                  component={AdminComponent}
                />
              </Container>
            </div>
          </div>
          }
      </BrowserRouter>
    );
  }
}

export default App;
