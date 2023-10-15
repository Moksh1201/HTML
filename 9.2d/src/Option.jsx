
//import React, { useState } from 'react';
import './App.css'


function Option({ selectedOption, handleOptionChange }) {
  return (
    
    <div className="Option">
      <div className="option-container">
        
        <label>
          Select post type:
          <input
            className='Opt'
            type="radio"
            value="Question"
            checked={selectedOption === 'Question'}
            onChange={handleOptionChange}
          />
          Question
        </label>
        <label className='ques'>
          <input
            type="radio"
            value="Article"
            checked={selectedOption === 'Article'}
            onChange={handleOptionChange}
          />
          Article
        </label>
      </div>
    </div>
  );
}

export default Option;




