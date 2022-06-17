import React, { useState, useEffect } from 'react';

function AnimeEntry({ data }) {

  return (
    <>
      <img src={data.node.main_picture.medium} alt={data.node.title} />
      <p>{data.node.title}</p>
    </>
  );
}

export default AnimeEntry;
