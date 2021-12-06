import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
// import { useLocation } from "react-router-dom";

function App() {
  const [mounted, setMounted] = useState(false)
  const { pathname } = window.location;

  if (!mounted) {
    console.log("path:", pathname, pathname.split('/')[1] === "post");
    if (pathname.split('/')[1] === "post") {
      const meta_title = document.getElementById("meta_title");
      meta_title.setAttribute("content", "Testing meta title")
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
