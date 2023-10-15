// CardList.js
import React from 'react';
import Card from './DisplayCard';

const CardList = ({ data }) => {
  return (
    <div className="card-list">
      {data.map((item) => (
        <Card
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          abstract={item.abstract}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default CardList;
