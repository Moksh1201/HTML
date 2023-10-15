import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from 'semantic-ui-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import QuestionCard from './DisplayCard';
import { txtDB } from './firebase';


function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({ tags: '', description: '', date: '' });
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      let queryRef = collection(txtDB, 'posts');

      if (filter.tags) {
        queryRef = query(queryRef, where('tags', 'array-contains', filter.tags));
      }

      if (filter.description) {
        queryRef = query(queryRef, where('description', '==', filter.description));
      }

      if (filter.date) {
        queryRef = query(queryRef, orderBy('date'));
      }

      const querySnapshot = await getDocs(queryRef);
      const questionData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        questionData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          tags: data.tags,
          imageUrl: data.imageUrl,
          date: data.date,
        });
      });

      setQuestions(questionData);
    };

    fetchQuestions();
  }, [filter]);

  const handleFilterByTags = () => {
    setFilter({ tags: tagSearchTerm, description: '', date: filter.date });
  };

  const handleFilterByDescription = () => {
    setFilter({ tags: '', description: descriptionSearchTerm, date: filter.date });
  };

  const handleSort = (ascending) => {
    setFilter({ ...filter, date: ascending });
  };

  const handleTagSearch = (event) => {
    setTagSearchTerm(event.target.value);
  };

  const handleDescriptionSearch = (event) => {
    setDescriptionSearchTerm(event.target.value);
  };

  const handleClearFilters = () => {
    setFilter({ tags: '', description: '', date: '' });
  };

  return (
    <div>
      <h1>Questions List</h1>
      <div className="filter-container">
        <Input
          className="filter-input"
          type="text"
          placeholder="Search by tag"
          value={tagSearchTerm}
          onChange={handleTagSearch}
        />
        <Button className="filter-button" onClick={handleFilterByTags}>Filter by Tag</Button>
      </div>
      <div className="filter-container">
        <Input
          className="filter-input"
          type="text"
          placeholder="Search by description"
          value={descriptionSearchTerm}
          onChange={handleDescriptionSearch}
        />
        <Button className="filter-button" onClick={handleFilterByDescription}>Filter by Description</Button>
      </div>
      <div className="button-container1">
        <Button className="sort-button" onClick={() => handleSort(true)}>Sort by Date</Button>
        <Button className="clear-button" onClick={handleClearFilters}>Clear Filters</Button>
      </div>
      <Card.Group>
        {questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </Card.Group>
    </div>
  );
}

export default QuestionList;