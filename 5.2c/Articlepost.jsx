import React from 'react';
import { Header } from 'semantic-ui-react';


function Articlepost({ title, description, inputPlaceholder, textareaPlaceholder, tagsPlaceholder, descriptionText, selectedOption }) {
  return (
    <div>
      <Header block>
        {title}
      </Header>

      <p>This section is designed on the type of the post. It could be develope by conditional rendering. <p className='coloredtext'>For post a <p className='coloredtext'>{description}</p>, the following setcion would be apperared.</p></p>
      <label className='tagstyle'>Title</label>
      <input
        className='QuesAns'
        type="text"
        id="myInput"
        name="myInput"
        placeholder={inputPlaceholder}
      />

      <h4 className='describe'>Abstract</h4>
      <div className="textarea-container">
      <textarea
          className="custom-textarea"
          rows={5}
          cols={10}
        placeholder="Enter 1-paragraph for abstract"
      />
    </div>
<br />
      <h4 className='describe'>{descriptionText}</h4>

      <div className="textarea-container">
        <textarea
          className="custom-textarea"
          rows={20}
          cols={30}
          placeholder={textareaPlaceholder}
        />
      </div>
<br />
      
      <label className='tagstyle'>Tags:</label>
      <input
        className='QuesAns'
        type="text"
        id="myTags"
        name="myTags"
        placeholder={tagsPlaceholder}
      />
      <br />
      {selectedOption === 'Article' && (
        <div>
          <h2>Abstract</h2>
          <input
            type="text"
            placeholder="Enter 1-paragraph for abstract"
          />
        </div>
      )}
      <br />
      <div class="button-container">
        <button class="styled-button">Post</button>
      </div>
    </div>
  );
}

export default Articlepost;





