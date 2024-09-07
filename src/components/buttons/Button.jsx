import React from 'react'

const Button = ({text, className, type, onClick}) => {

  return (
    <button type={type} 
     onClick={onClick}>{text}</button>
    
  );
};

export default Button

