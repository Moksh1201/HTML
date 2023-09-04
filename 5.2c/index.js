import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import MyQues from './QuesInput';
import index from './index.css'

import Articlepost from './Articlepost';

function App() {
  const [selectedOption, setSelectedOption] = useState('Article');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h4 class="ui block header">New Post</h4>
      <Option handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
      <br />
      {selectedOption === 'Question' ? (
        <MyQues
          title="What do you want to ask or share"
          description="Question"
          inputPlaceholder="Start your question with how, what, why, etc."
          textareaPlaceholder="Enter your question here..."
          tagsPlaceholder="Please add up to 3 tags to describe your question"
          descriptionText="Describe your problem"
        />
      ) : (
        <Articlepost
          title="What do you want to ask or share"
          description="article"
          inputPlaceholder="Enter a descriptive Title"
          textareaPlaceholder="Enter a 1-paragraph abstarct"
          tagsPlaceholder="Please add up to 3 tags to describe your article is about e.g., java"
          descriptionText="Article Text"
        />
        
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
