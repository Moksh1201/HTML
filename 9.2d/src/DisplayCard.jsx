import React, { useState } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const cardStyle = {
  width: '180px',
  margin: '10px',
  padding: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add a smooth transition effect for transform and box-shadow
  
};

const expandedCardStyle = {
  transform: 'scale(1.1)', // Expand the card when clicked
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Add a shadow behind the card
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  marginBottom: '10px',
};

const linkStyle = {
  fontSize: '14px', // Smaller font size
  color: 'blue',
  textDecoration: 'underline',
  cursor: 'pointer',
};

function QuestionCard({ title, description, tags, imageUrl, moreInfoLink }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        ...cardStyle,
        ...(expanded ? expandedCardStyle : {}),
      }}
      onClick={toggleExpand}
    >
      {imageUrl && (
        <Image src={imageUrl} alt="Post" style={imageStyle} />
      )}
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        <Card.Meta>Tags: {tags}</Card.Meta>
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
    </div>
  );
}

export default QuestionCard;
