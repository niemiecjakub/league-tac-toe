import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'

function Landing() {

  return (
    <div className="App">
        <div>
            <Link to="/champion-list">Champion list</Link> 
        </div>
        <div>
            <Link to="/game">Game</Link> 
        </div>
    </div>
  );
}

export default Landing;
