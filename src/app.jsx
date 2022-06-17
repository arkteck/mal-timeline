import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');


  const retrieveMal = () => {
    axios({
      url: `http://localhost:8325/username/${username}`,
      method: 'get',
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log('retrieveMal error', err);
      })
  };

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
        placeholder="Search this user"
      />
      <button
        type="button"
        onClick={retrieveMal}
      >Click!</button>
    </>
  )
};

export default App;