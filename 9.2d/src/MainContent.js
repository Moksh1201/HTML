import React from 'react';
import Option from './Option';
import MyQues from './QuesInput';
import Articlepost from './Articlepost';

function MainContent({ selectedOption, handleOptionChange, navigateToquestionpage }) {
  return (
    <div>
      <h4 className="ui-block-header" style={{ marginTop: '2px' }}>New Post</h4>
      <Option handleOptionChange={handleOptionChange} selectedOption={selectedOption} />

      {selectedOption === 'Question' ? (
        <MyQues
          title="What do you want to ask or share"
          description="Question"
          inputPlaceholder="Enter the title...!"
          textareaPlaceholder="Enter your question here..."
          tagsPlaceholder="Please add up to 3 tags to describe your question"
          descriptionText="Describe your problem"
        />
      ) : (
        <Articlepost
          title="What do you want to ask or share"
          description="Article"
          inputPlaceholder="Enter a descriptive Title"
          textareaPlaceholder="Enter a 1-paragraph abstract"
          tagsPlaceholder="Please add up to 3 tags to describe your article, e.g., java"
          descriptionText="Article Text"
        />
      )}

      <button onClick={navigateToquestionpage}>Go to Question Page</button>
    </div>
  );
}

export default MainContent;
