import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { verifyUser } from './services/auth'

import Browse from './components/Browse'
import Question from './components/Question'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import Create from './components/Create'

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
      this.setUsername(response.username, response.id)
    }  
  }

  setUsername(username, id) {
    this.setState({
      user: {
        username,
        id
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact>
          <Browse />
        </Route>
        <Route path="/questions/:id">
          <Question />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      
      </div>
    );
  }
}

export default App;
