import React from 'react';

function Modal( {secondComp, thirdComp, isVisible, onClose, children }) {  
    
    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }     

  return (    
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='wrapper' onClick={handleClose}>        
        <div className='md:w-[800px] w-[90%] mx-auto flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()} >X</button>
            <div className='bd-zinc-800 p-2 rounded grid md:grid-cols-2 gap-4'>
                {children}             
                              
                <div>
                    {secondComp} 
                </div>
                <div>
                    {thirdComp}
                </div>                
            </div>                
        </div>
    </div>
    
  )
}

export default Modal