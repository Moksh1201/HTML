import React, { useState } from 'react';
import { FirebaseProvider } from './FirebaseContext'; // Corrected import statement
import MainContent from './MainContent';
import QuestionPage from './QuestionPage';

function ContentSwitcher() {
  const [selectedOption, setSelectedOption] = useState('Article');
  const [currentPage, setCurrentPage] = useState('main');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigateToquestionpage = () => {
    setCurrentPage('other');
  };

  const navigateBack = () => {
    setCurrentPage('main');
  };

  return (
    <FirebaseProvider>
      <div>
        {currentPage === 'main' ? (
          <MainContent
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            navigateToquestionpage={navigateToquestionpage}
          />
        ) : (
          <QuestionPage navigateBack={navigateBack} />
        )}
      </div>
    </FirebaseProvider>
  );
}

export default ContentSwitcher;


