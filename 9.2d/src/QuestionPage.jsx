import React from 'react';
import QuestionList from './QuestionList';

function QuestionPage({ navigateBack }) {
  return (
    <div>
      <QuestionList />
      <button onClick={navigateBack}>Go Back to Post Page</button>
    </div>
  );
}

export default QuestionPage;
