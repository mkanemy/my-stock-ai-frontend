import logo from '../misc/logo.svg';
import '../styles/App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(res => {
        setResponse(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {response}
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
