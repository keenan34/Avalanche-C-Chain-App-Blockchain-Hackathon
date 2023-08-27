import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import Home from './Home';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Metamask not detected!");
    }
  }

  function disconnectAccount() {
    setWalletAddress("");
    setIsConnected(false);
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Metamask Wallet Login</h1>
          <div className="login-box">
            {isConnected ? (
              <div>
                <h3>Welcome!</h3>
                <p>Your Wallet Address:</p>
                <p className="address">{walletAddress}</p>
                <button onClick={disconnectAccount}>Disconnect</button>
                <Link to="/">Home</Link>
              </div>
            ) : (
              <div>
                <p>Connect to your Metamask wallet to continue.</p>
                <button onClick={requestAccount}>Connect Metamask</button>
              </div>
            )}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home walletAddress={walletAddress} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
