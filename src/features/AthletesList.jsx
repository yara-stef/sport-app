import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { choose } from './AthletSlice';
import Modal from '../features/Modal';
import AddAthlete from '../components/AddAthlete';
import AddWorkout from '../components/AddWorkout';
import AddMeals from '../components/AddMeals';
import AddMaterials from '../components/AddMaterials';
import AddMealPlan from '../components/AddMealPlan';
import TabsModal from '../components/TabsModal';

function AthletesList({athletes}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  athletes.sort(function (a, b) {
    if(a.name < b.name) {
      return -1;
    }
    if(a.name > b.name) {
      return 1;
    }
    return 0;
  });
  // console.log(athletes);
  
  
  const handleClick = (contact) => {
    dispatch(choose(contact));
    return navigate(`/contact/${contact.id}`)
  }
  return (
    <>
        <h3 className='ml-6 pl-8 text-3xl'>Athletes List
        </h3>
        <div className='ml-6 py-5 w-72 pl-8'>
          {athletes.map((contact) => {
        return (        
          <div className='border-solid border-2 p-4 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40' key={contact.id}>           
          <button onClick={() => handleClick(contact)}>{contact.name}</button>
        </div>
        )        
      })}
        </div>
        <div className='m-6 pl-8 '>
          <button className="w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal(true)}>Add An Athlete</button>
        </div>
        <div className='m-6 pl-8 '>
          <button className="w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal1(true)}>Add A Meal</button>
        </div>
        <div className='m-6 pl-8 '>
          <button className="w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal3(true)}>Add A Meal Plan</button>
        </div>
        <div className='m-6 pl-8 '>
          <button className="w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={() => setShowModal2(true)}>Add A Material</button>
        </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} 
      secondComp={<TabsModal />}  
      />
      <Modal  isVisible={showModal1} onClose={() => setShowModal1(false)} 
      secondComp={<AddMeals />} 
      />
      <Modal  isVisible={showModal2} onClose={() => setShowModal2(false)} 
      secondComp={<AddMaterials />}  
      />
      <Modal  isVisible={showModal3} onClose={() => setShowModal3(false)} 
      secondComp={<AddMealPlan />}  
      />
    </>
  )
}

export default AthletesList;