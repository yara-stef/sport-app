import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { logInWithEmailAndPassword } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { useIdToken } from 'react-firebase-hooks/auth';


function AuthenticationName() {
  const { signin, credentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const onLogin = (e) => {
    // e.preventDefault();
    signin({email, password});
  };

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      onLogin();
    }
  };

  const CurrentUser = () => {
    const [ user, loading, error ] = useIdToken(auth);

    if(loading) {
      return (
        <div>
          <p>Initializing User...</p>
        </div>
      );
    }
    if(error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }
    if(user) {
      return (
        console.log(user)
        // <div>
        //   <p>Current User: {user.user.email}</p>
        // </div>
      );
    }
  }

  return (
    <>
    <div className='bg-zinc-800 w-64 h-[148px] grid grid-rows-2 gap-2 my-2 rounded shadow-2xl shadow-cyan-500/50 hover:shadow-indigo-500/40'>
      <form className='px-2 pt-2'>
        <input 
          name='email'
          className='text-black w-full rounded' 
          type='text' 
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}          
          autoComplete='on'
          onKeyDown={handleKeyDown}
        ></input>
        </form>
      <div className='px-2'>
        <input 
          name='password'
          className='text-black w-full rounded' 
          type='password' 
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
          onKeyDown={handleKeyDown}  
          autoComplete='off'   
        >
          
        </input>
      </div>
      <div className='flex  justify-center pb-1'>
        <button
          className='bg-black rounded w-full mx-2 px-2 py-1'
          onClick={onLogin}
        >Log In</button>
      </div>
      <div className='px-2 pb-1'>Don't have an account? 
        &nbsp;<a className='underline cursor-pointer' onClick={() => navigate('/registration')}>Register</a>
      </div>
    </div>        
  </>
  )
}

export default AuthenticationName