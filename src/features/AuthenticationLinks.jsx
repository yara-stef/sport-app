import React from 'react';
import facebookIcon from '../img/Facebook.png';
import googleIcon from '../img/Google.png';
import twitterIcon from '../img/twitterLogo.png';

function AuthenticationLinks() {
  return (
    <>
    <div className='bg-zinc-800 flex justify-between gap-1 w-64 mt-8 rounded shadow-2xl shadow-cyan-500/50 hover:shadow-indigo-500/40'>
      <img className='w-12 h-12 cursor-pointer' src={facebookIcon} alt='facebook icon'></img>
        <img className='w-12 h-12 cursor-pointer' src={googleIcon} alt='facebook icon'></img>
        <img className='w-12 h-12 cursor-pointer' src={twitterIcon} alt='facebook icon'></img>
        </div>
        
    </>
  )
}

export default AuthenticationLinks