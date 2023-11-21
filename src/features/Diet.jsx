import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../services/firebase';
import { useParams } from 'react-router-dom';
import Modal from '../features/Modal';
import AddMealPlan from '../components/AddMealPlan';
import Dropdown from './Dropdown';
import { useMealPlans } from '../hooks/useMealPlans';
import { useAthletes } from '../hooks/useAthletes';

function Diet( { athlete, athleteDetails }) {
  // console.log(athlete);
  const [showModal1, setShowModal1] = useState(false);
  const [meal, setMeal] = useState([]);
  const { mealPlans, getMeals } = useMealPlans();
  const { updateAthlete } = useAthletes();
  // console.log(meals);
  // console.log(mealPlans);

  
  // useEffect(() => {
  //   // debugger
  //   const getMealsData = async (mealPlanId) => {
  //     try {
  //       if(!mealPlanId) {
  //         return
  //       };
  //       const mealPlanRef = doc(db, 'meal_plans', mealPlanId);
  //       const mealPlanSnap = await getDoc(mealPlanRef);
  //       const meals = await getMeals(mealPlanId);
  //       if(mealPlanSnap.exists()) {
  //         return { meals }
  //       } else {
  //         throw new Error('No such document!');
  //       }
  //     }
  //     catch (error) {
  //       throw new Error(error);
  //     }
  //   }
  //   const getMeal = async () => {
  //   const meal = await getMealsData();
  //   setMeal(meal);

  //   getMeal();
  // }
  // }, []);

  if(!athlete) {
    return null;
   }
      
  //  console.log(meal);
  return (
    <>
        <div className='mt-8 lg:mt-0 pb-4 bg-zinc-800 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40'>
            <h2 className='text-center pt-5 pb-5 text-xl'>Diet recommendations:</h2>
            {/* <TextInsert /> */}
            <div className='pb-2 pl-2'>Select Meal Plan</div>
            <div className='pl-2'> 
              <Dropdown items={mealPlans} handleSubmit={(values) => {
               athleteDetails.mealPlans = values.items;                
              updateAthlete(athlete.id, athleteDetails)}} 
            />
            </div>
            <div className='pl-2'>
             {athlete.mealPlans}
            </div>
           
        </div>  
        <Modal isVisible={showModal1} onClose={() => setShowModal1(false)} secondComp={<AddMealPlan />} />
    </>
  )
}

export default Diet