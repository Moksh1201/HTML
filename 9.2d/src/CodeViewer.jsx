import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { txtDB } from './firebase';

const cardStyle = {
  width: '180px',
  margin: '10px',
  padding: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'inline-block',
};

const expandedCardStyle = {
  zIndex: 999,
  width: '70%', 
  height: '60vh', 
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  marginBottom: '10px',
};

const linkStyle = {
  fontSize: '14px',
  color: 'blue',
  textDecoration: 'underline',
  cursor: 'pointer',
};

function CodeViewer({ id, title, description, tags, imageUrl, date, moreInfoLink, code }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      const postDocRef = doc(txtDB, 'posts', id);
      await deleteDoc(postDocRef);
      // You may want to add some state update logic or display a message upon successful deletion.
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  return (
    <div
      style={{
        ...cardStyle,
        ...(expanded ? expandedCardStyle : {}),
      }}
      onClick={toggleExpand}
    >
      {imageUrl && !expanded && (
        <Image src={imageUrl} alt="Post" style={imageStyle} />
      )}
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        <Card.Meta>Tags: {tags}</Card.Meta>
        {code && expanded && (
          <div style={{ flex: 1, width: '100%', overflow: 'auto', maxHeight: '70vh' }}>
            <h4 style={{ marginBottom: '5px' }}>Code:</h4>
            <CodeMirror
              value={code}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                readOnly: true,
              }}
            />
          </div>
        )}
        {expanded && moreInfoLink && (
          <div style={linkStyle}>
            <a href={moreInfoLink} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </div>
        )}
      </Card.Content>
      {expanded && (
        <Icon
          name="close"
          style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
          onClick={toggleExpand}
        />
      )}
      <Card.Content extra>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Content>
    </div>
  );
}

export default CodeViewer;
