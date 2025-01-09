import React from 'react'

function InputComponent({
    type="",
    placeholder="",
    className=""
}) {
  return (
    <div>
        <input 
        type={type} 
        placeholder={placeholder} 
        className={`px-3 py-2 text-lg rounded-lg focus:outline-none ${className}`} />
        
    </div>
  )
}

export default InputComponent