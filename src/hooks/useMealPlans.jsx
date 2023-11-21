import { useEffect, useState } from 'react';
import { collection, doc, addDoc, getDocs, setDoc, onSnapshot, Timestamp } from "firebase/firestore"; 
import {db} from "../services/firebase";

export function useMealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // debugger
    const mealPlansRef = collection(db, 'meal_plans');
    const unsubscribe = onSnapshot(mealPlansRef, (snapshot) => {
      
      const mealPlansList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        created: doc.data().created ? doc.data().created.toDate() : doc.data().created,
        updated: doc.data().updated ? doc.data().updated.toDate() : doc.data().updated
      }));
      setMealPlans(mealPlansList);
      // setMeals(meals);
    });

    return unsubscribe;
  }, []);

  const addMealPlan = async ({
    name,
    description,
    calories,
  }) => {
    try {
        const mealPlansRef = collection(db, 'meal_plans');
        const mealPlan = await addDoc(mealPlansRef, {
            name: name || "",
            description: description || "",
            calories: calories || 100,
            created: Timestamp.fromDate(new Date()),
            updated: null,
        });
        return mealPlan.id;
    } catch (error) {
        throw new Error(error);
    }
  };

  const addMeals = async (mealPlanId, {name, description, calories, recipe}) => {
    try {
        const workoutRef = doc(collection(db, "meal_plans", mealPlanId, "meals"));
        await setDoc(workoutRef, {
            created: Timestamp.fromDate(new Date()),
            updated: null,
            name: name || "",
            description: description || "",
            calories: calories || 100,
            recipe: recipe || ""
          });
    } catch (error) {
        throw new Error(error);
    }
  } 

  const getMeals = async (mealPlanId) => {
    try{
      // debugger
      if(!mealPlanId) {
        return
      };
      const result = [];
      const querySnapshot = await getDocs(collection(db, "meal_plans", mealPlanId, "meals"));
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      });
      result.push({ id: doc.id, ...doc.data() })
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  };

  

  return {
    mealPlans,
    addMealPlan,
    addMeals,
    getMeals,
    meals
  };
}