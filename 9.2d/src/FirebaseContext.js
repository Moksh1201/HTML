// FirebaseContext.js
import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods for fetching data
import { txtDB } from './firebase'; // Assuming you have initialized Firestore in 'txtDB'

export const FirebaseContext = createContext({
  data: [],
  loading: true,
});

export const FirebaseProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(txtDB, 'questions')); // Replace 'questions' with your Firestore collection name
        const questionData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(questionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    data,
    loading,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
