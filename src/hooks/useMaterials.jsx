import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore"; 
import {db} from "../services/firebase";

export function useMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const materialsRef = collection(db, 'materials');
    const unsubscribe = onSnapshot(materialsRef, (snapshot) => {
      const materialsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        created: doc.data().created ? doc.data().created.toDate() : doc.data().created,
        updated: doc.data().updated ? doc.data().updated.toDate() : doc.data().updated
      }));
      setMaterials(materialsList);
    });

    return unsubscribe;
  }, []);

  const addMaterials = async ({
    name,
    description,
    type,
    link,
  }) => {
    try {
        const materialsRef = collection(db, 'materials');
        const material = await addDoc(materialsRef, {
            name: name || "",
            description: description || "",
            type: type || "",
            link: link || "",
            created: Timestamp.fromDate(new Date()),
            updated: null,
        });
        return material.id;
    } catch (error) {
        throw new Error(error);
    }
  };

  return {
    materials,
    addMaterials,
  };
}