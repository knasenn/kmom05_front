import React from 'react';
// import React, { useEffect, useState } from 'react';

const Me = () => {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('https://me-api.jsramverk.me')
  //     .then(res => res.json())
  //     .then(res => setMessage(res.description));
  // });


  var text = {
      title: 'Me',
      body: 'Hej! Introduktion om mig!'
  }

  return (
    <main>
      <h3>{text.title}</h3>
      <p>{text.body}</p>
    </main>
  );
};

export default Me;
