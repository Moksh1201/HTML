import React, { useState } from 'react';

const QuestionList = () => {

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'Question 1', 
      description: 'Description for question 1',
      tags: ['tag1', 'tag2'],
      date: '2020-01-01'
    },
    {
      id: 2,
      title: 'Question 2',
      description: 'Description for question 2',  
      tags: ['tag2', 'tag3'],
      date: '2020-02-01'
    }
  ]);

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const [filter, setFilter] = useState({
    title: '',
    tags: [],
    fromDate: '',
    toDate: '' 
  });

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  }

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  }

  const handleFilterChange = (filter) => {
    setFilter(filter);
  }

  const filteredQuestions = questions.filter(question => {
    return (filter.title === '' || question.title.includes(filter.title))
      && (filter.tags.length === 0 || filter.tags.some(tag => question.tags.includes(tag))) 
      && (filter.fromDate === '' || question.date >= filter.fromDate)
      && (filter.toDate === '' || question.date <= filter.toDate);
  });

  return (
    <div>
      {/* Filter Component */}

      <button onClick={() => setExpandedQuestion(null)}>Collapse Question</button>

      {/* List of Filtered Questions */}
      {filteredQuestions.map(question => (
        <div 
          key={question.id}
          onClick={() => setExpandedQuestion(question)}
        >
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <div>{question.tags.join(', ')}</div>
          <div>{question.date}</div>
          <button onClick={() => handleDelete(question.id)}>
            Delete
          </button>
        </div>
      ))}

      {/* Expanded Question Details */}
      {expandedQuestion && (
        <div>
          <h3>{expandedQuestion.title}</h3>
          <p>{expandedQuestion.description}</p>
          {/* Rest of the details */}
        </div>
      )}

      {/* Add Question Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddQuestion(/* get data from form */)
      }}>
        {/* Input fields for new question data */}
        <button type="submit">Add Question</button>
      </form>

    </div>
  )
}

export default QuestionList;