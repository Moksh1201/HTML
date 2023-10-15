import React from 'react';

function AddImage() {
  return (
    <div>
      <label htmlFor="imageInput">Add an image:</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ width: '30%', marginRight: '10px' }}
        />
        <button onClick={() => { /* Handle upload logic here */ }}>Upload</button>
      </div>
      <button onClick={() => { /* Handle browse logic here */ }}>Browse</button>
    </div>
  );
}

export default AddImage;
