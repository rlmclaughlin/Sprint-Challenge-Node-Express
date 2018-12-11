import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Actions from './Actions.js'
import Projects from './Projects.js'

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      actions: []
    }
  }

 

  render() {
    return (
      <div className="body">
        <div className='app-container'> 
          <Actions />
          <Projects  /> 
        </div> 
      </div>
    );
  }
}

export default App;
