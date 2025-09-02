import React from 'react'

const Box = ({children,className}) => {
  return (
    <div className={`custom-border shadow-md rounded-xl p-5 ${className}`}>
        {children}
    </div>
  )
}

export default Box
