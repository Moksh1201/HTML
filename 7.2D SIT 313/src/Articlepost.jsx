import React, { useState, useRef } from 'react';
import { Header } from 'semantic-ui-react';
import { imgDB, txtDB } from './firebase'; // Assuming you have initialized Firestore in 'txtDB'
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function Articlepost({ title, description, inputPlaceholder, textareaPlaceholder, tagsPlaceholder, descriptionText, selectedOption }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textData, setTextData] = useState({
    abstract: "",
    content: "",
    tags: "",
    title: "",
  });

  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (selectedFile) {
      const imgs = ref(imgDB, `Imgs${v4()}`);
      try {
        // Upload the file to Firebase Storage
        const uploadTask = await uploadBytes(imgs, selectedFile);
        console.log(uploadTask, "uploadTask");

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(uploadTask.ref);
        console.log(downloadURL, "downloadURL");

        setSelectedImage(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
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
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePostClick = async () => {
    // Save text data to Firestore
    const postRef = collection(txtDB, "posts"); // Change "posts" to your Firestore collection name
    const newPost = {
      title: textData.title,
      content: textData.content,
      tags: textData.tags,
      abstract: textData.abstract,
      imageUrl: selectedImage,
    };

    try {
      const docRef = await addDoc(postRef, newPost);
      console.log("Document written with ID: ", docRef.id);

      // Clear form fields after successful submission
      setTextData({
        title: "",
        content: "",
        tags: "",
        abstract: "",
      });
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
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

      {/* Add image upload functionality */}
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
        <h2 style={{ marginBottom: '5px' }} className='describe1'>Abstract </h2>
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
          value={textData.content}
          onChange={(e) => setTextData({ ...textData, content: e.target.value })}
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
