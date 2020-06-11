import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Browse from './components/Browse'
import Question from './components/Question'

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Browse />
      </Route>
      <Route path="/questions/:id">
        <Question />
      </Route>
      
    </div>
  );
}

export default App;
