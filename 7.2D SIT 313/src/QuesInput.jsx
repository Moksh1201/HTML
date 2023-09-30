import React from 'react';
import { Header } from 'semantic-ui-react';


function MyQues({ title, description, inputPlaceholder, textareaPlaceholder, tagsPlaceholder, descriptionText, selectedOption }) {
  return (
    <div>
      <Header>
        {title}
      </Header>

      <p className='desc'>This section is designed on the type of the post. It could be develope by conditional rendering. <p className='coloredtext'>For post a <p className='coloredtext'>{description}</p>, the following setcion would be apperared.</p></p>
      <label className='tagstyle'>Title</label>
      <input
        className='QuesAns'
        type="text"
        id="myInput"
        name="myInput"
        placeholder={inputPlaceholder}
      />
      
    
      <div className="textarea-container">
      <h4 className='describe1'style={{ marginBottom: '5px' }}>{descriptionText}</h4>
        <textarea
          className="custom-textarea1"
          rows={5}
          cols={5}
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
      <br />
      
      <br />
      <div className="button-container">
        <button className="styled-button">Post</button>
      </div>
    </div>
  );
}

export default MyQues;





