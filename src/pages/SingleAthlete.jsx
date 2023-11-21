import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AthleteInfo from '../features/AthleteInfo';
import TrainingPlan from '../features/TrainingPlan';
import Diet from '../features/Diet';
import Links from '../features/Links';
import { useAthlete } from '../hooks/useAthlete';

function SingleAthlete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { athlete } = useAthlete(id);
    let athleteDetails = {};
    
  return (
    <>
    <div className='pt-5 text-center text-2xl font-semibold flex justify-center'>
      <div className=' w-1/4 h-15 pb-5 '></div>
    </div>
    <div className="grid lg:grid-cols-2 gap-4 ">
        <div className='mr-2 px-4 pt-5 lg:grid lg:grid-cols-2 gap-4'>
            <AthleteInfo athlete={athlete} athleteDetails={athleteDetails} />
            <TrainingPlan athlete={athlete} />
            <Diet athlete={athlete} athleteDetails={athleteDetails} />
        </div>
        <div className='pt-5 px-4 mr-2'>
          <Links athlete={athlete} athleteDetails={athleteDetails} />
        </div>
        <button className='text-start m-5 bg-zinc-800 w-1/4 rounded hover:bg-black' onClick={() => navigate('/')}>← Return</button>
    </div>
    </>
    
  )
}

export default SingleAthlete