import './App.css';
import
function App() {
  const [selectedOption, setSelectedOption] = useState('Question'); // Default to 'Question'

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Define description text based on the selected option
  const descriptionText = selectedOption === 'Question' ? 'Describe your problem' : 'Article text';

  return (
    <div>
      <h4 className="ui block header">New Post</h4>
      <Option selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
      <br />
      <MyQues
        title={selectedOption === 'Question' ? 'What do you want to ask' : 'What do you want to share'}
        description={selectedOption === 'Question' ? 'This section is designed for asking questions.' : 'This section is designed for sharing articles.'}
        inputPlaceholder={selectedOption === 'Question' ? 'Start your question with how, what, why, etc.' : 'Enter the article title'}
        textareaPlaceholder={selectedOption === 'Question' ? 'Enter your question here...' : 'Write your article here...'}
        tagsPlaceholder={selectedOption === 'Question' ? 'Please add up to 3 tags to describe your question' : 'Please add up to 3 tags to describe your article'}
        descriptionText={descriptionText}
        selectedOption={selectedOption} 
      />
    </div>
  );
}

export default App;
