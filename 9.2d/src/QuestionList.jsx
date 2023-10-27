import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import CodeViewer from './CodeViewer'; // Import CodeViewer component
import DisplayCard from './DisplayCard'; // Import DisplayCard component
import { getFirestore } from './firebase';
import './POST.css';

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({ tags: '', title: '' });
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [dateSearchTerm, setDateSearchTerm] = useState('');
  const [code, setCode] = useState(''); // Store the code fetched from Firebase

  const formattedDate = (date) => {
    if (date) {
      return date.toLocaleString(); // Format the date as a string
    }
    return 'N/A'; // or any default value for missing dates
  };

  useEffect(() => {
    // Fetch code from Firebase
    const fetchCode = async () => {
      const db = getFirestore();
      const queryRef = collection(db, 'codeCollection'); // Adjust the collection name to match your database

      const querySnapshot = await getDocs(queryRef);

      if (!querySnapshot.empty) {
        // Assuming you want to retrieve the first document's 'code' field
        const codeData = querySnapshot.docs[0].data().code;

        setCode(codeData);
      }
    };

    fetchCode();
  }, []);

  useEffect(() => {
    // Fetch questions from Firebase
    const fetchQuestions = async () => {
      const db = getFirestore();

      let queryRef = collection(db, 'posts');

      if (filter.tags) {
        queryRef = query(queryRef, where('tags', 'array-contains', filter.tags));
      }

      if (filter.title) {
        queryRef = query(queryRef, where('title', '==', filter.title));
      }

      if (dateSearchTerm) {
        const selectedDate = new Date(dateSearchTerm);
        selectedDate.setHours(0, 0, 0, 0);
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);

        queryRef = query(queryRef, where('date', '>=', selectedDate), where('date', '<', nextDate));
      }

      const querySnapshot = await getDocs(queryRef);
      const questionData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dateTimestamp = data.date ? data.date.toDate() : null;

        questionData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          tags: data.tags,
          imageUrl: data.imageUrl,
          date: dateTimestamp,
          code: data.code,
        });
      });

      setQuestions(questionData);
    };

    fetchQuestions();
  }, [filter, dateSearchTerm]);

  const handleFilterByTags = () => {
    setFilter({ tags: tagSearchTerm, title: filter.title });
  };

  const handleFilterByTitle = () => {
    setFilter({ tags: filter.tags, title: titleSearchTerm });
  };

  const handleDateFilter = () => {
    setFilter({ tags: filter.tags, title: filter.title });
  };

  const handleClearFilters = () => {
    setFilter({ tags: '', title: '' });
    setTagSearchTerm('');
    setTitleSearchTerm('');
    setDateSearchTerm('');
  };

  return (
    <div>
      <h1>Questions List</h1>
      <div className="filter-container">
        <input
          className="filter-input"
          type="text"
          placeholder="Search by tag"
          value={tagSearchTerm}
          onChange={(e) => setTagSearchTerm(e.target.value)}
        />
        <button className="filter-button" onClick={handleFilterByTags}>
          Filter by Tag
        </button>
      </div>
      <div className="filter-container">
        <input
          className="filter-input"
          type="text"
          placeholder="Search by title"
          value={titleSearchTerm}
          onChange={(e) => setTitleSearchTerm(e.target.value)}
        />
        <button className="filter-button" onClick={handleFilterByTitle}>
          Filter by Title
        </button>
      </div>
      <div className="filter-container">
        <input
          className="filter-input"
          type="date"
          placeholder="Filter by Date"
          value={dateSearchTerm}
          onChange={(e) => setDateSearchTerm(e.target.value)}
        />
        <button className="filter-button" onClick={handleDateFilter}>
          Filter by Date
        </button>
      </div>
      <div className="button-container1">
        <button className="clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
      <ul>
        {questions.length === 0 ? (
          <p>No records found.</p>
        ) : (
          questions.map((question) => (
            question.code ? (
              <CodeViewer
                key={question.id}
                {...question}
                date={formattedDate(question.date)}
                code={question.code} // Pass the code from the question object
              />
            ) : (
              <DisplayCard
                key={question.id}
                {...question}
                date={formattedDate(question.date)}
              />
            )
          ))
        )}
      </ul>
    </div>
  );
}

export default QuestionList;
