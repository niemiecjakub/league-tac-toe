import React, { useState, useEffect } from 'react';
import '../styles/App.css'

function CategoryField({cat: {category, name}}) {
  return (
    <div className="square">
      <p>{category} : {name}</p>
    </div>
  )
}

export default CategoryField;
