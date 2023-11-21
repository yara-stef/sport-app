import React from 'react';
import AuthenticationImage from '../features/AuthenticationImage';
import AuthenticationLinks from '../features/AuthenticationLinks';
import AuthenticationName from '../features/AuthenticationName';

function Authentication() {
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
        <div>
          <div className='h-[800px] flex justify-center'>
            <div className='py-16 bg-zink-800 flex flex-col justify-center'>
            <AuthenticationImage />
            <AuthenticationName />
            <AuthenticationLinks />
            </div>
            
          </div>
             
        </div>
       </> 
   
  )
}

export default Authentication