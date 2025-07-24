// AuthPage.jsx
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './AuthPage.css';

function AuthPage({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
         await signInWithEmailAndPassword(auth, email, password);
        // onAuthSuccess(res.user);
      } else {
         await createUserWithEmailAndPassword(auth, email, password);
        // onAuthSuccess(res.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="major-container">
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleAuth}>
        {isLogin ? 'Login' : 'Register'}
      </button>
      <p style={{ color: 'red' }}>{error}</p>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? 'New here? Register' : 'Already have an account? Login'}
      </p>
    </div>
    </div>
  );
}

export default AuthPage;
