import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../services/auth';
import { auth } from '../services/firebase';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    // const history = useHistory();
    const register = () => {
        if(!email) alert('Please enter email');
        registerWithEmailAndPassword(email, password);
        navigate('/authentication');
    };

    const handleKeyDown = (e) => {
      if(e.keyCode === 13) {
        register();
      }
    };

    // useEffect(() => {
    //   if(loading) return;
    //   if(user) history.replace('/');
    // }, [user, loading]);

  return (    
    <>
        <div className="h-30 grid md:grid-cols-4 gap-4">
                <div></div>
                <h1 className='col-span-2 text-3xl font-bold  h-30 text-center p-8 font-sans bg-zinc-800 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40'>
                Gym Training App   <span></span>
                <span className="material-symbols-outlined">
                fitness_center
                </span>
                </h1>
        </div>
    <div className='h-[800px] flex justify-center'>
      <div className='py-16 bg-zink-800 flex flex-col justify-center'>
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
          onClick={register}
        >Register</button>
      </div>
      <div className='px-2 pb-1'>Already have an account? 
        &nbsp;<a className='underline cursor-pointer' onClick={() => navigate('/authentication')}>Log in</a>
      </div>
    </div> 
      </div>
      
    </div>
       
  </>
  )
}

export default Registration