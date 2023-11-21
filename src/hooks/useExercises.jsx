import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore"; 
import {db} from "../services/firebase";

export function useExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const exercisesRef = collection(db, 'exercises');
    const unsubscribe = onSnapshot(exercisesRef, (snapshot) => {
      const exercisesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        created: doc.data().created ? doc.data().created.toDate() : doc.data().created,
        updated: doc.data().updated ? doc.data().updated.toDate() : doc.data().updated
      }));
      setExercises(exercisesList);
    });

    return unsubscribe;
  }, []);

  const addExercise = async ({
    name,
    description,
    muscleGroup,
    equipmentNeeded,
    difficulty,
  }) => {
    try {
        const exercisesRef = collection(db, 'exercises');
        const exercise = await addDoc(exercisesRef, {
            name: name || "",
            description: description || "",
            muscleGroup: muscleGroup || "",
            equipmentNeeded: equipmentNeeded || "",
            difficulty: difficulty || "",
            created: Timestamp.fromDate(new Date()),
            updated: null,
        });
        return exercise.id;
    } catch (error) {
        throw new Error(error);
    }
  };

  return {
    exercises,
    addExercise,
  };
}