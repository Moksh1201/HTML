import React from 'react';
import { auth } from './firebase'; // Import the Firebase auth instance
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Loginpage.css"

function HomePage() {
  const history = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Logged out');
      history('/');
    } catch (error) {
      console.error('Signout error:', error.message);
    }
  };

  return (
    <div>
      <h1>You have successfully logged in to the account</h1>
      <button className='outB1' onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default HomePage;
