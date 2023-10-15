import React, { useState, useRef } from 'react';
import { Header } from 'semantic-ui-react';
import { imgDB, txtDB } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function Articlepost({ title, description, inputPlaceholder, textareaPlaceholder, tagsPlaceholder, descriptionText }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textData, setTextData] = useState({
    abstract: '',
    description: '',
    tags: '',
    title: '',
  });

  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (selectedFile) {
      const imageName = `Imgs${uuidv4()}`;
      const imgs = ref(imgDB, imageName);
      try {
        await uploadBytes(imgs, selectedFile);

        const downloadURL = await getDownloadURL(imgs);

        setSelectedImage(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePostClick = async () => {
    const postRef = collection(txtDB, 'posts');
    const newPost = {
      title: textData.title,
      description: textData.description,
      tags: textData.tags.split(','), // Split the tags into an array
      abstract: textData.abstract,
      imageUrl: selectedImage,
    };

    try {
      const docRef = await addDoc(postRef, newPost);
      console.log('Document written with ID:', docRef.id);

      setTextData({
        title: '',
        description: '',
        tags: '', // Clear tags field
        abstract: '',
      });

      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div>
      <Header block>
        {title}
      </Header>

      <p className='desc'>This section is designed based on the type of the post. It could be developed by conditional rendering. <p className='coloredtext'>For posting an <p className='coloredtext'>{description}</p>, the following section would be appeared.</p></p>
      <label className='tagstyle'>Title</label>
      <input
        className='QuesAns'
        type="text"
        id="myInput"
        name="myInput"
        placeholder={inputPlaceholder}
        value={textData.title}
        onChange={(e) => setTextData({ ...textData, title: e.target.value })}
      />
      <br />
      <br />

      <div className='AddingImg'>
        <label className='tagstyle'>Add an image:</label>
        <div style={{ display: 'inline', alignItems: 'center' }}>
          <input
            type="text"
            value={selectedFile ? selectedFile.name : 'No file selected'}
            readOnly
            style={{ width: '20%', marginRight: '5px', height: '20px' }}
          />
          <button className="styled-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <br />
        <button onClick={handleBrowseClick} className="styled-button" style={{ marginTop: '5px', marginLeft: '33.9%' }}>
          Browse
        </button>
      </div>

      <div className='textarea-container'>
        <h2 style={{ marginBottom: '5px' }} className='describe1'>Abstract</h2>
        <input
          className='custom-textarea1'
          type="text"
          placeholder="Enter 1-paragraph for abstract"
          value={textData.abstract}
          onChange={(e) => setTextData({ ...textData, abstract: e.target.value })}
        />
      </div>
      <br />

      <div className="textarea-container">
        <h4 className="describe1" style={{ marginBottom: '5px' }}>
          {descriptionText}
        </h4>
        <textarea
          className="custom-textarea"
          rows={5}
          cols={5}
          placeholder={textareaPlaceholder}
          value={textData.description}
          onChange={(e) => setTextData({ ...textData, description: e.target.value })}
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
        value={textData.tags}
        onChange={(e) => setTextData({ ...textData, tags: e.target.value })}
      />
      <div className="button-container">
        <button className="styled-button" onClick={handlePostClick}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Articlepost;
