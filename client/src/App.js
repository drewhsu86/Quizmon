import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { verifyUser, removeToken } from './services/auth'

import Nav from './components/Nav'
import Browse from './components/Browse'
import Question from './components/Question'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Logged from './components/Logged'
import NotLogged from './components/NotLogged'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    // verify user using jwt if one can be found in localstorage  
    const response = await verifyUser()
    console.log(response)

    if (response) {
      this.setUser(response.username, response.id)
    }  
  }

  setUser = (username, id) => {
    console.log('setting user: ', username, ':', id)
    this.setState({
      user: {
        username,
        id
      }
    })
  }

  logout = () => {
    removeToken() 
    this.setState({
      user: null 
    })
  }

  render() {
    return (
      <div className="App">
        <Nav user={this.state.user} logout={this.logout} />
        <main>
        <Route path="/" exact>
          <Browse />
        </Route>
        <Route path="/questions/:id">
          <Question />
        </Route>
        <Route path="/signin">
            {!this.state.user ? <Signin setUser={this.setUser} /> : <Logged logout={this.logout} />}
        </Route>
        <Route path="/signup">
            {!this.state.user ? <Signup setUser={this.setUser} /> : <Logged logout={this.logout} />}
        </Route>
        <Route path="/home">
            {this.state.user ? <Home user={this.state.user} /> : <NotLogged  />}
        </Route>
        <Route path="/create">
            {this.state.user ? <Create user={this.state.user} /> : <NotLogged  />}
        </Route>
        <Route path="/edit/:id">
            {this.state.user ? <Edit user={this.state.user} /> : <NotLogged  />}
        </Route>
        </main>
      </div>
    );
  }
}

export default App;
