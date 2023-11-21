import React, { useState } from 'react';
import TextInsert from '../components/TextInsert';
import Modal from '../features/Modal';
import AddExercise from '../components/AddExercise';
import AddWorkout from '../components/AddWorkout';
import { useAthlete } from '../hooks/useAthlete';
import { useAthletes } from '../hooks/useAthletes';

function TrainingPlan({athlete}) {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const { workouts } = useAthlete();
  console.log(workouts);
// console.log(athlete);
if(athlete) {
  const {workouts} = athlete;
  // console.log(athlete);
  // console.log(workouts);
}

  return (
    <>
    <div className='bg-zinc-800 pb-5 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40'>
        <h2 className='text-center pt-5 pb-5 text-xl'>Training plan:</h2>
        <table className='border-collapse border border-slate-400 ml-5 mr-5  w-10/12'>
          <thead>
            <tr>
              <td className='border border-slate-300 pl-5'>Day 1</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300'>
                {workouts.map((workout, i) => { 
                  return (
                    <>
                      <p key={i}>{workout.exercise}</p>
                    </>
                  )
                })}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td className='border border-slate-300 pl-5'>Day 2</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300'>
                {/* <TextInsert /> */}
                </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td className='border border-slate-300 pl-5'>Day 3</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300'>
                {/* <TextInsert /> */}
                </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td className='border border-slate-300 pl-5'>Day 4</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300'>
                {/* <TextInsert /> */}
                </td>
            </tr>
          </tbody>
        </table>
        <div className='m-5'>
                  <button className="w-48 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal1(true)}>Add Exercise
                  </button>
                </div>
                <div className='m-5'>
                  <button className="w-48 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal2(true)}>Add Workout
                  </button>
                </div>
    </div>  
    <Modal isVisible={showModal1} onClose={() => setShowModal1(false)} secondComp={<AddExercise />} />
    <Modal isVisible={showModal2} onClose={() => setShowModal2(false)} secondComp={<AddWorkout />}/>
    </>
    
  )
}

export default TrainingPlan