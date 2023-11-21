import React, { Fragment, useState } from 'react';
import Modal from '../features/Modal';
// import Player from '../components/Player';
import Dropdown from './Dropdown';
import { useMaterials } from '../hooks/useMaterials';
import { useAthletes } from '../hooks/useAthletes';


function Links({ athlete, athleteDetails }) {
  const { materials } = useMaterials();
  const [showModal1, setShowModal1] = useState(false);
  const { updateAthlete } = useAthletes();  
  

  if(!athlete) {
    return null
  };
  // console.log(materials);
  // console.log(athlete.materials);
 

  return (
    <>
    <Fragment>
      <div className='px-4 lg:ml-0 bg-zinc-800 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40 pb-5'>
            <h2 className='text-center pt-5 pb-5 text-xl'>Usefull links and materials:</h2>            
            <div className='pb-2'>Select Materials</div>
            <Dropdown items={materials} handleSubmit={(values) => {
              athleteDetails.materials = athlete.materials;
              // console.log(athleteDetails.materials);
              athleteDetails.materials.push(values.items);
              // console.log(athleteDetails.materials);
              updateAthlete(athlete.id, athleteDetails);
              // console.log(typeof values.items);
            }} />
            <ul>
              {athlete.materials && athlete.materials.map((material, i) => {
                return <li key={i}><a href={material} >{material} </a></li>
              })}              
            </ul>
            <Modal isVisible={showModal1} onClose={() => setShowModal1(false)} />

            
        </div>
    </Fragment>
        
        
    </>
  )
}

export default Links