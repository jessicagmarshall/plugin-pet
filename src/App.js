import React from 'react';
import angry_cat from './angry_cat.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img src={angry_cat} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
