import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, addDoc, getDocs, setDoc, onSnapshot, Timestamp, updateDoc  } from "firebase/firestore"; 
import {db} from "../services/firebase";
import { useAthlete } from '../hooks/useAthlete';

export function useAthletes() {
  const [athletes, setAthletes] = useState([]);
  
 
  useEffect(() => {
    const athletesRef = collection(db, 'athletes');
    const unsubscribe =  onSnapshot(athletesRef, (snapshot) => {
      // debugger
      const athletesList = snapshot.docs.map((doc) => {
        return {
        id: doc.id,
        ...doc.data(),
        created: doc.data().created ? doc.data().created.toDate() : doc.data().created,
        updated: doc.data().updated ? doc.data().updated.toDate() : doc.data().updated
      }
      }
      );
      setAthletes(athletesList);
    });

    return unsubscribe;
  }, []);

  const addAthlete = async ({
    name,
    age,
    gender,
    weight,
    birthdate,
    experience,
    healthCondition,
    goals,
    mealPlans,
    materials,
    progress
  }) => {
    try {
        const athletesRef = collection(db, 'athletes');
        const athlet = await addDoc(athletesRef, {
            name,
            age: age || 14,
            weight: weight || 50,
            gender: gender || "Female",
            experience: experience || 0,
            birthdate: birthdate || Timestamp.fromDate(birthdate || new Date()),
            healthCondition: healthCondition || "",
            goals: goals || [],
            mealPlans: mealPlans || [],
            materials: materials || [],
            progress: progress || [],
            created: Timestamp.fromDate(new Date()),
            // trainerId: 
            updated: null,
        });
        // await addWorkout(athlet.id, {exercise: "", sets: 3, reps: 12, weight: 120})
        return athlet.id;
    } catch (error) {
        throw new Error(error);
    }
  };

  const addWorkout = async (athleteId, {exercise, sets, reps, weight}) => {
    try {
        const workoutRef = doc(collection(db, "athletes", athleteId, "workouts"));
        await setDoc(workoutRef, {
            created: Timestamp.fromDate(new Date()),
            updated: null,
            exercise: exercise || "",
            sets: sets || 3,
            reps: reps || 12,
            weight: weight || 120,
          });
    } catch (error) {
        throw new Error(error);
    }
  } 

  const updateAthlete = async (athleteId, athleteInformation) => {
    try {
      const athleteRef = doc(db, "athletes", athleteId);
      // debugger;
      await updateDoc(athleteRef, athleteInformation);
    } catch (error) {
      throw new Error(error);
    }
  };


  return {
    athletes,
    addAthlete,
    addWorkout,
    updateAthlete
  };
}