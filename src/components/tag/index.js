import React from 'react';

import './styles.scss';

const Tag = ({tagName, index, handleRemoveTag}) => {
  return (
    <span className="tag" key={index}><span>{tagName}</span> <span className="tag__remove" onClick={handleRemoveTag.bind(null, index)}>X</span></span>
  )
}

export default Tag;