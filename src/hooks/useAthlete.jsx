import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; 
import {db} from '../services/firebase';

export function useAthlete(id) {
 
  const dataFromRedux =  useSelector(state => state.athletes.chosenAthlete);
  const [athlete, setAthlete]  = useState(null);
  const [ workouts, setWorkouts] = useState([]);

  
    useEffect (() => { 

      const getAthletData = async (athleteId) => {
        try {
          // debugger
          if(!athleteId) {
            return
          };
            const athleteRef = doc(db, "athletes", athleteId);
            const athletSnap = await getDoc(athleteRef);
            // debugger
            // const workouts = await getWorkout(athleteId);
            if (athletSnap.exists()) {
              
              return { id: athletSnap.id, ...athletSnap.data() }
            } else {
              throw new Error("No such document!");
            }
        } catch (error) {
            throw new Error(error);
        }
      }    
      
  if(dataFromRedux) {
     getWorkout(dataFromRedux.id).then(function(workouts) {
      // debugger
      console.log(workouts);
      setWorkouts(workouts);
      setAthlete(dataFromRedux)
    });
    
    
  }
// debugger
      const getAthlete = async () => {
        const athlete = await getAthletData(id);
        // debugger
        setAthlete(athlete);
      };
      
      getAthlete();
        
              
    }, [dataFromRedux]);
  
    const getWorkout = async (athleteId) => {
      try {
        // debugger
        if(!athleteId) {
        return
        };
        const result = [];
        const querySnapshot = await getDocs(collection(db, 'athletes', athleteId, 'workouts'));
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, '=>', doc.data());
        result.push({ id: doc.id, ...doc.data() })
        // console.log(result);
      });
      
      return result;
      } catch (error) {
        throw new Error(error);
      }    
    };    
        
  return {
    athlete, 
    getWorkout,
    workouts
  };
}

