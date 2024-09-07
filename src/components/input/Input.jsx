import React from 'react'

const Input = ({title, placeholder, type, value, onChange, id, htmlFor}) => {

  return (
    <div className="flex flex-col mx-2 my-2 text-blue ">
        <label htmlFor={htmlFor} className="text-[1.1rem] font-bold ml-2">{title}</label>
        <input 
        id={id}
        type={type} 
        value={value} 
        placeholder={placeholder} 
        onChange={onChange}
        className="rounded-[1.2rem] focus:ring-4 text-base font-jaldi font-[400] py-[1.2rem] pl-[1rem] pr-[7rem] shadow-[inset_0_4px_4px_-0px_rgba(0,0,0,0.2)] bg-yellow h-[2rem] placeholder-blue"/>
    </div>
  )
}

export default Input
