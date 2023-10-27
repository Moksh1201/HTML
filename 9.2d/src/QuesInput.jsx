import React, { useState, useRef, useEffect } from 'react';
import { Header, Message } from 'semantic-ui-react';
import { imgDB, txtDB } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import './POST.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';

function MyQues({
  title,
  description,
  inputPlaceholder,
  textareaPlaceholder,
  tagsPlaceholder,
  descriptionText,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textData, setTextData] = useState({
    title: '',
    description: '',
    tags: '',
    code: '',
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (selectedFile) {
      const imageName = `Imgs${uuidv4()}`;
      const imgs = ref(imgDB, imageName);
      try {
        await uploadBytes(imgs, selectedFile);

        const downloadURL = await getDownloadURL(imgs);

        setSelectedImage(downloadURL);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
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
      tags: textData.tags.split(','),
      imageUrl: selectedImage,
      code: textData.code,
      date: Timestamp.fromDate(new Date()),
    };

    try {
      await addDoc(postRef, newPost);
      setTextData({
        title: '',
        description: '',
        tags: '',
        code: '',
      });

      setSelectedFile(null);
      setSelectedImage(null);
      setPostSuccess(true);
      setTimeout(() => setPostSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  useEffect(() => {
    return () => {
      setUploadSuccess(false);
      setPostSuccess(false);
    };
  }, []);

  return (
    <div>
      <Header block>{title}</Header>

      {uploadSuccess ? (
        <Message
          positive
          onDismiss={() => setUploadSuccess(false)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1',
          }}
        >
          <Message.Header>Upload Complete</Message.Header>
        </Message>
      ) : null}

      {postSuccess ? (
        <Message
          positive
          onDismiss={() => setPostSuccess(false)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1',
          }}
        >
          <Message.Header>Post Successful</Message.Header>
        </Message>
      ) : null}

      <p className="desc">
        This section is designed based on the type of the post. It could be developed by conditional rendering.
        <p className="coloredtext">
          For posting a <p className="coloredtext">{description}</p>, the following section would be appeared.
        </p>
      </p>

      <label className="tagstyle">Title</label>
      <input
        className="QuesAns"
        type="text"
        id="myInput"
        name="myInput"
        placeholder={inputPlaceholder}
        value={textData.title}
        onChange={(e) => setTextData({ ...textData, title: e.target.value })}
      />
      <br />
      <br />

      <div className="AddingImg">
        <label className="tagstyle">Add an image:</label>
        <div style={{ display: 'inline', alignItems: 'center' }}>
          <input
            type="text"
            value={selectedFile ? selectedFile.name : 'No file selected'}
            readOnly
            style={{ width: '20%', marginRight: '5px', height: '20px' }}
          />
          <button className="styled-button" onClick={handleUpload} style={{ marginTop: '5px', marginLeft: '1.3%' }}>
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
        <button onClick={handleBrowseClick} className="styled-button" style={{ marginTop: '5px', marginLeft: '35.1%' }}>
          Browse
        </button>
      </div>

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

      <div className="code-mirror-container">
        <h4 className="describe" style={{ marginBottom: '5px' }}>
          Add Your Code:
        </h4>
        <CodeMirror
          value={textData.code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, newCode) => {
            setTextData({ ...textData, code: newCode });
          }
        }
        />


        <textarea
          className="custom-textarea"
          rows={5}
          cols={5}
          placeholder="Code Preview"
          value={textData.code} // Keep it in sync with CodeMirror content
          readOnly
        />
      </div>

      <br />
      <label className="tagstyle">Tags:</label>
      <input
        className="QuesAns"
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

export default MyQues;